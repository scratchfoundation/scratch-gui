import VM from 'scratch-vm';
import Target from 'scratch-vm/src/engine/target';
import StringUtil from 'scratch-vm/src/util/string-util';

/**
   HACK: scratch-vm の処理のいくつかでArrayに対してfor ... inを使っているが、
   OpalによってArrayのprototypeにいくつかのメソッドが追加されており、
   それらがイテレーション対象となってしまい期待通りに動作しない。
   そこで for ... in を使っている箇所にモンキーパッチを適用する。
*/
export default function () {
    const shareBlocksToTargetOriginal = VM.prototype.shareBlocksToTarget;
    VM.prototype.shareBlocksToTarget = function (blocks, targetId, optFromTargetId) {
        const copiedBlocks = JSON.parse(JSON.stringify(blocks));
        const target = this.runtime.getTargetById(targetId);

        if (optFromTargetId) {
            // If the blocks are being shared from another target,
            // resolve any possible variable conflicts that may arise.
            const fromTarget = this.runtime.getTargetById(optFromTargetId);
            const object = {};
            copiedBlocks.forEach(block => {
                object[block.id] = block;
            });
            fromTarget.resolveVariableSharingConflictsWithTarget(object, target);
        }

        return shareBlocksToTargetOriginal.call(this, blocks, targetId, null);
    };

    Target.prototype.fixUpVariableReferences = function () {
        if (!this.runtime) return; // There's no runtime context to conflict with
        if (this.isStage) return; // Stage can't have variable conflicts with itself (and also can't be uploaded)
        const stage = this.runtime.getTargetForStage();
        if (!stage || !stage.variables) return;

        const renameConflictingLocalVar = (id, name, type) => {
            const conflict = stage.lookupVariableByNameAndType(name, type);
            if (conflict) {
                const newName = StringUtil.unusedName(
                    `${this.getName()}: ${name}`,
                    this.getAllVariableNamesInScopeByType(type));
                this.renameVariable(id, newName);
                return newName;
            }
            return null;
        };

        const allReferences = this.blocks.getAllVariableAndListReferences();
        const unreferencedLocalVarIds = [];
        if (Object.keys(this.variables).length > 0) {
            for (const localVarId in this.variables) {
                if (!this.variables.hasOwnProperty(localVarId)) continue;
                if (!allReferences[localVarId]) unreferencedLocalVarIds.push(localVarId);
            }
        }
        const conflictIdsToReplace = Object.create(null);
        const conflictNamesToReplace = Object.create(null);

        // Cache the list of all variable names by type so that we don't need to
        // re-calculate this in every iteration of the following loop.
        const varNamesByType = {};
        const allVarNames = type => {
            const namesOfType = varNamesByType[type];
            if (namesOfType) return namesOfType;
            varNamesByType[type] = this.runtime.getAllVarNamesOfType(type);
            return varNamesByType[type];
        };

        for (const varId in allReferences) {
            // We don't care about which var ref we get, they should all have the same var info
            const varRef = allReferences[varId][0];
            const varName = varRef.referencingField.value;
            const varType = varRef.type;
            if (this.lookupVariableById(varId)) {
                // Found a variable with the id in either the target or the stage,
                // figure out which one.
                if (this.variables.hasOwnProperty(varId)) {
                    // If the target has the variable, then check whether the stage
                    // has one with the same name and type. If it does, then rename
                    // this target specific variable so that there is a distinction.
                    const newVarName = renameConflictingLocalVar(varId, varName, varType);

                    if (newVarName) {
                        // We are not calling this.blocks.updateBlocksAfterVarRename
                        // here because it will search through all the blocks. We already
                        // have access to all the references for this var id.
                        allReferences[varId].map(ref => {
                            ref.referencingField.value = newVarName;
                            return ref;
                        });
                    }
                }
            } else {
                // We didn't find the referenced variable id anywhere,
                // Treat it as a reference to a global variable (from the original
                // project this sprite was exported from).
                // Check for whether a global variable of the same name and type exists,
                // and if so, track it to merge with the existing global in a second pass of the blocks.
                const existingVar = stage.lookupVariableByNameAndType(varName, varType);
                if (existingVar) {
                    if (!conflictIdsToReplace[varId]) {
                        conflictIdsToReplace[varId] = existingVar.id;
                    }
                } else {
                    // A global variable with the same name did not already exist,
                    // create a new one such that it does not conflict with any
                    // names of local variables of the same type.
                    const allNames = allVarNames(varType);
                    const freshName = StringUtil.unusedName(varName, allNames);
                    stage.createVariable(varId, freshName, varType);
                    if (!conflictNamesToReplace[varId]) {
                        conflictNamesToReplace[varId] = freshName;
                    }
                }
            }
        }
        // Rename any local variables that were missed above because they aren't
        // referenced by any blocks
        unreferencedLocalVarIds.forEach(varId => {
            const name = this.variables[varId].name;
            const type = this.variables[varId].type;
            renameConflictingLocalVar(varId, name, type);
        });
        // Handle global var conflicts with existing global vars (e.g. a sprite is uploaded, and has
        // blocks referencing some variable that the sprite does not own, and this
        // variable conflicts with a global var)
        // In this case, we want to merge the new variable referenes with the
        // existing global variable
        for (const conflictId in conflictIdsToReplace) {
            const existingId = conflictIdsToReplace[conflictId];
            const referencesToUpdate = allReferences[conflictId];
            this.mergeVariables(conflictId, existingId, referencesToUpdate);
        }

        // Handle global var conflicts existing local vars (e.g a sprite is uploaded,
        // and has blocks referencing some variable that the sprite does not own, and this
        // variable conflcits with another sprite's local var).
        // In this case, we want to go through the variable references and update
        // the name of the variable in that reference.
        for (const conflictId in conflictNamesToReplace) {
            const newName = conflictNamesToReplace[conflictId];
            const referencesToUpdate = allReferences[conflictId];
            referencesToUpdate.map(ref => {
                ref.referencingField.value = newName;
                return ref;
            });
        }
    };
}
