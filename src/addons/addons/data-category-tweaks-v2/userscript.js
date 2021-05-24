export default async function ({ addon, global, console, msg, safeMsg }) {
  const ScratchBlocks = await addon.tab.traps.getBlockly();

  const SMALL_GAP = 8;
  const BIG_GAP = 24;

  const vm = addon.tab.traps.vm;

  // Used in setting change handler. Updated in getBlocksXML.
  // (Yes this is weird but it's how it was originally and I'm too scared to change it)
  let hasSeparateListCategory = false;

  const separateVariablesByType = (toolboxXML) => {
    const listButtonIndex = toolboxXML.findIndex(
      (i) => i.getAttribute("callbackkey") === "CREATE_LIST" || i.getAttribute("type") === "data_addtolist"
    );
    return {
      variables: toolboxXML.slice(0, listButtonIndex),
      lists: toolboxXML.slice(listButtonIndex, toolboxXML.length),
    };
  };

  const separateLocalVariables = (workspace, toolboxXML) => {
    const { variables, lists } = separateVariablesByType(toolboxXML);

    const makeLabel = (l10n) => {
      const label = document.createElement("label");
      label.setAttribute("text", msg(l10n));
      return label;
    };

    const fixGaps = (variables) => {
      if (variables.length > 0) {
        for (var i = 0; i < variables.length - 1; i++) {
          variables[i].setAttribute("gap", SMALL_GAP);
        }
        variables[i].setAttribute("gap", BIG_GAP);
      }
    };

    const separateVariablesByScope = (xml) => {
      const before = [];
      const global = [];
      const local = [];
      const after = [];

      for (const blockXML of xml) {
        if (blockXML.hasAttribute("id")) {
          const id = blockXML.getAttribute("id");
          const variable = workspace.getVariableById(id);
          if (!variable || !variable.isLocal) {
            global.push(blockXML);
          } else {
            local.push(blockXML);
          }
        } else if (global.length || local.length) {
          after.push(blockXML);
        } else {
          before.push(blockXML);
        }
      }

      const result = before;

      if (global.length) {
        result.push(makeLabel("for-all-sprites"));
        fixGaps(global);
        result.push(...global);
      }

      if (local.length) {
        result.push(makeLabel("for-this-sprite-only"));
        fixGaps(local);
        result.push(...local);
      }

      return result.concat(after);
    };

    return separateVariablesByScope(variables).concat(separateVariablesByScope(lists));
  };

  const moveReportersDown = (toolboxXML) => {
    const { variables, lists } = separateVariablesByType(toolboxXML);

    const moveReportersToEnd = (xml) => {
      const reporters = [];
      const everythingElse = [];

      for (const blockXML of xml) {
        if (blockXML.hasAttribute("id") || blockXML.tagName === "BUTTON") {
          // Round reporters and the create variable button
          reporters.push(blockXML);
        } else {
          // Everything else like "change variable by 1"
          everythingElse.push(blockXML);
        }
      }

      if (everythingElse.length) {
        everythingElse[everythingElse.length - 1].setAttribute("gap", BIG_GAP);
      }

      return everythingElse.concat(reporters);
    };

    return moveReportersToEnd(variables).concat(moveReportersToEnd(lists));
  };

  const DataCategory = ScratchBlocks.DataCategory;
  let variableCategory;
  let listCategory;
  const variableCategoryCallback = (workspace) => {
    let result = DataCategory(workspace);

    if (addon.settings.get("moveReportersDown")) {
      result = moveReportersDown(result);
    }

    if (addon.settings.get("separateLocalVariables")) {
      result = separateLocalVariables(workspace, result);
    }

    if (!hasSeparateListCategory) {
      return result;
    }

    const { variables, lists } = separateVariablesByType(result);
    variableCategory = variables;
    listCategory = lists;
    return variableCategory;
  };
  const listCategoryCallback = () => {
    // Computed in variable category callback, which should be called before this method.
    return listCategory;
  };

  // Each time a new workspace is made, these callbacks are reset, so re-register whenever a flyout is shown.
  // https://github.com/LLK/scratch-blocks/blob/61f02e4cac0f963abd93013842fe536ef24a0e98/core/flyout_base.js#L469
  const oldShow = ScratchBlocks.Flyout.prototype.show;
  ScratchBlocks.Flyout.prototype.show = function (xmlList) {
    this.workspace_.registerToolboxCategoryCallback("VARIABLE", variableCategoryCallback);
    this.workspace_.registerToolboxCategoryCallback("LIST", listCategoryCallback);
    return oldShow.call(this, xmlList);
  };

  // Use Scratch's extension category mechanism to replace the data category with our own.
  // https://github.com/LLK/scratch-gui/blob/ddd2fa06f2afa140a46ec03be91796ded861e65c/src/containers/blocks.jsx#L344
  // https://github.com/LLK/scratch-gui/blob/2ceab00370ad7bd8ecdf5c490e70fd02152b3e2a/src/lib/make-toolbox-xml.js#L763
  // https://github.com/LLK/scratch-vm/blob/a0c11d6d8664a4f2d55632e70630d09ec6e9ae28/src/engine/runtime.js#L1381
  const originalGetBlocksXML = vm.runtime.getBlocksXML;
  vm.runtime.getBlocksXML = function (target) {
    const result = originalGetBlocksXML.call(this, target);
    hasSeparateListCategory = addon.settings.get("separateListCategory");
    if (hasSeparateListCategory) {
      result.push({
        id: "data",
        xml: `
        <category
          name="%{BKY_CATEGORY_VARIABLES}"
          id="variables"
          colour="#FF8C1A"
          secondaryColour="#DB6E00"
          custom="VARIABLE">
        </category>
        <category
          name="${safeMsg("list-category")}"
          id="lists"
          colour="#FF661A"
          secondaryColour="#FF5500"
          custom="LIST">
        </category>`,
      });
    }
    return result;
  };

  // If editingTarget is set, the editor has already rendered and we have to tell it to rerender.
  if (vm.editingTarget) {
    vm.emitWorkspaceUpdate();
  }

  addon.settings.addEventListener("change", (e) => {
    // When the separate list category option changes, we need to do a workspace update.
    // For all other options, just refresh the toolbox.
    // Always doing both of these in response to a settings change causes many issues.
    if (addon.settings.get("separateListCategory") !== hasSeparateListCategory) {
      if (vm.editingTarget) {
        vm.emitWorkspaceUpdate();
      }
    } else {
      const workspace = Blockly.getMainWorkspace();
      if (workspace) {
        workspace.refreshToolboxSelection_();
      }
    }
  });
}
