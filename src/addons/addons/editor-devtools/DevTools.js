// import ShowBroadcast from "./show-broadcast.js";
import Utils from "./blockly/Utils.js";
import DomHelpers from "./DomHelpers.js";
import BlockInstance from "./BlockInstance.js";
import XML from "./XML.js";
import BlockItem from "./BlockItem.js";
import UndoGroup from "./blockly/UndoGroup.js";

export default class DevTools {
  constructor(addon, msg, m, helpHTML) {
    this.addon = addon;
    this.msg = msg;
    this.m = m;
    /**
     * @type {VirtualMachine}
     */
    this.vm = addon.tab.traps.vm;
    this.utils = new Utils(addon);
    this.domHelpers = new DomHelpers(addon);
    this.multi = new Multi(this.utils);

    this._helpHTML = helpHTML;
    this.find = null;
    this.findInp = null;
    this.ddOut = null;
    this.dd = null;
    this.codeTab = null;
    this.costTab = null;
    this.costTabBody = null;
    this.selVarID = null;
    this.floatInp = null;
    this.blockCursor = null;
    this.canShare = false;

    this.mouseXY = { x: 0, y: 0 };
  }

  init() {
    setTimeout(() => this.initInner(), 500);
  }

  isScriptEditor() {
    return this.codeTab.className.indexOf("gui_is-selected") >= 0;
  }

  isCostumeEditor() {
    return this.costTab.className.indexOf("gui_is-selected") >= 0;
  }

  eventClickHelp(e) {
    if (!document.getElementById("s3devHelpPop")) {
      document.body.insertAdjacentHTML("beforeend", this._helpHTML);
      document.getElementById("s3devHelpPop").addEventListener("mousedown", function (e) {
        if (e.target.id === "s3devHelpPop") {
          e.target.remove();
        }
      });
      document.querySelector("#s3devHelpPop .close-button").addEventListener("click", function (e) {
        document.getElementById("s3devHelpPop").remove();
      });
    }
    e.preventDefault();
  }

  getScratchCostumes() {
    let costumes = this.costTabBody.querySelectorAll("div[class^='sprite-selector-item_sprite-name']");
    // this.costTab[0].click();

    let myBlocks = [];
    let myBlocksByProcCode = {};

    /**
     * @param cls
     * @param txt
     * @param root
     * @returns BlockItem
     */
    function addBlock(cls, txt, root) {
      let id = root.className;
      let items = new BlockItem(cls, txt, id, 0);
      myBlocks.push(items);
      myBlocksByProcCode[txt] = items;
      return items;
    }

    let i = 0;
    for (const costume of costumes) {
      addBlock("costume", costume.innerText, costume).y = i;
      i++;
    }

    return { procs: myBlocks };
  }

  /**
   * Fetch the scratch 3 block list
   * @returns jsonFetch object
   */
  getScratchBlocks() {
    // Access Blockly!

    let myBlocks = [];
    let myBlocksByProcCode = {};

    // todo - get blockyly from an svg???

    let wksp = this.utils.getWorkspace();
    let topBlocks = wksp.getTopBlocks();

    // console.log(topBlocks);

    /**
     * @param cls
     * @param txt
     * @param root
     * @returns BlockItem
     */
    function addBlock(cls, txt, root) {
      let id = root.id ? root.id : root.getId ? root.getId() : null;
      let clone = myBlocksByProcCode[txt];
      if (clone) {
        if (!clone.clones) {
          clone.clones = [];
        }
        clone.clones.push(id);
        return clone;
      }
      let items = new BlockItem(cls, txt, id, 0);
      items.y = root.getRelativeToSurfaceXY ? root.getRelativeToSurfaceXY().y : null;
      myBlocks.push(items);
      myBlocksByProcCode[txt] = items;
      return items;
    }

    function getDescFromField(root) {
      let fields = root.inputList[0];
      let desc;
      for (const fieldRow of fields.fieldRow) {
        desc = (desc ? desc + " " : "") + fieldRow.getText();
      }
      return desc;
    }

    for (const root of topBlocks) {
      if (root.type === "procedures_definition") {
        let fields = root.inputList[0];
        let typeDesc = fields.fieldRow[0].getText();
        let label = root.getChildren()[0];
        let procCode = label.getProcCode();
        if (!procCode) {
          continue;
        }
        addBlock("define", typeDesc + " " + procCode, root);
        continue;
      }

      if (root.type === "event_whenflagclicked") {
        addBlock("flag", getDescFromField(root), root); // "When Flag Clicked"
        continue;
      }

      if (root.type === "event_whenbroadcastreceived") {
        try {
          // let wksp2 = Blockly.getMainWorkspace().getTopBlocks()[2].inputList[0].fieldRow[1];
          let fields = root.inputList[0];
          // let typeDesc = fields.fieldRow[0].getText();
          let eventName = fields.fieldRow[1].getText();
          // addBlock('receive', typeDesc + ' ' + eventName, root).eventName = eventName;
          addBlock("receive", "event " + eventName, root).eventName = eventName;
        } catch (e) {
          // eat
        }
        continue;
      }

      if (root.type.substr(0, 10) === "event_when") {
        addBlock("event", getDescFromField(root), root); // "When Flag Clicked"
        continue;
      }

      if (root.type === "control_start_as_clone") {
        addBlock("event", getDescFromField(root), root); // "when I start as a clone"
        continue;
      }
    }

    let map = wksp.getVariableMap();

    let vars = map.getVariablesOfType("");
    for (const row of vars) {
      addBlock(row.isLocal ? "var" : "VAR", (row.isLocal ? "var " : "VAR ") + row.name, row);
    }

    let lists = map.getVariablesOfType("list");
    for (const row of lists) {
      addBlock(row.isLocal ? "list" : "LIST", (row.isLocal ? "list " : "LIST ") + row.name, row);
    }

    const events = this.getCallsToEvents();
    for (const event of events) {
      addBlock("receive", "event " + event.eventName, event.block).eventName = event.eventName;
    }

    /*
                  const runtime = vm.runtime;
                  // Now let's also add event broadcasts (not just hat blocks)
                  const target = runtime.getEditingTarget();
                  const blocks = target.blocks;
                  if (blocks._blocks) {
                      for (const id in blocks._blocks) {
                          if (!blocks._blocks.hasOwnProperty(id)) {
                              continue;
                          }
                          const block = blocks._blocks[id];
                          if (block.opcode === 'event_broadcast_menu') {

                              debugger;

                              // Now get the parent block that is the actual broadcast or broadcast and wait
                              const broadcastBlock = blocks.getBlock(block.parent);
                              let b = new BlockInstance(target, broadcastBlock);

                              const fieldName = block.fields.BROADCAST_OPTION.value;
                              addBlock('receive', 'event ' + fieldName, b).eventName = broadcastBlock.eventName;

                              //
                              // let fields = root.inputList[0];
                              // let typeDesc = fields.fieldRow[0].getText();
                              // let eventName = fields.fieldRow[1].getText();
                              // addBlock('receive', 'event ' + eventName, root).eventName = eventName;
                          }
                      }
                  }
          */

    const clsOrder = { flag: 0, receive: 1, event: 2, define: 3, var: 4, VAR: 5, list: 6, LIST: 7 };

    myBlocks.sort((a, b) => {
      let t = clsOrder[a.cls] - clsOrder[b.cls];
      if (t !== 0) {
        return t;
      }
      if (a.lower < b.lower) {
        return -1;
      }
      if (a.lower > b.lower) {
        return 1;
      }
      return a.y - b.y;
    });

    return { procs: myBlocks };
  }

  showDropDown(e, focusID, instanceBlock) {
    clearTimeout(rhdd);
    rhdd = 0;

    if (!focusID && this.ddOut.classList.contains("vis")) {
      return;
    }

    // special '' vs null... - null forces a reevaluation
    prevVal = focusID ? "" : null; // Clear the previous value of the input search

    this.ddOut.classList.add("vis");
    let scratchBlocks = this.isCostumeEditor() ? this.getScratchCostumes() : this.getScratchBlocks();

    this.dom_removeChildren(this.dd);

    let foundLi = null;
    /**
     * @type {[BlockItem]}
     */
    const procs = scratchBlocks.procs;
    for (const proc of procs) {
      let li = document.createElement("li");
      li.innerText = proc.procCode;
      li.data = proc;
      li.className = proc.cls;
      if (focusID) {
        if (proc.matchesID(focusID)) {
          foundLi = li;
          li.classList.add("sel");
        } else {
          li.style.display = "none";
        }
      }
      this.dd.appendChild(li);
    }

    let label = document.getElementById("s3devFindLabel");
    this.utils.offsetX = this.ddOut.getBoundingClientRect().right - label.getBoundingClientRect().left + 26;
    this.utils.offsetY = 32;

    if (foundLi) {
      this.clickDropDownRow(foundLi, this.utils.getWorkspace(), instanceBlock);
    }
  }

  hideDropDown() {
    clearTimeout(rhdd);
    rhdd = setTimeout(() => this.reallyHideDropDown(), 250);
  }

  reallyHideDropDown() {
    // Check focus of find box
    if (this.findInp === document.activeElement) {
      this.hideDropDown();
      return;
    }

    // document.getElementById('s3devReplace').classList.add('s3devHide');

    this.ddOut.classList.remove("vis");
    rhdd = 0;
  }

  hideFloatDropDown() {
    clearTimeout(rhdd2);
    rhdd2 = setTimeout(() => this.reallyHideFloatDropDown(), 50);
  }

  reallyHideFloatDropDown(force) {
    // Check focus of find box
    if (!force && this.floatInp === document.activeElement) {
      this.hideFloatDropDown();
      return;
    }

    let float = document.getElementById("s3devFloatingBar");
    if (float) {
      float.remove();
    }
    this.floatInp = null;
    rhdd2 = 0;
  }

  dom_removeChildren(myNode) {
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }

  /**
   * A nicely ordered version of the top blocks
   * @returns {[Blockly.Block]}
   */
  getTopBlocks() {
    let result = this.getOrderedTopBlockColumns();
    let columns = result.cols;
    /**
     * @type {[[Blockly.Block]]}
     */
    let topBlocks = [];
    for (const col of columns) {
      topBlocks = topBlocks.concat(col.blocks);
    }
    return topBlocks;
  }

  hidePopups(wksp) {
    // Fire fake mouse events to trick the popup into hiding.
    const element = wksp.getToolbox().HtmlDiv;
    element.dispatchEvent(new MouseEvent("mousedown", { relatedTarget: element, bubbles: true }));
    element.dispatchEvent(new MouseEvent("mouseup", { relatedTarget: element, bubbles: true }));
  }

  /**
   * A much nicer way of laying out the blocks into columns
   */
  doCleanUp(e, dataId) {
    let workspace = this.utils.getWorkspace();
    if (e) {
      e.cancelBubble = true;
      e.preventDefault();
      this.hidePopups(workspace);
      setTimeout(() => this.doCleanUp(undefined, dataId), 0);
      return;
    }

    let makeSpaceForBlock = dataId && workspace.getBlockById(dataId);
    makeSpaceForBlock = makeSpaceForBlock && makeSpaceForBlock.getRootBlock();

    UndoGroup.startUndoGroup(workspace);

    let result = this.getOrderedTopBlockColumns(true);
    let columns = result.cols;
    let orphanCount = result.orphans.blocks.length;
    if (orphanCount > 0 && !dataId) {
      let message = this.msg("orphaned", {
        count: orphanCount,
      });
      if (confirm(message)) {
        for (const block of result.orphans.blocks) {
          block.dispose();
        }
      } else {
        columns.unshift(result.orphans);
      }
    }

    let cursorX = 48;

    let maxWidths = result.maxWidths;

    for (const column of columns) {
      let cursorY = 64;
      let maxWidth = 0;

      for (const block of column.blocks) {
        let extraWidth = block === makeSpaceForBlock ? 380 : 0;
        let extraHeight = block === makeSpaceForBlock ? 480 : 72;
        let xy = block.getRelativeToSurfaceXY();
        if (cursorX - xy.x !== 0 || cursorY - xy.y !== 0) {
          block.moveBy(cursorX - xy.x, cursorY - xy.y);
        }
        let heightWidth = block.getHeightWidth();
        cursorY += heightWidth.height + extraHeight;

        let maxWidthWithComments = maxWidths[block.id] || 0;
        maxWidth = Math.max(maxWidth, Math.max(heightWidth.width + extraWidth, maxWidthWithComments));
      }

      cursorX += maxWidth + 96;
    }

    let topComments = workspace.getTopComments();
    for (const comment of topComments) {
      if (comment.setVisible) {
        comment.setVisible(false);
        comment.needsAutoPositioning_ = true;
        comment.setVisible(true);
      }
    }

    setTimeout(() => {
      // Locate unused local variables...
      let workspace = this.utils.getWorkspace();
      let map = workspace.getVariableMap();
      let vars = map.getVariablesOfType("");

      let unusedLocals = [];

      for (const row of vars) {
        if (row.isLocal) {
          let usages = map.getVariableUsesById(row.getId());
          if (!usages || usages.length === 0) {
            unusedLocals.push(row);
          }
        }
      }

      if (unusedLocals.length > 0 && !dataId) {
        const unusedCount = unusedLocals.length;
        let message = this.msg("unused-var", {
          count: unusedCount,
        });
        for (let i = 0; i < unusedLocals.length; i++) {
          let orphan = unusedLocals[i];
          if (i > 0) {
            message += ", ";
          }
          message += orphan.name;
        }
        if (confirm(message)) {
          for (const orphan of unusedLocals) {
            workspace.deleteVariableById(orphan.getId());
          }
        }
      }

      UndoGroup.endUndoGroup(workspace);
    }, 100);
  }

  /**
   * Badly Ophaned - might want to delete these!
   * @param topBlock
   * @returns {boolean}
   */
  isBlockAnOrphan(topBlock) {
    return !!topBlock.outputConnection;
  }

  /**
   * Split the top blocks into ordered columns
   * @param separateOrphans true to keep all orphans separate
   * @returns {{orphans: {blocks: [Block], x: number, count: number}, cols: [Col]}}
   */
  getOrderedTopBlockColumns(separateOrphans) {
    let w = this.utils.getWorkspace();
    let topBlocks = w.getTopBlocks();
    let maxWidths = {};

    if (separateOrphans) {
      let topComments = w.getTopComments();

      // todo: tie comments to blocks... find widths and width of block stack row...
      for (const comment of topComments) {
        // comment.autoPosition_();
        // Hiding and showing repositions the comment right next to it's block - nice!
        if (comment.setVisible) {
          comment.setVisible(false);
          comment.needsAutoPositioning_ = true;
          comment.setVisible(true);

          // let bb = comment.block_.svgPath_.getBBox();
          let right = comment.getBoundingRectangle().bottomRight.x;

          // Get top block for stack...
          let root = comment.block_.getRootBlock();
          let left = root.getBoundingRectangle().topLeft.x;
          maxWidths[root.id] = Math.max(right - left, maxWidths[root.id] || 0);
        }
      }
    }

    // Default scratch ordering is horrid... Lets try something more clever.

    /**
     * @type {Col[]}
     */
    let cols = [];
    const TOLERANCE = 256;
    let orphans = { x: -999999, count: 0, blocks: [] };

    for (const topBlock of topBlocks) {
      // let r = b.getBoundingRectangle();
      let position = topBlock.getRelativeToSurfaceXY();
      /**
       * @type {Col}
       */
      let bestCol = null;
      let bestError = TOLERANCE;

      if (separateOrphans && this.isBlockAnOrphan(topBlock)) {
        orphans.blocks.push(topBlock);
        continue;
      }

      // Find best columns
      for (const col of cols) {
        let err = Math.abs(position.x - col.x);
        if (err < bestError) {
          bestError = err;
          bestCol = col;
        }
      }

      if (bestCol) {
        // We found a column that we fitted into
        bestCol.x = (bestCol.x * bestCol.count + position.x) / ++bestCol.count; // re-average the columns as more items get added...
        bestCol.blocks.push(topBlock);
      } else {
        // Create a new column
        cols.push(new Col(position.x, 1, [topBlock]));
      }
    }

    // if (orphans.blocks.length > 0) {
    //     cols.push(orphans);
    // }

    // Sort columns, then blocks inside the columns
    cols.sort((a, b) => a.x - b.x);
    for (const col of cols) {
      col.blocks.sort((a, b) => a.getRelativeToSurfaceXY().y - b.getRelativeToSurfaceXY().y);
    }

    return { cols: cols, orphans: orphans, maxWidths: maxWidths };
  }

  /**
   * Find all the uses of a named variable.
   * @param {string} id ID of the variable to find.
   * @return {!Array.<!Blockly.Block>} Array of block usages.
   */
  getVariableUsesById(id) {
    let uses = [];

    let topBlocks = this.getTopBlocks(true); // todo: Confirm this was the right getTopBlocks?
    for (const topBlock of topBlocks) {
      /** @type {!Array<!Blockly.Block>} */
      let kids = topBlock.getDescendants();
      for (const block of kids) {
        /** @type {!Array<!Blockly.VariableModel>} */
        let blockVariables = block.getVarModels();
        if (blockVariables) {
          for (const blockVar of blockVariables) {
            if (blockVar.getId() === id) {
              uses.push(block);
            }
          }
        }
      }
    }

    return uses;
  }

  /**
   * Find all the uses of a named procedure.
   * @param {string} id ID of the variable to find.
   * @return {!Array.<!Blockly.Block>} Array of block usages.
   */
  getCallsToProcedureById(id) {
    let w = this.utils.getWorkspace();
    let procBlock = w.getBlockById(id);
    let label = procBlock.getChildren()[0];
    let procCode = label.getProcCode();

    let uses = [procBlock]; // Definition First, then calls to it
    let topBlocks = this.getTopBlocks(true);
    for (const topBlock of topBlocks) {
      /** @type {!Array<!Blockly.Block>} */
      let kids = topBlock.getDescendants();
      for (const block of kids) {
        if (block.type === "procedures_call") {
          if (block.getProcCode() === procCode) {
            uses.push(block);
          }
        }
      }
    }

    return uses;
  }

  /**
   * Find all the uses of a named procedure.
   * @param {string} name name of the variable to find.
   * @return {!Array.<!Blockly.Block>} Array of block usages.
   */
  getCallsToEventsByName(name) {
    let uses = []; // Definition First, then calls to it

    const runtime = this.vm.runtime;
    const targets = runtime.targets; // The sprites / stage

    for (const target of targets) {
      if (!target.isOriginal) {
        continue; // Skip clones
      }

      const blocks = target.blocks;
      if (!blocks._blocks) {
        continue;
      }

      for (const id of Object.keys(blocks._blocks)) {
        const block = blocks._blocks[id];
        // To find event broadcaster blocks, we look for the nested "event_broadcast_menu" blocks first that match the event name
        if (block.opcode === "event_broadcast_menu" && block.fields.BROADCAST_OPTION.value === name) {
          // Now get the parent block that is the actual broadcast or broadcast and wait
          const broadcastBlock = blocks.getBlock(block.parent);
          uses.push(new BlockInstance(target, broadcastBlock));
        } else if (block.opcode === "event_whenbroadcastreceived" && block.fields.BROADCAST_OPTION.value === name) {
          uses.push(new BlockInstance(target, block));
        }
      }
    }

    return uses;
  }

  /**
   * Find all the evern broadcasters.
   * @return {[{eventName:string, block:Block}]} Array of event names and blocks.
   */
  getCallsToEvents() {
    const uses = []; // Definition First, then calls to it
    const found = {};

    let topBlocks = this.getTopBlocks(true);
    for (const topBlock of topBlocks) {
      /** @type {!Array<!Blockly.Block>} */
      let kids = topBlock.getDescendants();
      for (const block of kids) {
        if (block.type === "event_broadcast" || block.type === "event_broadcastandwait") {
          const eventName = block.getChildren()[0].inputList[0].fieldRow[0].getText();
          if (!found[eventName]) {
            found[eventName] = block;
            uses.push({ eventName: eventName, block: block });
          }
        }
      }
    }

    return uses;
  }

  buildNavigationCarousel(nav, li, blocks, instanceBlock) {
    if (nav && nav.parentNode === li) {
      // Same control... click again to go to next
      this.multi.navRight();
    } else {
      if (nav) {
        nav.remove();
      }
      li.insertAdjacentHTML(
        "beforeend",
        `
                    <span id="s3devMulti" class="s3devMulti">
                        <span id="s3devMultiLeft" class="s3devNav">◀</span><span id="s3devMultiCount"></span><span id="s3devMultiRight" class="s3devNav">▶</span>
                    </span>
                `
      );
      document.getElementById("s3devMultiLeft").addEventListener("mousedown", (...e) => this.multi.navLeft(...e));
      document.getElementById("s3devMultiRight").addEventListener("mousedown", (...e) => this.multi.navRight(...e));

      this.multi.idx = 0;

      if (instanceBlock) {
        for (let i = 0; i < blocks.length; i++) {
          const block = blocks[i];
          if (block.id === instanceBlock.id) {
            this.multi.idx = i;
            break;
          }
        }
        // multi.idx = blocks.indexOf(instanceBlock);
      }

      this.multi.blocks = blocks;
      this.multi.update();

      if (this.multi.idx < blocks.length) {
        this.centerTop(blocks[this.multi.idx]);
      }
    }
  }

  /**
   * Move a costume to the top or bottom of the list
   * @param top true for the top, false for the bottom
   * @param selected optional parameter to pass in the costume div to be moved
   */
  moveCostumeTo(top, selected) {
    let isSelected = !selected || selected.className.indexOf("sprite-selector-item_is-selected") >= 0;
    if (!selected) {
      selected = this.costTabBody.querySelectorAll("div[class*='sprite-selector-item_is-selected']");
      if (selected.length === 0) {
        return;
      }
      selected = selected[0].querySelectorAll("div[class^='sprite-selector-item_sprite-name']")[0];
    }
    let costumes = this.costTabBody.querySelectorAll("div[class^='sprite-selector-item_sprite-name']");

    // First scroll sprite view to reveal top or bottom otherwise this won't work.
    let scroller = selected.closest("div[class*=selector_list-area]");
    let lastScroll = scroller.scrollTop;
    scroller.scrollTop = top ? 0 : scroller.scrollHeight;

    this.domHelpers.triggerDragAndDrop(selected, costumes[top ? 0 : costumes.length - 1], undefined);
    if (!isSelected) {
      // Restore Scroll position
      scroller.scrollTop = lastScroll;
    }
  }

  /**
   *
   * @param li
   * @param workspace
   * @param instanceBlock the instance to be highlighted (or null)
   */
  clickDropDownRow(li, workspace, instanceBlock) {
    let nav = document.getElementById("s3devMulti");

    let cls = li.data.cls;
    if (cls === "costume") {
      // Viewing costumes - jump to selected costume
      let costumes = this.costTabBody.querySelectorAll("div[class^='sprite-selector-item_sprite-name']");
      let costume = costumes[li.data.y];
      if (costume) {
        costume.click();
        setTimeout(() => {
          let wrapper = costume.closest("div[class*=gui_flex-wrapper]");
          costume.parentElement.parentElement.scrollIntoView({
            behavior: "auto",
            block: "center",
            inline: "start",
          });
          wrapper.scrollTop = 0;
        }, 10);
      }
    } else if (cls === "var" || cls === "VAR" || cls === "list" || cls === "LIST") {
      // Search now for all instances
      // let wksp = getWorkspace();
      // let blocks = wksp.getVariableUsesById(li.data.labelID);
      let blocks = this.getVariableUsesById(li.data.labelID);
      this.buildNavigationCarousel(nav, li, blocks, instanceBlock);
    } else if (cls === "define") {
      let blocks = this.getCallsToProcedureById(li.data.labelID);
      this.buildNavigationCarousel(nav, li, blocks, instanceBlock);
    } else if (cls === "receive") {
      /*
                          let blocks = [workspace.getBlockById(li.data.labelID)];
                          if (li.data.clones) {
                              for (const cloneID of li.data.clones) {
                                  blocks.push(workspace.getBlockById(cloneID))
                              }
                          }
                          blocks = blocks.concat(getCallsToEventsByName(li.data.eventName));
              */
      // Now, fetch the events from the scratch runtime instead of blockly
      let blocks = this.getCallsToEventsByName(li.data.eventName);
      if (!instanceBlock) {
        // Can we start by selecting the first block on 'this' sprite
        const currentTargetID = this.utils.getEditingTarget().id;
        for (const block of blocks) {
          if (block.targetId === currentTargetID) {
            instanceBlock = block;
            break;
          }
        }
      }
      this.buildNavigationCarousel(nav, li, blocks, instanceBlock);
    } else if (li.data.clones) {
      let blocks = [workspace.getBlockById(li.data.labelID)];
      for (const cloneID of li.data.clones) {
        blocks.push(workspace.getBlockById(cloneID));
      }
      this.buildNavigationCarousel(nav, li, blocks, instanceBlock);
    } else {
      this.multi.blocks = null;
      this.centerTop(li.data.labelID);
      if (nav) {
        nav.remove();
      }
    }
  }

  dropDownClick(e) {
    // console.log(e);
    let workspace = this.utils.getWorkspace();

    if (prevVal === null) {
      prevVal = this.findInp.value; // Hack to stop filter change if not entered data into edt box, but clicked on row
    }

    let li = e.target;
    for (;;) {
      if (!li || li === this.dd) {
        return;
      }
      if (li.data) {
        break;
      }
      li = li.parentNode;
    }

    // If this was a mouse click, unselect the keyboard selection
    // e.navKey is set when this is called from the keyboard handler...
    if (!e.navKey) {
      let sel = this.dd.getElementsByClassName("sel");
      sel = sel.length > 0 ? sel[0] : null;
      if (sel && sel !== li) {
        try {
          sel.classList.remove("sel");
        } catch (e) {
          console.log(sel);
          console.error(e);
        }
      }
      if (li !== sel) {
        li.classList.add("sel");
      }
    }

    this.clickDropDownRow(li, workspace);
    if (e && e.preventDefault) {
      e.preventDefault();
      e.cancelBubble = true;
    }
    return false;
  }

  /**
   * Based on wksp.centerOnBlock(li.data.labelID);
   * @param e
   * @param force if true, the view always moves, otherwise only move if the selected element is not entirely visible
   */
  centerTop(e, force) {
    this.utils.scrollBlockIntoView(e, force);
  }

  inputChange(e) {
    if (!this.ddOut.classList.contains("vis")) {
      this.showDropDown();
      this.hideDropDown(); // Start timer to hide if not got focus
    }

    // Filter the list...
    let val = (this.findInp.value || "").toLowerCase();
    if (val === prevVal) {
      // No change so don't re-filter
      return;
    }

    prevVal = val;
    this.multi.blocks = null;

    //
    // Hide items in list that do not contain filter text, and highlight the parts of words that match the filter text

    let listLI = this.dd.getElementsByTagName("li");
    for (const li of listLI) {
      let procCode = li.data.procCode;
      let i = li.data.lower.indexOf(val);
      if (i >= 0) {
        li.style.display = "block";
        this.dom_removeChildren(li);
        if (i > 0) {
          li.appendChild(document.createTextNode(procCode.substring(0, i)));
        }
        let bText = document.createElement("b");
        bText.appendChild(document.createTextNode(procCode.substr(i, val.length)));
        li.appendChild(bText);
        if (i + val.length < procCode.length) {
          li.appendChild(document.createTextNode(procCode.substr(i + val.length)));
        }
        // li.innerHTML = enc(procCode.substring(0, i)) + '<b>' + enc(procCode.substr(i, val.length)) + "</b>" + enc(procCode.substr(i + val.length));
      } else {
        li.style.display = "none";
      }
    }
  }

  /**
   * Select previous or next item in the drop down filter list
   * @param dir direction of navigation: -1=up, 1=down
   */
  navigateFilter(dir) {
    let sel = this.dd.getElementsByClassName("sel");
    let nxt;
    if (sel.length > 0 && sel[0].style.display !== "none") {
      nxt = dir === -1 ? sel[0].previousSibling : sel[sel.length - 1].nextSibling;
    } else {
      nxt = this.dd.children[0];
      dir = 1;
    }
    while (nxt && nxt.style.display === "none") {
      nxt = dir === -1 ? nxt.previousSibling : nxt.nextSibling;
    }
    if (nxt) {
      for (const i of sel) {
        i.classList.remove("sel");
      }
      nxt.classList.add("sel");
      this.dropDownClick({ target: nxt, navKey: true });
      // centerTop(nxt.data.labelID);
    }
  }

  inputKeyDown(e) {
    // Up Arrow
    if (e.keyCode === 38) {
      this.navigateFilter(-1);
      e.preventDefault();
      return;
    }

    // Down Arrow
    if (e.keyCode === 40) {
      this.navigateFilter(1);
      e.preventDefault();
      return;
    }

    // Left Arrow
    if (e.keyCode === 37) {
      let sel = this.dd.getElementsByClassName("sel");
      if (sel && this.multi.blocks) {
        this.multi.navLeft(e);
      }
    }

    // Right Arrow
    if (e.keyCode === 39) {
      let sel = this.dd.getElementsByClassName("sel");
      if (sel && this.multi.blocks) {
        this.multi.navRight(e);
      }
    }

    // Enter
    if (e.keyCode === 13) {
      // Any selected on enter? if not select now
      let sel = this.dd.getElementsByClassName("sel");
      if (sel.length === 0) {
        this.navigateFilter(1);
      }
      // noinspection JSUnresolvedFunction
      document.activeElement.blur();
      e.preventDefault();
      return;
    }

    // Escape
    if (e.keyCode === 27) {
      if (this.findInp.value.length > 0) {
        this.findInp.value = ""; // Clear search first, then close on second press
        this.inputChange(e);
      } else {
        // noinspection JSUnresolvedFunction
        document.activeElement.blur();
      }
      e.preventDefault();
      return;
    }
  }

  /*
    function deepSearch(e) {
      document.body.insertAdjacentHTML(
        "beforeend",
        `
              <div id="s3devOverlay">
              </div>
          `
      );

      let overlay = document.getElementById("s3devOverlay");
      overlay.addEventListener("click", function (e) {
        overlay.remove();
      });

      // todo: use scratch runtime instead!

      const runtime = vm.runtime;
      const targets = runtime.targets; // The sprites / stage

      let dict = {};

      for (const target of targets) {
        if (!target.isOriginal) {
          continue; // Skip clones
        }

        const name = target.getName();
        const isStage = target.isStage;
        const blocks = target.blocks;
        const scripts = blocks.getScripts();

        let divElement = document.createElement("div");
        divElement.appendChild(document.createTextNode("Searching in " + name));
        divElement.appendChild(document.createTextNode(", Top Scripts x" + scripts.length));
        overlay.appendChild(divElement);

        const sprite = (dict[name] = {});
        sprite.scripts = [];

        for (const script of scripts) {
          const block = blocks.getBlock(script);
          const top = { id: script, opcode: block.opcode, block: block };
          sprite.scripts.push(top);
        }
      }

      e.preventDefault();
      return true;
    }
  */

  /**
   * Quick and dirty replace all instances of one variable / list with another variable / list
   * @param varId original variable name
   * @param newVarName new variable name
   * @param type type of variable ("" = variable, anything else is a list?
   */
  doReplaceVariable(varId, newVarName, type) {
    let wksp = this.utils.getWorkspace();
    let v = wksp.getVariable(newVarName, type);
    if (!v) {
      alert(this.msg("var-not-exist"));
      return;
    }
    let newVId = v.getId();

    UndoGroup.startUndoGroup(wksp);
    let blocks = this.getVariableUsesById(varId);
    for (const block of blocks) {
      try {
        if (type === "") {
          block.getField("VARIABLE").setValue(newVId);
        } else {
          block.getField("LIST").setValue(newVId);
        }
      } catch (e) {
        // ignore
      }
    }
    UndoGroup.endUndoGroup(wksp);
  }

  /*
    function doInjectScripts(codeString) {
      let w = getWorkspace();
      let xml = new XML(); // document.implementation.createDocument(null, "xml");
      let x = xml.xmlDoc.firstChild;

      let tree = math.parse(codeString);
      console.log(tree);

      const binaryOperatorTypes = {
        add: "operator_add",
        subtract: "operator_subtract",
        this.multiply: "operator_multiply",
        divide: "operator_divide",
      };

      const BLOCK_TYPE = {
        number: "math_number",
        text: "text",
      };

      function translateMathToXml(x, tree, shadowType) {
        let xShadowField = null;
        if (shadowType) {
          let xShadow = xml.newXml(x, "shadow", { type: shadowType });
          if (shadowType === BLOCK_TYPE.number) {
            xShadowField = xml.newXml(xShadow, "field", { name: "NUM" });
          } else if (shadowType === BLOCK_TYPE.text) {
            xShadowField = xml.newXml(xShadow, "field", { name: "TEXT" });
          }
        }

        if (!tree || !tree.type) {
          return;
        }

        if (tree.type === "OperatorNode") {
          let operatorType = binaryOperatorTypes[tree.fn];
          if (operatorType) {
            let xOp = newXml(x, "block", { type: operatorType });
            translateMathToXml(xml.newXml(xOp, "value", { name: "NUM1" }), tree.args[0], BLOCK_TYPE.number);
            translateMathToXml(xml.newXml(xOp, "value", { name: "NUM2" }), tree.args[1], BLOCK_TYPE.number);
            return;
          }

          return;
        }

        if (tree.type === "ConstantNode") {
          // number or text in quotes
          if (xShadowField) {
            xml.setAttr(xShadowField, { text: tree.value });
          }
          return;
        }

        if (tree.type === "SymbolNode") {
          // variable
          let xVar = xml.newXml(x, "block", { type: "data_variable" });
          xml.newXml(xVar, "field", { name: "VARIABLE", text: tree.name });
          return;
        }

        if (tree.type === "FunctionNode") {
          // Method Call
          if (tree.fn.name === "join") {
            let xOp = newXml(x, "block", { type: "operator_join" });
            translateMathToXml(xml.newXml(xOp, "value", { name: "STRING1" }), tree.args[0], BLOCK_TYPE.text);
            translateMathToXml(xml.newXml(xOp, "value", { name: "STRING2" }), tree.args[1], BLOCK_TYPE.text);
            return;
          }
        }
      }

      translateMathToXml(x, tree);
      console.log(x);

      let ids = Blockly.Xml.domToWorkspace(x, w);
      console.log(ids);
    }
     */

  /*
          function clickCleanUp(e) {
              // if (window.confirm('Griffpatch: Tidy up your scripts?')) {
                  doCleanUp();
              // }
              e.preventDefault();
              return false;
          }
      */

  /*
    function clickInject(e) {
      let codeString = window.prompt("Griffpatch: Enter an expression (i.e. a+2*3)");
      if (codeString) {
        doInjectScripts(codeString);
      }
      e.preventDefault();
      return false;
    }
    */

  /**
   * Click Event Handler - User has clicked the replace variable option - ask for the variable to replace with...
   * @param e the event
   * @returns {boolean} cancelled?
   */
  clickReplace(e) {
    let wksp = this.utils.getWorkspace();
    this.hidePopups(wksp);

    setTimeout(() => {
      let wksp = this.utils.getWorkspace();
      let v = wksp.getVariableById(this.selVarID);
      let varName = window.prompt(this.msg("replace", { name: v.name }));
      if (varName) {
        this.doReplaceVariable(this.selVarID, varName, v.type);
      }
    }, 0);
    e.preventDefault();
    return false;
  }

  /**
   * Returns a Set of the top blocks in this workspace / sprite
   * @returns {Set<any>} Set of top blocks
   */
  getTopBlockIDs() {
    let wksp = this.utils.getWorkspace();
    let topBlocks = wksp.getTopBlocks();
    let ids = new Set();
    for (const block of topBlocks) {
      ids.add(block.id);
    }
    return ids;
  }

  /**
   * Initiates a drag event for all block stacks except those in the set of ids.
   * But why? - Because we know all the ids of the existing stacks before we paste / duplicate - so we can find the
   * new stack by excluding all the known ones.
   * @param ids Set of previously known ids
   */
  beginDragOfNewBlocksNotInIDs(ids) {
    if (!this.addon.settings.get("enablePasteBlocksAtMouse")) {
      return;
    }
    let wksp = this.utils.getWorkspace();
    let topBlocks = wksp.getTopBlocks();
    for (const block of topBlocks) {
      if (!ids.has(block.id)) {
        // console.log("I found a new block!!! - " + block.id);
        // todo: move the block to the mouse pointer?
        let mouseXYClone = { x: this.mouseXY.x, y: this.mouseXY.y };
        this.domHelpers.triggerDragAndDrop(block.svgPath_, null, mouseXYClone);
      }
    }
  }

  eventMouseMove(e) {
    this.mouseXY.x = e.clientX;
    this.mouseXY.y = e.clientY;
  }

  eventKeyDown(e) {
    function switchCostume(up) {
      // todo: select previous costume
      let selected = this.costTabBody.querySelector("div[class*='sprite-selector-item_is-selected']");
      let node = up ? selected.parentNode.previousSibling : selected.parentNode.nextSibling;
      if (node) {
        let wrapper = node.closest("div[class*=gui_flex-wrapper]");
        node.querySelector("div[class^='sprite-selector-item_sprite-name']").click();
        node.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "start",
        });
        wrapper.scrollTop = 0;
      }
    }

    if (document.URL.indexOf("editor") <= 0) {
      return;
    }

    let ctrlKey = e.ctrlKey || e.metaKey;

    if (e.key === "f" && ctrlKey) {
      // Ctrl + F (Override default Ctrl+F find)
      this.findInp.focus();
      this.findInp.select();
      e.cancelBubble = true;
      e.preventDefault();
      return true;
    }

    if (e.key === " " && ctrlKey) {
      // Ctrl + Space (Inject Code)
      this.middleClickWorkspace(e);
      e.cancelBubble = true;
      e.preventDefault();
      return true;
    }

    if (e.keyCode === 37 && ctrlKey) {
      // Ctrl + Left Arrow Key
      if (document.activeElement.tagName === "INPUT") {
        return;
      }
      // todo: if (!this.addon.settings.get("enableCtrlLeftRightNav")) {
      //         return;
      //       }
      if (this.isScriptEditor()) {
        this.utils.navigationHistory.goBack();
      } else if (this.isCostumeEditor()) {
        switchCostume(true);
      }
      e.cancelBubble = true;
      e.preventDefault();
      return true;
    }

    if (e.keyCode === 39 && ctrlKey) {
      // Ctrl + Right Arrow Key
      if (document.activeElement.tagName === "INPUT") {
        return;
      }
      // todo: if (!this.addon.settings.get("enableCtrlLeftRightNav")) {
      //         return;
      //       }
      if (this.isScriptEditor()) {
        this.utils.navigationHistory.goForward();
      } else if (this.isCostumeEditor()) {
        switchCostume(false);
      }
      e.cancelBubble = true;
      e.preventDefault();
      return true;
    }

    if (e.keyCode === 86 && ctrlKey && !e.griff) {
      // Ctrl + V
      // Set a timeout so we can take control of the paste after the event
      let ids = this.getTopBlockIDs();
      setTimeout(() => {
        this.beginDragOfNewBlocksNotInIDs(ids);
      }, 10);
    }

    // if (e.keyCode === 220 && (!document.activeElement || document.activeElement.tagName === 'INPUT')) {
    //
    // }
  }

  eventMouseDown(e) {
    if (this.ddOut && this.ddOut.classList.contains("vis") && !e.target.closest("#s3devDDOut")) {
      // If we click outside the dropdown, then instigate the hide code...
      this.hideDropDown();
    }

    if (this.floatInp && !e.target.closest("#s3devIDDOut")) {
      // If we click outside the dropdown, then instigate the hide code...
      this.hideFloatDropDown();
    }

    if (e.button === 1) {
      // Wheel button...
      try {
        this.middleClick(e);
      } catch (x) {
        console.error(x);
      }
    } else if (e.button === 2) {
      // Right click...
      let spriteSelector = e.target.closest("#react-tabs-3 div[class*='sprite-selector-item_sprite-selector-item']");
      if (spriteSelector) {
        let contextMenu = spriteSelector.getElementsByTagName("nav")[0];
        if (!contextMenu.querySelector("div.s3devSTT")) {
          contextMenu.insertAdjacentHTML(
            "beforeend",
            `
                            <div class="${this.addon.tab.scratchClass(
                              "context-menu_menu-item",
                              "context-menu_menu-item-bordered",
                              {
                                others: ["react-contextmenu-item", "s3devSTT"],
                              }
                            )}" role="menuitem"
                                tabindex="-1" aria-disabled="false"><span>${this.m("top")}</span></div>
                            <div class="${this.addon.tab.scratchClass("context-menu_menu-item", {
                              others: ["react-contextmenu-item", "s3devSTT"],
                            })}" role="menuitem"
                                tabindex="-1" aria-disabled="false"><span>${this.m("bottom")}</span></div>
                        `
          );
        }
      }

      let blockSvg = e.target.closest("[data-id]");
      let isBackground = !blockSvg && e.target.closest("svg.blocklySvg");
      if (blockSvg || isBackground) {
        let dataId = blockSvg && blockSvg.getAttribute("data-id");
        if (dataId || isBackground) {
          setTimeout(async () => {
            // Is there a popup menu to hi-jack?
            let widget = document.querySelector("div.blocklyWidgetDiv");
            if (!widget) {
              return;
            }
            let blocklyContextMenu = widget.querySelector("div.blocklyContextMenu");
            if (!blocklyContextMenu) {
              return;
            }
            if (isBackground) {
              let cleanupPlus = this.addon.settings.get("enableCleanUpPlus");

              let nodes = blocklyContextMenu.children;
              const realBlockly = await this.addon.tab.traps.getBlockly();
              if (cleanupPlus) {
                for (const node of nodes) {
                  if (node.textContent === realBlockly.Msg.CLEAN_UP) {
                    node.remove();
                    break;
                  }
                }
              }
              let html = cleanupPlus
                ? `
                  <div id="s3devCleanUp" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none; border-top: 1px solid hsla(0, 0%, 0%, 0.15);">
                      <div class="goog-menuitem-content" style="user-select: none;">${this.m("clean-plus")}</div>
                  </div>
              `
                : "";

              html += `
                  <div id="s3devPaste" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none;">
                      <div class="goog-menuitem-content" style="user-select: none;">${this.m("paste")}</div>
                  </div>
              `;
              blocklyContextMenu.insertAdjacentHTML("beforeend", html);
            } else {
              let wksp = this.utils.getWorkspace();
              let block = wksp.getBlockById(dataId);
              let isFlyOut = block.workspace.isFlyout;

              /* todo - look at this menu code ***** !!!!!
                const BROADCAST_BLOCKS = ["event_whenbroadcastreceived", "event_broadcast", "event_broadcastandwait"];
                if (BROADCAST_BLOCKS.includes(block.type)) {
                  // Show Broadcast
                  const broadcastId = showBroadcastSingleton.getAssociatedBroadcastId(dataId);
                  if (broadcastId) {
                    for (const showKey of ["Senders", "Receivers"]) {
                      const googMenuItemContent = Object.assign(document.createElement("div"), {
                        textContent: this.msg(`show-${showKey}`.toLowerCase()),
                        style: "user-select: none;",
                        className: "goog-menuitem-content",
                      });
                      const googMenuItem = Object.assign(document.createElement("div"), {
                        id: `s3devShow${showKey}`,
                        className: "goog-menuitem s3dev-mi",
                        role: "menuitem",
                        style: "user-select: none;",
                      });
                      googMenuItem.addEventListener("click", () => {
                        hidePopups(wksp);
                        showBroadcastSingleton[`show${showKey}`](broadcastId);
                      });
                      googMenuItem.appendChild(googMenuItemContent);
                      blocklyContextMenu.appendChild(googMenuItem);
                    }
                  }
                }
                */

              if (!isFlyOut) {
                blocklyContextMenu.insertAdjacentHTML(
                  "beforeend",
                  `
                    <div id="s3devMakeSpace" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none; border-top: 1px solid hsla(0, 0%, 0%, 0.15);">
                        <div class="goog-menuitem-content" style="user-select: none;">${this.m("make-space")}</div>
                    </div>
                    <div id="s3devCopy" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none; border-top: 1px solid hsla(0, 0%, 0%, 0.15);">
                        <div class="goog-menuitem-content" style="user-select: none;">${this.m("copy-all")}</div>
                    </div>
                    <div id="s3devCopyBlock" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none;">
                        <div class="goog-menuitem-content" style="user-select: none;">${this.m("copy-block")}</div>
                    </div>
                    <div id="s3devCutBlock" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none;">
                        <div class="goog-menuitem-content" style="user-select: none;">${this.m("cut-block")}</div>
                    </div>
                  `
                );
              }

              // Is this a variable or a list?
              if (block && (block.getCategory() === "data" || block.getCategory() === "data-lists")) {
                blocklyContextMenu.insertAdjacentHTML(
                  "beforeend",
                  `
                        <div id="s3devReplaceAllVars" class="goog-menuitem s3dev-mi" role="menuitem" style="user-select: none; border-top: 1px solid hsla(0, 0%, 0%, 0.15);">
                            <div class="goog-menuitem-content" style="user-select: none;">${this.m("swap", {
                              var: block.getCategory() === "data" ? this.m("variables") : this.m("lists"),
                            })}</div>
                        </div>
                  `
                );
                this.selVarID = block.getVars()[0];
              }
            }

            if (blocklyContextMenu.children.length < 15) {
              blocklyContextMenu.style.maxHeight = "none";
              widget.style.height = blocklyContextMenu.getBoundingClientRect().height + 12 + "px";
              blocklyContextMenu.style.maxHeight = "";
            }

            let copyDiv = blocklyContextMenu.querySelector("div#s3devCleanUp");
            if (copyDiv) {
              copyDiv.addEventListener("click", (...e) => this.doCleanUp(...e));
            }
            copyDiv = blocklyContextMenu.querySelector("div#s3devMakeSpace");
            if (copyDiv) {
              copyDiv.addEventListener("click", (e) => this.doCleanUp(e, dataId));
            }
            copyDiv = blocklyContextMenu.querySelector("div#s3devCopy");
            if (copyDiv) {
              copyDiv.addEventListener("click", (...e) => eventCopyClick(...e));
            }
            copyDiv = blocklyContextMenu.querySelector("div#s3devCopyBlock");
            if (copyDiv) {
              copyDiv.addEventListener("click", (e) => {
                eventCopyClick(e, 1);
              });
            }
            copyDiv = blocklyContextMenu.querySelector("div#s3devCutBlock");
            if (copyDiv) {
              copyDiv.addEventListener("click", (e) => {
                eventCopyClick(e, 2);
              });
            }
            copyDiv = blocklyContextMenu.querySelector("div#s3devReplaceAllVars");
            if (copyDiv) {
              copyDiv.addEventListener("click", (...e) => this.clickReplace(...e));
            }

            let devTools = this;
            function eventCopyClick(e, blockOnly) {
              let wksp = devTools.utils.getWorkspace();
              devTools.hidePopups(wksp);

              let block = wksp.getBlockById(dataId);
              if (block) {
                block.select();
                let next = blockOnly ? block.getNextBlock() : null;
                if (next) {
                  next.unplug(false); // setParent(null);
                }

                // separate child temporarily
                document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 67, ctrlKey: true }));
                if (next || blockOnly === 2) {
                  setTimeout(() => {
                    if (next) {
                      wksp.undo(); // undo the unplug above...
                    }
                    if (blockOnly === 2) {
                      let block = wksp.getBlockById(dataId);
                      UndoGroup.startUndoGroup(wksp);
                      block.dispose(true);
                      UndoGroup.endUndoGroup(wksp);
                    }
                  }, 0);
                }
              }
            }

            let pasteDiv = blocklyContextMenu.querySelector("div#s3devPaste");
            if (pasteDiv) {
              pasteDiv.addEventListener("click", function () {
                let wksp = devTools.utils.getWorkspace();
                devTools.hidePopups(wksp);

                let ids = devTools.getTopBlockIDs();

                document.dispatchEvent(
                  new KeyboardEvent("keydown", {
                    keyCode: 86,
                    ctrlKey: true,
                    griff: true,
                  })
                );

                setTimeout(() => {
                  devTools.beginDragOfNewBlocksNotInIDs(ids);
                }, 10);
              });
            }
          }, 1);
        }
      }
    } else {
      let chk = e.target;
      if (chk && chk.tagName !== "BUTTON" && chk.getAttribute && !chk.getAttribute("role")) {
        chk = chk.parentNode;
        if (chk && chk.tagName !== "BUTTON" && chk.getAttribute && !chk.getAttribute("role")) {
          chk = chk.parentNode;
        }
      }

      if (chk && chk.className && chk.className.indexOf) {
        if (chk.className.indexOf("see-inside-button") >= 0) {
          // Try to re-inject GUI after rebuild
          setTimeout(() => this.initInner(), 200);
        }

        if (!this.canShare && chk.className.indexOf("share-button") >= 0) {
          // Commented for ScratchAddons
          /*e.cancelBubble = true;
                      e.preventDefault();

                      if (confirm("Griffpatch: Are you sure you want to share?")) {
                          // action the share!
                          canShare = true;
                          chk.click();
                      }*/

          return;
        }
      }

      chk = e.target.tagName === "SPAN" ? e.target.parentNode : e.target;

      if (chk.classList.contains("s3devSTT")) {
        if (chk.textContent === this.m("top") || chk.textContent === this.m("bottom")) {
          let spriteSelector = e.target.closest("div[class*='sprite-selector-item_sprite-selector-item']");
          this.moveCostumeTo(chk.textContent === this.m("top"), spriteSelector);
          e.cancelBubble = true;
          e.preventDefault();
        }
      }
    }
  }

  middleClickWorkspace(e) {
    if (!this.isScriptEditor()) {
      return;
    }

    // todo: if (!this.addon.settings.get("enableBlockInjector")) {
    //         return;
    //       }

    e.cancelBubble = true;
    e.preventDefault();

    let floatBar = document.getElementById("s3devFloatingBar");
    if (floatBar) {
      floatBar.remove();
    }

    // Popup new input box for block injection
    document.body.insertAdjacentHTML(
      "beforeend",
      `
            <div id="s3devFloatingBar">
                <label class='title s3devLabel' id=s3devInsertLabel>
                    <span style="display:none;">${this.m("insert")} </span>
                    <span id=s3devInsert class="s3devWrap">
                        <div id='s3devIDDOut' class="s3devDDOut">
                            <input id='s3devIInp' class="${this.addon.tab.scratchClass("input_input-form", {
                              others: "s3devInp",
                            })}" type='search' placeholder='${this.m("start-typing")}' autocomplete='off'>
                            <ul id='s3devIDD' class="s3devDD"></ul>
                        </div>
                    </span>
                </label>
            </div>
        `
    );

    floatBar = document.getElementById("s3devFloatingBar");
    floatBar.style.left = this.mouseXY.x + 16 + "px";
    floatBar.style.top = this.mouseXY.y - 8 + "px";

    this.floatInp = document.getElementById("s3devIInp");
    this.floatInp.focus();

    // Build Filter List...

    this.buildFloatingFilterList(e, floatBar);

    const ddOut = document.getElementById("s3devIDDOut");
    ddOut.addEventListener("mousedown", (...e) => this.dropDownFloatClick(...e));

    this.floatInp.addEventListener("keyup", (...e) => this.floatInputChange(...e));
    this.floatInp.addEventListener("focus", (...e) => this.floatInputChange(...e));
    this.floatInp.addEventListener("keydown", (...e) => this.floatInputKeyDown(...e));
  }

  middleClick(e) {
    // Intercept clicks to allow jump to...?
    let blockSvg = e.target.closest("[data-id]");
    if (!blockSvg) {
      // Ok, so no selection... are we at least clicking on the workspace?
      if (e.target.closest("svg.blocklySvg")) {
        this.blockCursor = null; // Clear the cursor if using the mouse
        this.middleClickWorkspace(e);
      }
      return;
    }

    if (!this.addon.settings.get("enableMiddleClickFinder")) {
      return;
    }

    let w = this.utils.getWorkspace();
    let dataId = blockSvg.getAttribute("data-id");
    let block = w.getBlockById(dataId);
    if (!block) {
      return;
    }

    // Move outwards until we reach a block we can take action on

    for (; block; block = block.getSurroundParent()) {
      if (block.type === "procedures_call") {
        e.cancelBubble = true;
        e.preventDefault();

        // todo: navigate to definition
        let findProcCode = block.getProcCode();

        let wksp = this.utils.getWorkspace();
        let topBlocks = wksp.getTopBlocks();
        for (const root of topBlocks) {
          if (root.type === "procedures_definition") {
            let label = root.getChildren()[0];
            let procCode = label.getProcCode();
            if (procCode && procCode === findProcCode) {
              // Found... navigate to it!
              this.centerTop(root);
              return;
            }
          }
        }
      }

      if (block.type === "procedures_definition") {
        let id = block.id ? block.id : block.getId ? block.getId() : null;

        this.findInp.focus();
        this.showDropDown(null, id);
        // findInp.select();

        e.cancelBubble = true;
        e.preventDefault();
        return;
      }

      if (
        block.type === "data_variable" ||
        block.type === "data_changevariableby" ||
        block.type === "data_setvariableto"
      ) {
        let id = block.getVars()[0];

        this.findInp.focus();
        this.showDropDown(null, id, block);

        // let button = document.getElementById('s3devReplace');

        this.selVarID = id;
        // button.classList.remove('s3devHide');

        e.cancelBubble = true;
        e.preventDefault();
        return;
      }

      if (
        block.type === "event_whenbroadcastreceived" ||
        block.type === "event_broadcastandwait" ||
        block.type === "event_broadcast"
      ) {
        // todo: actually index the broadcasts...!
        let id = block.id;

        this.findInp.focus();
        this.showDropDown(null, id, block);

        this.selVarID = id;

        e.cancelBubble = true;
        e.preventDefault();
        return;
      }
    }

    e.cancelBubble = true;
    e.preventDefault();
  }

  getEdgeTypeClass(block) {
    switch (block.edgeShape_) {
      case 1:
        return "boolean";
      case 2:
        return "reporter";
      default:
        return block.startHat_ ? "hat" : "block";
    }
  }

  buildFloatingFilterList(e, floatBar) {
    // todo: Iterate through the toolbox?

    let options = [];

    let t = Blockly.getMainWorkspace().getToolbox();

    let blocks = t.flyout_.getWorkspace().getTopBlocks();
    // 107 blocks, not in order... but we can sort by y value or description right :)

    let fullDom = Blockly.Xml.workspaceToDom(t.flyout_.getWorkspace());
    const doms = {};
    for (const x of fullDom.children) {
      if (x.tagName === "BLOCK") {
        // let type = x.getAttribute('type');
        let id = x.getAttribute("id");
        doms[id] = x;
      }
    }

    for (const block of blocks) {
      this.getBlockText(block, options, doms);
    }

    // Griffpatch - on second thoughts - lets sort blocks by length so that shortest ones appear at the top.
    options.sort((a, b) =>
      a.desc.length < b.desc.length ? -1 : a.desc.length > b.desc.length ? 1 : a.desc.localeCompare(b.desc)
    );

    // Previous sort was just alphabetical
    // options.sort((a, b) => a.desc.localeCompare(b.desc));

    const dd = document.getElementById("s3devIDD");

    let count = 0;
    //DROPDOWN_BLOCK_LIST_MAX_ROWS

    for (const option of options) {
      const li = document.createElement("li");
      const desc = option.desc;

      // bType = hat block reporter boolean

      let bType = this.getEdgeTypeClass(option.block);

      count++;

      li.innerText = desc;
      li.data = { text: desc, lower: " " + desc.toLowerCase(), option: option };
      li.className =
        "var " + (option.block.isScratchExtension ? "extension" : option.block.getCategory()) + " " + bType; // proc.cls;
      if (count > DROPDOWN_BLOCK_LIST_MAX_ROWS) {
        // Limit maximum number of rows to prevent lag when no filter is applied
        li.style.display = "none";
      }
      dd.appendChild(li);
    }

    const ddOut = document.getElementById("s3devIDDOut");
    ddOut.classList.add("vis");

    // console.log(options);
  }

  /**
   * Flesh out a blocks description - duplicate up blocks with contained picklists (like list drop downs)
   * @param block
   * @param options
   * @param doms
   * @returns {string}
   */
  getBlockText(block, options, doms) {
    // block.type;  "looks_nextbackdrop"

    let desc;
    let picklist, pickField;

    let dom = doms[block.id];

    // dom = doms[block.type];

    const process = (block) => {
      for (const input of block.inputList) {
        // input.name = "", input.type = 5
        let fields = input.fieldRow;
        for (const field of fields) {
          // field --- Blockly.FieldLabel .className = "blocklyText"
          // Blockly.FieldDropdown --- .className = "blocklyText blocklyDropdownText"

          let text;

          if (!picklist && field.className_ === "blocklyText blocklyDropdownText") {
            picklist = field.getOptions();
            pickField = field.name;
            if (picklist && picklist.length > 0) {
              text = "^^";
            } else {
              text = field.getText();
            }
          } else {
            text = field.getText();
          }

          desc = (desc ? desc + " " : "") + text;
        }

        if (input.connection) {
          let innerBlock = input.connection.targetBlock();
          if (innerBlock) {
            process(innerBlock); // Recursive process connected child blocks...
          }
        }
      }
    };

    process(block);

    if (picklist) {
      for (const item of picklist) {
        let code = item[1];
        if (
          typeof code !== "string" || // Audio Record is a function!
          code === "DELETE_VARIABLE_ID" ||
          code === "RENAME_VARIABLE_ID" ||
          code === "NEW_BROADCAST_MESSAGE_ID" ||
          code === "NEW_BROADCAST_MESSAGE_ID"
        ) {
          continue; // Skip these
        }
        options.push({
          desc: desc.replace("^^", item[0]),
          block: block,
          dom: dom,
          option: item,
          pickField: pickField,
        });
      }
    } else {
      options.push({ desc: desc, block: block, dom: dom });
    }

    return desc;
  }

  floatInputKeyDown(e) {
    if (e.keyCode === 38) {
      this.navigateFloatFilter(-1);
      e.preventDefault();
      return;
    }
    if (e.keyCode === 40) {
      this.navigateFloatFilter(1);
      e.preventDefault();
      return;
    }
    if (e.keyCode === 13) {
      // Enter
      let dd = document.getElementById("s3devIDD");
      let sel = dd.querySelector(".sel");
      if (sel) {
        this.dropDownFloatClick(e);
      }
      e.cancelBubble = true;
      e.preventDefault();
      return;
    }
    if (e.keyCode === 27) {
      // Escape
      let findInp = document.getElementById("s3devIInp");
      if (findInp.value.length > 0) {
        findInp.value = ""; // Clear search first, then close on second press
        this.floatInputChange(e);
      } else {
        this.reallyHideFloatDropDown(true);
      }
      e.preventDefault();
      return;
    }
  }

  navigateFloatFilter(dir) {
    let dd = document.getElementById("s3devIDD");
    let sel = dd.getElementsByClassName("sel");
    let nxt;
    if (sel.length > 0 && sel[0].style.display !== "none") {
      nxt = dir === -1 ? sel[0].previousSibling : sel[sel.length - 1].nextSibling;
    } else {
      nxt = dd.children[0];
      dir = 1;
    }
    while (nxt && nxt.style.display === "none") {
      nxt = dir === -1 ? nxt.previousSibling : nxt.nextSibling;
    }
    if (nxt) {
      for (const i of sel) {
        i.classList.remove("sel");
      }
      nxt.classList.add("sel");
      // centerTop(nxt.data.labelID);
    }
  }

  /**
   * This is a feature in progress - can we have a virtual cursor that allows the next injected element position be automated
   * @param block a blockly block
   * @param typ type
   */
  findNextHole(block, typ) {
    /*
      const inputs = block.inputList;
      if (inputs) {
        /!** Blockly.Input *!/
        for (const input of inputs) {
          const fieldRow = input.fieldRow;
          if (fieldRow) {
            /!** Blockly.FieldNumber *!/
            for (const field of fieldRow) {
              if (field.argType_ && field.argType_.includes(typ)) {
              }
            }
          }
        }
      }
  */
  }

  /**
   * Inject the selected block into the script
   * @param e
   */
  dropDownFloatClick(e) {
    e.cancelBubble = true;
    e.preventDefault();

    let wksp = this.utils.getWorkspace();

    let sel = e && e.target;
    if (sel.tagName === "B") {
      sel = sel.parentNode;
    }

    if (e instanceof MouseEvent && sel.tagName !== "LI") {
      // Mouse clicks need to be on a block...
      return;
    }

    if (!sel || !sel.data) {
      let dd = document.getElementById("s3devIDD");
      sel = dd.querySelector(".sel");
    }

    if (!sel) {
      return;
    }

    const xml = new XML();
    let x = xml.xmlDoc.firstChild;
    let option = sel.data.option;
    // block:option.block, dom:option.dom, option:option.option
    if (option.option) {
      // We need to tweak the dropdown in this xml...
      let field = option.dom.querySelector("field[name=" + option.pickField + "]");
      if (field.getAttribute("id")) {
        field.innerText = option.option[0];
        field.setAttribute("id", option.option[1] + "-" + option.option[0]);
      } else {
        field.innerText = option.option[1]; // griffpatch - oops! option.option[1] not 0?
      }
    }

    x.appendChild(option.dom);

    let ids = Blockly.Xml.domToWorkspace(x, wksp);

    this.reallyHideFloatDropDown(true);

    let block = wksp.getBlockById(ids[0]);

    if (this.blockCursor) {
      // What sort of block did we just inject?
      let typ = this.getEdgeTypeClass(option.block);
      if (typ === "boolean") {
        this.findNextHole(this.blockCursor, "");
      } else if (typ === "reporter") {
        this.findNextHole(this.blockCursor, typ);
      }
    }

    this.domHelpers.triggerDragAndDrop(block.svgPath_, null, { x: this.mouseXY.x, y: this.mouseXY.y });

    this.blockCursor = block;
  }

  floatInputChange(e) {
    let ddOut = document.getElementById("s3devIDDOut");

    if (!ddOut.classList.contains("vis")) {
      // showDropDown();
      // hideDropDown(); // Start timer to hide if not got focus
    }

    let findInp = document.getElementById("s3devIInp");

    // Filter the list...
    let val = (findInp.value || "").toLowerCase();
    if (val === prevVal) {
      return;
    }

    prevVal = val;
    this.multi.blocks = null;

    let dd = document.getElementById("s3devIDD");
    let p = dd.parentNode;
    dd.remove();

    let count = 0;

    let split = val.split(" ");
    let listLI = dd.getElementsByTagName("li");
    for (const li of listLI) {
      const procCode = li.data.text;
      const lower = li.data.lower;
      // let i = li.data.lower.indexOf(val);
      // let array = regExp.exec(li.data.lower);

      let im = 0;
      let match = [];
      for (let si = 0; si < split.length; si++) {
        let find = " " + split[si];
        let idx = lower.indexOf(find, im);
        if (idx === -1) {
          match = null;
          break;
        }
        match.push(idx);
        im = idx + find.length;
      }

      if (count < DROPDOWN_BLOCK_LIST_MAX_ROWS && match) {
        li.style.display = "block";
        this.dom_removeChildren(li);

        let i = 0;

        for (let iM = 0; iM < match.length; iM++) {
          let im = match[iM];
          if (im > i) {
            li.appendChild(document.createTextNode(procCode.substring(i, im)));
            i = im;
          }
          let bText = document.createElement("b");
          let len = split[iM].length;
          bText.appendChild(document.createTextNode(procCode.substr(i, len)));
          li.appendChild(bText);
          i += len;
        }

        if (i < procCode.length) {
          li.appendChild(document.createTextNode(procCode.substr(i)));
        }

        if (count === 0) {
          li.classList.add("sel");
        } else {
          li.classList.remove("sel");
        }
        count++;
      } else {
        li.style.display = "none";
        li.classList.remove("sel");
      }
    }
    p.append(dd);
  }

  // Loop until the DOM is ready for us...
  initInner() {
    let root = document.querySelector("ul[class*=gui_tab-list_]");
    let guiTabs = root && root.childNodes;
    if (!guiTabs || guiTabs.length < 3) {
      setTimeout(() => this.initInner(), 1000);
      return;
    }

    if (this.codeTab && guiTabs[0] !== this.codeTab) {
      // We have been CHANGED!!! - Happens when going to project page, and then back inside again!!!
      this.domHelpers.unbindAllEvents();
    }

    this.codeTab = guiTabs[0];
    this.costTab = guiTabs[1];
    this.costTabBody = document.querySelector("div[aria-labelledby=" + this.costTab.id + "]");

    if (!document.getElementById("s3devFind")) {
      // noinspection JSUnresolvedVariable
      root.insertAdjacentHTML(
        "beforeend",
        `
                <div id="s3devToolBar">
                    <label class='title s3devLabel' id=s3devFindLabel>
                        <span>${this.m("find")} ${
          this.addon.self._isDevtoolsExtension
            ? ""
            : '<a href="#" class="s3devAction" id="s3devHelp" style="/*s-a*/ margin-left: 0; font-size: 10px; /*s-a*/">(?)</a>'
        } </span>
                        <span id=s3devFind class="s3devWrap">
                            <div id='s3devDDOut' class="s3devDDOut">
                                <input id='s3devInp' class="${this.addon.tab.scratchClass("input_input-form", {
                                  others: "s3devInp",
                                })}" type='search' placeholder='${this.m("find-placeholder")}' autocomplete='off'>
                                <ul id='s3devDD' class="s3devDD"></ul>
                            </div>
                        </span>
                        <a id="s3devDeep" class="s3devAction s3devHide" href="#">${this.m("deep")}</a>
                        <div ${
                          this.addon.self._isDevtoolsExtension ? "" : 'style="display: none;"'
                        }><a href="#" class="s3devAction" id="s3devHelp"><b>${this.m("help")}</b></a>
                        <a href="https://www.youtube.com/griffpatch" class="s3devAction" target="_blank" id="s3devHelp">${this.m(
                          "tutorials"
                        )}</a></div>
                    </label>
<!--                    <a id="s3devCleanUp" class="s3devAction" href="#">Clean Up</a>-->
<!--                    <a id="s3devReplace" class="s3devAction s3devHide" href="#">Replace All</a>-->
                </div>
            `
      );

      this.find = document.getElementById("s3devFind");
      this.findInp = document.getElementById("s3devInp");
      this.ddOut = document.getElementById("s3devDDOut");
      this.domHelpers.bindOnce(this.ddOut, "mousedown", (...e) => this.dropDownClick(...e), undefined);
      this.dd = document.getElementById("s3devDD");

      // bindOnce(find, 'mouseenter', showDropDown);
      // bindOnce(find, 'mouseleave', hideDropDown);
      this.domHelpers.bindOnce(this.findInp, "keyup", (...e) => this.inputChange(...e), undefined);
      this.domHelpers.bindOnce(this.findInp, "keydown", (...e) => this.inputKeyDown(...e), undefined);
      this.domHelpers.bindOnce(this.findInp, "focus", (...e) => this.inputChange(...e), undefined);

      this.domHelpers.bindOnce(
        document.getElementById("s3devHelp"),
        "click",
        (...e) => this.eventClickHelp(...e),
        undefined
      );

      this.domHelpers.bindOnce(document, "keydown", (...e) => this.eventKeyDown(...e), true);
    }

    this.domHelpers.bindOnce(document, "mousemove", (...e) => this.eventMouseMove(...e), true);
    this.domHelpers.bindOnce(document, "mousedown", (...e) => this.eventMouseDown(...e), true); // true to capture all mouse downs 'before' the dom events handle them
    // bindOnce(document.getElementById("s3devDeep"), "click", deepSearch);
    // bindOnce(document.getElementById('s3devCleanUp'),'click', clickCleanUp);
    // bindOnce(document.getElementById("s3devInject"), "click", clickInject);
    // bindOnce(document.getElementById('s3devReplace'), 'click', clickReplace);
  }
}

class Multi {
  constructor(utils) {
    this.idx = 0;
    this.blocks = null;
    this.selID = null;
    /**
     * @type {Utils}
     */
    this.utils = utils;
  }

  update() {
    const count = document.getElementById("s3devMultiCount");
    count.innerText = this.blocks && this.blocks.length > 0 ? enc(this.idx + 1 + " / " + this.blocks.length) : "0";
    this.selID = this.idx < this.blocks.length ? this.blocks[this.idx].id : null;
  }

  navLeft(e) {
    return this.navSideways(e, -1);
  }

  navRight(e) {
    return this.navSideways(e, 1);
  }

  navSideways(e, dir) {
    if (this.blocks && this.blocks.length > 0) {
      this.idx = (this.idx + dir + this.blocks.length) % this.blocks.length; // + length to fix negative modulo js issue.
      this.update();
      this.utils.scrollBlockIntoView(this.blocks[this.idx]);
    }
    if (e) {
      e.cancelBubble = true;
      e.preventDefault();
    }
    return false;
  }
}

class Col {
  /**
   * @param x {Number} x position (for ordering)
   * @param count {Number}
   * @param blocks {[Block]}
   */
  constructor(x, count, blocks) {
    /**
     * x position (for ordering)
     * @type {Number}
     */
    this.x = x;
    /**
     * @type {Number}
     */
    this.count = count;
    /**
     * @type {[Blockly.Block]}
     */
    this.blocks = blocks;
  }
}

const DROPDOWN_BLOCK_LIST_MAX_ROWS = 25;

let rhdd = 0;
let rhdd2 = 0;
let prevVal = "";

function enc(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
