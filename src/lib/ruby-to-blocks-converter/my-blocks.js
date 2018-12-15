/* global Opal */
import _ from 'lodash';
import Blockly from 'scratch-blocks';
import {RubyToBlocksConverterError} from './errors';

/**
 * My Blocks converter
 */
const MyBlocksConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if (this._isSelf(receiver) || receiver === Opal.nil) {
            const procedure = this._lookupProcedure(name);
            if (procedure) {
                if (procedure.argumentIds.length === args.length) {
                    block = this._createBlock('procedures_call', 'statement', {
                        mutation: {
                            argumentids: JSON.stringify(procedure.argumentIds),
                            children: [],
                            proccode: procedure.procCode.join(' '),
                            tagName: 'mutation',
                            warp: 'false'
                        }
                    });

                    if (this._context.procedureCallBlocks.hasOwnProperty(procedure.id)) {
                        this._context.procedureCallBlocks[procedure.id].push(block.id);
                    } else {
                        this._context.procedureCallBlocks[procedure.id] = [block.id];
                    }

                    args.forEach((arg, i) => {
                        const argumentId = procedure.argumentIds[i];
                        if (this._isFalseOrBooleanBlock(arg)) {
                            if (procedure.argumentVariables[i].isBoolean ||
                                this._changeToBooleanArgument(procedure.argumentNames[i])) {
                                if (!this._isFalse(arg)) {
                                    this._addInput(block, argumentId, arg, null);
                                }
                                return;
                            }
                        }
                        if (!procedure.argumentVariables[i].isBoolean &&
                            (this._isNumberOrBlock(arg) || this._isStringOrBlock(arg))) {
                            this._addTextInput(block, argumentId, this._isNumber(arg) ? arg.toString() : arg, '');
                            return;
                        }
                        throw new RubyToBlocksConverterError(
                            this._context.currentNode,
                            `invalid type of My Block "${name}" argument #${i + 1}`
                        );
                    });
                }
            }
        }
        return block;
    },

    // eslint-disable-next-line no-unused-vars
    onVar: function (scope, variable) {
        let block;
        if (scope === 'local') {
            let opcode;
            let blockType;
            if (variable.isBoolean) {
                opcode = 'argument_reporter_boolean';
                blockType = 'value_boolean';
            } else {
                opcode = 'argument_reporter_string_number';
                blockType = 'value';
            }
            block = this._createBlock(opcode, blockType, {
                fields: {
                    VALUE: {
                        name: 'VALUE',
                        value: variable.name
                    }
                }
            });
            if (this._context.argumentBlocks.hasOwnProperty(variable.id)) {
                this._context.argumentBlocks[variable.id].push(block.id);
            } else {
                this._context.argumentBlocks[variable.id] = [block.id];
            }
        }
        return block;
    },

    // eslint-disable-next-line no-unused-vars
    onDefs: function (node, saved) {
        const receiver = this._process(node.children[0]);
        if (!this._isSelf(receiver)) {
            return null;
        }

        const procedureName = node.children[1].toString();
        const block = this._createBlock('procedures_definition', 'hat', {
            topLevel: true
        });
        const procedure = this._createProcedure(procedureName);

        const customBlock = this._createBlock('procedures_prototype', 'statement', {
            shadow: true
        });
        this._addInput(block, 'custom_block', customBlock);

        this._context.localVariables = {};
        this._process(node.children[2]).forEach(n => {
            n = n.toString();
            procedure.argumentNames.push(n);
            procedure.argumentVariables.push(this._lookupOrCreateVariable(n));
            procedure.procCode.push('%s');
            procedure.argumentDefaults.push('');
            const inputId = Blockly.utils.genUid();
            procedure.argumentIds.push(inputId);
            const inputBlock = this._createBlock('argument_reporter_string_number', 'value', {
                fields: {
                    VALUE: {
                        name: 'VALUE',
                        value: n
                    }
                },
                shadow: true
            });
            this._addInput(customBlock, inputId, inputBlock);
            procedure.argumentBlocks.push(inputBlock);
        });

        let body = this._process(node.children[3]);
        if (!_.isArray(body)) {
            body = [body];
        }
        if (this._isBlock(body[0])) {
            block.next = body[0].id;
            body[0].parent = block.id;
        }

        const booleanIndexes = [];
        procedure.argumentVariables.forEach((v, i) => {
            if (v.isBoolean) {
                booleanIndexes.push(i);
                procedure.procCode[i + 1] = '%b';
                procedure.argumentDefaults[i] = 'false';
                procedure.argumentBlocks[i].opcode = 'argument_reporter_boolean';
                this._setBlockType(procedure.argumentBlocks[i], 'value_boolean');
            }
        });

        if (booleanIndexes.length > 0 &&
            this._context.procedureCallBlocks.hasOwnProperty(procedure.id)) {
            this._context.procedureCallBlocks[procedure.id].forEach(id => {
                const b = this._context.blocks[id];
                b.mutation.proccode = procedure.procCode.join(' ');
                booleanIndexes.forEach(booleanIndex => {
                    const input = b.inputs[procedure.argumentIds[booleanIndex]];
                    const inputBlock = this._context.blocks[input.block];
                    if (inputBlock) {
                        if (!inputBlock.shadow && input.shadow) {
                            delete this._context.blocks[input.shadow];
                            input.shadow = null;
                        }
                    }
                });
            });
        }

        customBlock.mutation = {
            argumentdefaults: JSON.stringify(procedure.argumentDefaults),
            argumentids: JSON.stringify(procedure.argumentIds),
            argumentnames: JSON.stringify(procedure.argumentNames),
            children: [],
            proccode: procedure.procCode.join(' '),
            tagName: 'mutation',
            warp: 'false'
        };

        this._restoreContext({localVariables: saved.localVariables});

        return block;
    }
};

export default MyBlocksConverter;
