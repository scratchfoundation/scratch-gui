import BlockInstance from "../BlockInstance.js";
import BlockFlasher from "./BlockFlasher.js";

// A file to split Editor Devtools by features.

export default class Utils {
  constructor(addon) {
    this.addon = addon;
    /**
     * Scratch Virtual Machine
     * @type {null|*}
     */
    this.vm = this.addon.tab.traps.vm;
    // this._myFlash = { block: null, timerID: null, colour: null };
    this.offsetX = 32;
    this.offsetY = 32;
    this.navigationHistory = new NavigationHistory(this);
    /**
     * The workspace
     */
    this._workspace = null;
  }

  /**
   * Get the Scratch Editing Target
   * @returns {?Target} the scratch editing target
   */
  getEditingTarget() {
    return this.vm.runtime.getEditingTarget();
  }

  /**
   * Set the current workspace (switches sprites)
   * @param targetID {string}
   */
  setEditingTarget(targetID) {
    if (this.getEditingTarget().id !== targetID) {
      this.vm.setEditingTarget(targetID);
    }
  }

  /**
   * Returns the main workspace
   * @returns !Blockly.Workspace
   */
  getWorkspace() {
    const currentWorkspace = Blockly.getMainWorkspace();
    if (currentWorkspace.getToolbox()) {
      // Sadly get get workspace does not always return the 'real' workspace... Not sure how to get that at the moment,
      //  but we can work out whether it's the right one by whether it has a toolbox.
      this._workspace = currentWorkspace;
    }
    return this._workspace;
  }

  /**
   * Based on wksp.centerOnBlock(li.data.labelID);
   * @param blockOrId {Blockly.Block|{id}|BlockInstance} A Blockly Block, a block id, or a BlockInstance
   * @param [force] {boolean} if true, the view always moves, otherwise only move if the selected element is not entirely visible
   */
  scrollBlockIntoView(blockOrId, force) {
    let workspace = this.getWorkspace();
    /** @type {Blockly.Block} */
    let block; // or is it really a Blockly.BlockSvg?

    if (blockOrId instanceof BlockInstance) {
      // Switch to sprite
      this.setEditingTarget(blockOrId.targetId);
      // Highlight the block!
      block = workspace.getBlockById(blockOrId.id);
    } else {
      block = blockOrId && blockOrId.id ? blockOrId : workspace.getBlockById(blockOrId);
    }

    if (!block) {
      return;
    }

    /**
     * !Blockly.Block
     */
    let root = block.getRootBlock();
    let base = this.getTopOfStackFor(block);
    let ePos = base.getRelativeToSurfaceXY(), // Align with the top of the block
      rPos = root.getRelativeToSurfaceXY(), // Align with the left of the block 'stack'
      scale = workspace.scale,
      x = rPos.x * scale,
      y = ePos.y * scale,
      xx = block.width + x, // Turns out they have their x & y stored locally, and they are the actual size rather than scaled or including children...
      yy = block.height + y,
      s = workspace.getMetrics();
    if (
      x < s.viewLeft + this.offsetX - 4 ||
      xx > s.viewLeft + s.viewWidth ||
      y < s.viewTop + this.offsetY - 4 ||
      yy > s.viewTop + s.viewHeight
    ) {
      // sx = s.contentLeft + s.viewWidth / 2 - x,
      let sx = x - s.contentLeft - this.offsetX,
        // sy = s.contentTop - y + Math.max(Math.min(32, 32 * scale), (s.viewHeight - yh) / 2);
        sy = y - s.contentTop - this.offsetY;

      this.navigationHistory.storeView(this.navigationHistory.peek(), 64);

      // workspace.hideChaff(),
      workspace.scrollbar.set(sx, sy);
      this.navigationHistory.storeView({ left: sx, top: sy }, 64);
    }
    BlockFlasher.flash(block);
  }

  /**
   * Find the top stack block of a stack
   * @param block a block in a stack
   * @returns {*} a block that is the top of the stack of blocks
   */
  getTopOfStackFor(block) {
    let base = block;
    while (base.getOutputShape() && base.getSurroundParent()) {
      base = base.getSurroundParent();
    }
    return base;
  }
}

class NavigationHistory {
  constructor(utils) {
    this.utils = utils;
    this.views = [];
    this.forward = [];
  }

  /**
   * Keep a record of the scroll and zoom position
   */
  storeView(next, dist) {
    this.forward = [];
    let workspace = this.utils.getWorkspace(),
      s = workspace.getMetrics();

    let pos = { left: s.viewLeft, top: s.viewTop };
    if (!next || distance(pos, next) > dist) {
      this.views.push(pos);
    }
  }

  peek() {
    return this.views.length > 0 ? this.views[this.views.length - 1] : null;
  }

  goBack() {
    const workspace = this.utils.getWorkspace(),
      s = workspace.getMetrics();

    let pos = { left: s.viewLeft, top: s.viewTop };
    let view = this.peek();
    if (!view) {
      return;
    }
    if (distance(pos, view) < 64) {
      // Go back to current if we are already far away from it
      if (this.views.length > 1) {
        this.views.pop();
        this.forward.push(view);
      }
    }

    view = this.peek();
    if (!view) {
      return;
    }

    let sx = view.left - s.contentLeft,
      sy = view.top - s.contentTop;

    // transform.setTranslate(-600,0);

    workspace.scrollbar.set(sx, sy);

    /*
              let blocklySvg = document.getElementsByClassName('blocklySvg')[0];
              let blocklyBlockCanvas = blocklySvg.getElementsByClassName('blocklyBlockCanvas')[0];
              let transform = blocklyBlockCanvas.transform.baseVal.getItem(0);
              let scale = blocklyBlockCanvas.transform.baseVal.getItem(1);

              let transformMatrix = transform.matrix;
              let scaleMatrix = scale.matrix;

              console.log('Transform - getMetrics', s);
              console.log('sx, sy: ', sx, sy);
              console.log('left, top: ', view.left, view.top);
              console.log('contentLeft, right:', s.contentLeft, s.contentTop);
              console.log('transform, scale matrix: ', transformMatrix, scaleMatrix);
  */
  }

  goForward() {
    let view = this.forward.pop();
    if (!view) {
      return;
    }
    this.views.push(view);

    let workspace = this.utils.getWorkspace(),
      s = workspace.getMetrics();

    let sx = view.left - s.contentLeft,
      sy = view.top - s.contentTop;

    workspace.scrollbar.set(sx, sy);
  }
}

function distance(pos, next) {
  return Math.sqrt(Math.pow(pos.left - next.left, 2) + Math.pow(pos.top - next.top, 2));
}
