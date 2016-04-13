/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Methods for graphically rendering a block as SVG.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.BlockSvg');

goog.require('Blockly.Block');
goog.require('Blockly.ContextMenu');
goog.require('goog.Timer');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.math.Coordinate');
goog.require('goog.userAgent');


/**
 * Class for a block's SVG representation.
 * Not normally called directly, workspace.newBlock() is preferred.
 * @param {!Blockly.Workspace} workspace The block's workspace.
 * @param {?string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @param {=string} opt_id Optional ID.  Use this ID if provided, otherwise
 *     create a new id.
 * @extends {Blockly.Block}
 * @constructor
 */
Blockly.BlockSvg = function(workspace, prototypeName, opt_id) {
  // Create core elements for the block.
  /** @type {SVGElement} */
  this.svgGroup_ = Blockly.createSvgElement('g', {}, null);
  /** @type {SVGElement} */
  this.svgPath_ = Blockly.createSvgElement('path', {'class': 'blocklyPath'},
      this.svgGroup_);
  this.svgPath_.tooltip = this;

  /** @type {boolean} */
  this.rendered = false;

  Blockly.Tooltip.bindMouseEvents(this.svgPath_);
  Blockly.BlockSvg.superClass_.constructor.call(this,
      workspace, prototypeName, opt_id);
};
goog.inherits(Blockly.BlockSvg, Blockly.Block);

/**
 * Height of this block, not including any statement blocks above or below.
 */
Blockly.BlockSvg.prototype.height = 0;
/**
 * Width of this block, including any connected value blocks.
 */
Blockly.BlockSvg.prototype.width = 0;

/**
 * Original location of block being dragged.
 * @type {goog.math.Coordinate}
 * @private
 */
Blockly.BlockSvg.prototype.dragStartXY_ = null;

/**
 * Whether the block glows as if running.
 * @type {boolean}
 * @private
 */
Blockly.BlockSvg.prototype.isGlowing_ = false;

/**
 * Constant for identifying rows that are to be rendered inline.
 * Don't collide with Blockly.INPUT_VALUE and friends.
 * @const
 */
Blockly.BlockSvg.INLINE = -1;

/**
 * Create and initialize the SVG representation of the block.
 * May be called more than once.
 */
Blockly.BlockSvg.prototype.initSvg = function() {
  goog.asserts.assert(this.workspace.rendered, 'Workspace is headless.');
  if (!this.isInsertionMarker()) { // Insertion markers not allowed to have inputs or icons
    for (var i = 0, input; input = this.inputList[i]; i++) {
      input.init();
    }
    var icons = this.getIcons();
    for (i = 0; i < icons.length; i++) {
      icons[i].createIcon();
    }
  }
  this.updateColour();
  this.updateMovable();
  if (!this.workspace.options.readOnly && !this.eventsInit_) {
    Blockly.bindEvent_(this.getSvgRoot(), 'mousedown', this,
                       this.onMouseDown_);
    var thisBlock = this;
    Blockly.bindEvent_(this.getSvgRoot(), 'touchstart', null,
                       function(e) {Blockly.longStart_(e, thisBlock);});
  }
  this.eventsInit_ = true;

  if (!this.getSvgRoot().parentNode) {
    this.workspace.getCanvas().appendChild(this.getSvgRoot());
  }
};

/**
 * Select this block.  Highlight it visually.
 */
Blockly.BlockSvg.prototype.select = function() {
  if (Blockly.selected == this) {
    return;
  }
  var oldId = null;
  if (Blockly.selected) {
    oldId = Blockly.selected.id;
    // Unselect any previously selected block.
    Blockly.Events.disable();
    Blockly.selected.unselect();
    Blockly.Events.enable();
  }
  var event = new Blockly.Events.Ui(null, 'selected', oldId, this.id);
  event.workspaceId = this.workspace.id;
  Blockly.Events.fire(event);
  Blockly.selected = this;
  this.addSelect();
  Blockly.fireUiEvent(this.workspace.getCanvas(), 'blocklySelectChange');
};

/**
 * Unselect this block.  Remove its highlighting.
 */
Blockly.BlockSvg.prototype.unselect = function() {
  if (Blockly.selected != this) {
    return;
  }
  var event = new Blockly.Events.Ui(null, 'selected', this.id, null);
  event.workspaceId = this.workspace.id;
  Blockly.Events.fire(event);
  Blockly.selected = null;
  this.removeSelect();
  Blockly.fireUiEvent(this.workspace.getCanvas(), 'blocklySelectChange');
};

/**
 * Glow this block.  Highlight it visually as if it's running.
 * @param {boolean} isGlowing Whether the block should glow.
 */
Blockly.BlockSvg.prototype.setGlow = function(isGlowing) {
  this.isGlowing_ = isGlowing;
  this.updateColour();
};

/**
 * Block's mutator icon (if any).
 * @type {Blockly.Mutator}
 */
Blockly.BlockSvg.prototype.mutator = null;

/**
 * Block's comment icon (if any).
 * @type {Blockly.Comment}
 */
Blockly.BlockSvg.prototype.comment = null;

/**
 * Block's warning icon (if any).
 * @type {Blockly.Warning}
 */
Blockly.BlockSvg.prototype.warning = null;

/**
 * Returns a list of mutator, comment, and warning icons.
 * @return {!Array} List of icons.
 */
Blockly.BlockSvg.prototype.getIcons = function() {
  var icons = [];
  if (this.mutator) {
    icons.push(this.mutator);
  }
  if (this.comment) {
    icons.push(this.comment);
  }
  if (this.warning) {
    icons.push(this.warning);
  }
  return icons;
};

/**
 * Wrapper function called when a mouseUp occurs during a drag operation.
 * @type {Array.<!Array>}
 * @private
 */
Blockly.BlockSvg.onMouseUpWrapper_ = null;

/**
 * Wrapper function called when a mouseMove occurs during a drag operation.
 * @type {Array.<!Array>}
 * @private
 */
Blockly.BlockSvg.onMouseMoveWrapper_ = null;

/**
 * Stop binding to the global mouseup and mousemove events.
 * @private
 */
Blockly.BlockSvg.terminateDrag_ = function() {
  if (Blockly.BlockSvg.onMouseUpWrapper_) {
    Blockly.unbindEvent_(Blockly.BlockSvg.onMouseUpWrapper_);
    Blockly.BlockSvg.onMouseUpWrapper_ = null;
  }
  if (Blockly.BlockSvg.onMouseMoveWrapper_) {
    Blockly.unbindEvent_(Blockly.BlockSvg.onMouseMoveWrapper_);
    Blockly.BlockSvg.onMouseMoveWrapper_ = null;
  }
  var selected = Blockly.selected;
  if (Blockly.dragMode_ == Blockly.DRAG_FREE) {
    // Terminate a drag operation.
    if (selected) {
      if (Blockly.insertionMarker_) {
        Blockly.Events.disable();
        if (Blockly.insertionMarkerConnection_) {
          Blockly.BlockSvg.disconnectInsertionMarker();
        }
        Blockly.insertionMarker_.dispose();
        Blockly.insertionMarker_ = null;
        Blockly.Events.enable();
      }
      // Update the connection locations.
      var xy = selected.getRelativeToSurfaceXY();
      var dxy = goog.math.Coordinate.difference(xy, selected.dragStartXY_);
      var event = new Blockly.Events.Move(selected);
      event.oldCoordinate = selected.dragStartXY_;
      event.recordNew();
      Blockly.Events.fire(event);
      selected.moveConnections_(dxy.x, dxy.y);
      delete selected.draggedBubbles_;
      selected.setDragging_(false);
      selected.moveOffDragSurface_();
      selected.render();
      // Ensure that any stap and bump are part of this move's event group.
      var group = Blockly.Events.getGroup();
      setTimeout(function() {
          Blockly.Events.setGroup(group);
          selected.snapToGrid();
          Blockly.Events.setGroup(false);
      }, Blockly.BUMP_DELAY / 2);
      setTimeout(function() {
          Blockly.Events.setGroup(group);
          selected.bumpNeighbours_();
          Blockly.Events.setGroup(false);
      }, Blockly.BUMP_DELAY);
      // Fire an event to allow scrollbars to resize.
      Blockly.fireUiEvent(window, 'resize');
    }
  }
  Blockly.dragMode_ = Blockly.DRAG_NONE;
  Blockly.Css.setCursor(Blockly.Css.Cursor.OPEN);
};

/**
 * Set parent of this block to be a new block or null.
 * @param {Blockly.BlockSvg} newParent New parent block.
 */
Blockly.BlockSvg.prototype.setParent = function(newParent) {
  if (newParent == this.parentBlock_) {
    return;
  }
  var svgRoot = this.getSvgRoot();
  if (this.parentBlock_ && svgRoot) {
    // Move this block up the DOM.  Keep track of x/y translations.
    var xy = this.getRelativeToSurfaceXY();
    // Avoid moving a block up the DOM if it's currently selected/dragging,
    // so as to avoid taking things off the drag surface.
    if (Blockly.selected != this) {
      this.workspace.getCanvas().appendChild(svgRoot);
      this.translate(xy.x, xy.y);
    }
  }

  Blockly.Field.startCache();
  Blockly.BlockSvg.superClass_.setParent.call(this, newParent);
  Blockly.Field.stopCache();

  if (newParent) {
    var oldXY = this.getRelativeToSurfaceXY();
    newParent.getSvgRoot().appendChild(svgRoot);
    var newXY = this.getRelativeToSurfaceXY();
    // Move the connections to match the child's new position.
    this.moveConnections_(newXY.x - oldXY.x, newXY.y - oldXY.y);
    // If we are a shadow block, inherit tertiary colour.
    if (this.isShadow()) {
      this.setColour(this.getColour(), this.getColourSecondary(),
        newParent.getColourTertiary());
    }
  }
};

/**
 * Return the coordinates of the top-left corner of this block relative to the
 * drawing surface's origin (0,0).
 * @return {!goog.math.Coordinate} Object with .x and .y properties.
 */
Blockly.BlockSvg.prototype.getRelativeToSurfaceXY = function() {
  // The drawing surface is relative to either the workspace canvas
  // or to the drag surface group.
  var x = 0;
  var y = 0;
  var dragSurfaceGroup = (this.workspace.dragSurface) ?
    this.workspace.dragSurface.getGroup() : null;
  var element = this.getSvgRoot();
  if (element) {
    do {
      // Loop through this block and every parent.
      var xy = Blockly.getRelativeXY_(element);
      x += xy.x;
      y += xy.y;
      // If this element is the current element on the drag surface, include
      // the translation of the drag surface itself.
      if (this.workspace.dragSurface &&
          this.workspace.dragSurface.getCurrentBlock() == element) {
        var surfaceTranslation = this.workspace.dragSurface.getSurfaceTranslation();
        x += surfaceTranslation.x;
        y += surfaceTranslation.y;
      }
      element = element.parentNode;
    } while (element && element != this.workspace.getCanvas() &&
             element != dragSurfaceGroup);
  }
  return new goog.math.Coordinate(x, y);
};

/**
 * Move a block by a relative offset.
 * @param {number} dx Horizontal offset.
 * @param {number} dy Vertical offset.
 */
Blockly.BlockSvg.prototype.moveBy = function(dx, dy) {
  goog.asserts.assert(!this.parentBlock_, 'Block has parent.');
  var event = new Blockly.Events.Move(this);
  var xy = this.getRelativeToSurfaceXY();
  this.translate(xy.x + dx, xy.y + dy);
  this.moveConnections_(dx, dy);
  event.recordNew();
  Blockly.Events.fire(event);
};

/**
 * Set this block to an absolute translation.
 * @param {number} x Horizontal translation.
 * @param {number} y Vertical translation.
 * @param {boolean=} opt_use3d If set, use 3d translation.
*/
Blockly.BlockSvg.prototype.translate = function(x, y, opt_use3d) {
  if (opt_use3d) {
    this.getSvgRoot().setAttribute('style', 'transform: translate3d(' + x + 'px,' + y + 'px, 0px)');
  } else {
    this.getSvgRoot().setAttribute('transform', 'translate(' + x + ',' + y + ')');
  }
};

/**
 * Snap this block to the nearest grid point.
 */
Blockly.BlockSvg.prototype.snapToGrid = function() {
  if (!this.workspace) {
    return;  // Deleted block.
  }
  if (Blockly.dragMode_ != Blockly.DRAG_NONE) {
    return;  // Don't bump blocks during a drag.
  }
  if (this.getParent()) {
    return;  // Only snap top-level blocks.
  }
  if (this.isInFlyout) {
    return;  // Don't move blocks around in a flyout.
  }
  if (!this.workspace.options.gridOptions ||
      !this.workspace.options.gridOptions['snap']) {
    return;  // Config says no snapping.
  }
  var spacing = this.workspace.options.gridOptions['spacing'];
  var half = spacing / 2;
  var xy = this.getRelativeToSurfaceXY();
  var dx = Math.round((xy.x - half) / spacing) * spacing + half - xy.x;
  var dy = Math.round((xy.y - half) / spacing) * spacing + half - xy.y;
  dx = Math.round(dx);
  dy = Math.round(dy);
  if (dx != 0 || dy != 0) {
    this.moveBy(dx, dy);
  }
};

/**
 * Returns a bounding box describing the dimensions of this block
 * and any blocks stacked below it.
 * @return {!{height: number, width: number}} Object with height and width
 *    properties.
 */
Blockly.BlockSvg.prototype.getHeightWidth = function() {
  var height = this.height;
  var width = this.width;
  // Recursively add size of subsequent blocks.
  var nextBlock = this.getNextBlock();
  if (nextBlock) {
    var nextHeightWidth = nextBlock.getHeightWidth();
    height += nextHeightWidth.height - 4;  // Height of tab.
    width = Math.max(width, nextHeightWidth.width);
  } else if (!this.nextConnection && !this.outputConnection) {
    // Add a bit of margin under blocks with no bottom tab.
    height += 2;
  }
  return {height: height, width: width};
};

/**
 * Returns the coordinates of a bounding box describing the dimensions of this
 * block and any blocks stacked below it.
 * @return {!{topLeft: goog.math.Coordinate, bottomRight: goog.math.Coordinate}}
 *    Object with top left and bottom right coordinates of the bounding box.
 */
Blockly.BlockSvg.prototype.getBoundingRectangle = function() {
  var blockXY = this.getRelativeToSurfaceXY(this);
  var tab = this.outputConnection ? Blockly.BlockSvg.TAB_WIDTH : 0;
  var blockBounds = this.getHeightWidth();
  var topLeft;
  var bottomRight;
  if (this.RTL) {
    // Width has the tab built into it already so subtract it here.
    topLeft = new goog.math.Coordinate(blockXY.x - (blockBounds.width - tab),
        blockXY.y);
    // Add the width of the tab/puzzle piece knob to the x coordinate
    // since X is the corner of the rectangle, not the whole puzzle piece.
    bottomRight = new goog.math.Coordinate(blockXY.x + tab,
        blockXY.y + blockBounds.height);
  } else {
    // Subtract the width of the tab/puzzle piece knob to the x coordinate
    // since X is the corner of the rectangle, not the whole puzzle piece.
    topLeft = new goog.math.Coordinate(blockXY.x - tab, blockXY.y);
    // Width has the tab built into it already so subtract it here.
    bottomRight = new goog.math.Coordinate(blockXY.x + blockBounds.width - tab,
        blockXY.y + blockBounds.height);
  }
  return {topLeft: topLeft, bottomRight: bottomRight};
};

/**
 * Set whether the block is collapsed or not.
 * @param {boolean} collapsed True if collapsed.
 */
Blockly.BlockSvg.prototype.setCollapsed = function(collapsed) {
  if (this.collapsed_ == collapsed) {
    return;
  }
  var renderList = [];
  // Show/hide the inputs.
  for (var i = 0, input; input = this.inputList[i]; i++) {
    renderList.push.apply(renderList, input.setVisible(!collapsed));
  }

  var COLLAPSED_INPUT_NAME = '_TEMP_COLLAPSED_INPUT';
  if (collapsed) {
    var icons = this.getIcons();
    for (i = 0; i < icons.length; i++) {
      icons[i].setVisible(false);
    }
    var text = this.toString(Blockly.COLLAPSE_CHARS);
    this.appendDummyInput(COLLAPSED_INPUT_NAME).appendField(text).init();
  } else {
    this.removeInput(COLLAPSED_INPUT_NAME);
    // Clear any warnings inherited from enclosed blocks.
    this.setWarningText(null);
  }
  Blockly.BlockSvg.superClass_.setCollapsed.call(this, collapsed);

  if (!renderList.length) {
    // No child blocks, just render this block.
    renderList[0] = this;
  }
  if (this.rendered) {
    for (var i = 0, block; block = renderList[i]; i++) {
      block.render();
    }
    // Don't bump neighbours.
    // Although bumping neighbours would make sense, users often collapse
    // all their functions and store them next to each other.  Expanding and
    // bumping causes all their definitions to go out of alignment.
  }
};

/**
 * Open the next (or previous) FieldTextInput.
 * @param {Blockly.Field|Blockly.Block} start Current location.
 * @param {boolean} forward If true go forward, otherwise backward.
 */
Blockly.BlockSvg.prototype.tab = function(start, forward) {
  // This function need not be efficient since it runs once on a keypress.
  // Create an ordered list of all text fields and connected inputs.
  var list = [];
  for (var i = 0, input; input = this.inputList[i]; i++) {
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      if (field instanceof Blockly.FieldTextInput) {
        // TODO: Also support dropdown fields.
        list.push(field);
      }
    }
    if (input.connection) {
      var block = input.connection.targetBlock();
      if (block) {
        list.push(block);
      }
    }
  }
  i = list.indexOf(start);
  if (i == -1) {
    // No start location, start at the beginning or end.
    i = forward ? -1 : list.length;
  }
  var target = list[forward ? i + 1 : i - 1];
  if (!target) {
    // Ran off of list.
    var parent = this.getParent();
    if (parent) {
      parent.tab(this, forward);
    }
  } else if (target instanceof Blockly.Field) {
    target.showEditor_();
  } else {
    target.tab(null, forward);
  }
};

/**
 * Handle a mouse-down on an SVG block.
 * @param {!Event} e Mouse down event.
 * @private
 */
Blockly.BlockSvg.prototype.onMouseDown_ = function(e) {
  if (this.workspace.options.readOnly) {
    return;
  }
  if (this.isInFlyout) {
    e.stopPropagation();
    return;
  }
  Blockly.setPageSelectable(false);
  this.workspace.markFocused();
  // Update Blockly's knowledge of its own location.
  Blockly.svgResize(this.workspace);
  Blockly.terminateDrag_();
  this.select();
  Blockly.hideChaff();
  this.workspace.recordDeleteAreas();
  if (Blockly.isRightButton(e)) {
    // Right-click.
    this.showContextMenu_(e);
  } else if (!this.isMovable()) {
    // Allow immovable blocks to be selected and context menued, but not
    // dragged.  Let this event bubble up to document, so the workspace may be
    // dragged instead.
    return;
  } else {
    if (!Blockly.Events.getGroup()) {
      Blockly.Events.setGroup(true);
    }
    // Left-click (or middle click)
    Blockly.Css.setCursor(Blockly.Css.Cursor.CLOSED);

    this.dragStartXY_ = this.getRelativeToSurfaceXY();
    this.workspace.startDrag(e, this.dragStartXY_.x, this.dragStartXY_.y);

    Blockly.dragMode_ = Blockly.DRAG_STICKY;
    Blockly.BlockSvg.onMouseUpWrapper_ = Blockly.bindEvent_(document,
        'mouseup', this, this.onMouseUp_);
    Blockly.BlockSvg.onMouseMoveWrapper_ = Blockly.bindEvent_(document,
        'mousemove', this, this.onMouseMove_);
    // Build a list of bubbles that need to be moved and where they started.
    this.draggedBubbles_ = [];
    var descendants = this.getDescendants();
    for (var i = 0, descendant; descendant = descendants[i]; i++) {
      var icons = descendant.getIcons();
      for (var j = 0; j < icons.length; j++) {
        var data = icons[j].getIconLocation();
        data.bubble = icons[j];
        this.draggedBubbles_.push(data);
      }
    }
  }
  // This event has been handled.  No need to bubble up to the document.
  e.stopPropagation();
};

/**
 * Handle a mouse-up anywhere in the SVG pane.  Is only registered when a
 * block is clicked.  We can't use mouseUp on the block since a fast-moving
 * cursor can briefly escape the block before it catches up.
 * @param {!Event} e Mouse up event.
 * @private
 */
Blockly.BlockSvg.prototype.onMouseUp_ = function(e) {
  if (Blockly.dragMode_ != Blockly.DRAG_FREE) {
    Blockly.Events.fire(
        new Blockly.Events.Ui(this, 'click', undefined, undefined));
  }
  Blockly.setPageSelectable(true);
  Blockly.terminateDrag_();
  if (Blockly.selected && Blockly.highlightedConnection_) {
    if (Blockly.localConnection_ ==
        Blockly.selected.getFirstStatementConnection()) {
      // Snap to match the position of the pre-existing stack.  Since this is a
      // C-block, shift to take into account how the block will stretch as it
      // surrounds the internal blocks.
      Blockly.selected.moveBy(
          Blockly.highlightedConnection_.x_ - Blockly.localConnection_.x_,
          Blockly.highlightedConnection_.y_ - Blockly.localConnection_.y_ -
          (Blockly.highlightedConnection_.sourceBlock_.getHeightWidth().height -
          Blockly.BlockSvg.MIN_BLOCK_Y));
    } else if (Blockly.localConnection_.type == Blockly.NEXT_STATEMENT) {
      // Snap to match the position of the pre-existing stack.
      Blockly.selected.moveBy(
          Blockly.highlightedConnection_.x_ - Blockly.localConnection_.x_,
          Blockly.highlightedConnection_.y_ - Blockly.localConnection_.y_);
    }
    // Connect two blocks together.
    Blockly.localConnection_.connect(Blockly.highlightedConnection_);
    if (this.rendered) {
      // Trigger a connection animation.
      // Determine which connection is inferior (lower in the source stack).
      var inferiorConnection = Blockly.localConnection_.isSuperior() ?
          Blockly.highlightedConnection_ : Blockly.localConnection_;
      inferiorConnection.getSourceBlock().connectionUiEffect();
    }
    if (this.workspace.trashcan) {
      // Don't throw an object in the trash can if it just got connected.
      this.workspace.trashcan.close();
    }
  } else if (!this.getParent() && Blockly.selected.isDeletable() &&
      this.workspace.isDeleteArea(e)) {
    var trashcan = this.workspace.trashcan;
    if (trashcan) {
      goog.Timer.callOnce(trashcan.close, 100, trashcan);
    }
    Blockly.selected.dispose(false, true);
    // Dropping a block on the trash can will usually cause the workspace to
    // resize to contain the newly positioned block.  Force a second resize
    // now that the block has been deleted.
    Blockly.fireUiEvent(window, 'resize');
  }
  if (Blockly.highlightedConnection_) {
    Blockly.highlightedConnection_ = null;
  }
  Blockly.Css.setCursor(Blockly.Css.Cursor.OPEN);
  if (!Blockly.WidgetDiv.isVisible()) {
    Blockly.Events.setGroup(false);
  }
};

/**
 * Load the block's help page in a new window.
 * @private
 */
Blockly.BlockSvg.prototype.showHelp_ = function() {
  var url = goog.isFunction(this.helpUrl) ? this.helpUrl() : this.helpUrl;
  if (url) {
    // @todo rewrite
    alert(url);
  }
};

/**
 * Show the context menu for this block.
 * @param {!Event} e Mouse event.
 * @private
 */
Blockly.BlockSvg.prototype.showContextMenu_ = function(e) {
  if (this.workspace.options.readOnly || !this.contextMenu) {
    return;
  }
  // Save the current block in a variable for use in closures.
  var block = this;
  var menuOptions = [];

  if (this.isDeletable() && this.isMovable() && !block.isInFlyout) {
    // Option to duplicate this block.
    var duplicateOption = {
      text: Blockly.Msg.DUPLICATE_BLOCK,
      enabled: true,
      callback: function() {
        Blockly.duplicate_(block);
      }
    };
    if (this.getDescendants().length > this.workspace.remainingCapacity()) {
      duplicateOption.enabled = false;
    }
    menuOptions.push(duplicateOption);

    if (this.isEditable() && this.workspace.options.comments) {
      // Option to add/remove a comment.
      var commentOption = {enabled: !goog.userAgent.IE};
      if (this.comment) {
        commentOption.text = Blockly.Msg.REMOVE_COMMENT;
        commentOption.callback = function() {
          block.setCommentText(null);
        };
      } else {
        commentOption.text = Blockly.Msg.ADD_COMMENT;
        commentOption.callback = function() {
          block.setCommentText('');
        };
      }
      menuOptions.push(commentOption);
    }

    // Option to delete this block.
    // Count the number of blocks that are nested in this block.
    var descendantCount = this.getDescendants().length;
    var nextBlock = this.getNextBlock();
    if (nextBlock) {
      // Blocks in the current stack would survive this block's deletion.
      descendantCount -= nextBlock.getDescendants().length;
    }
    var deleteOption = {
      text: descendantCount == 1 ? Blockly.Msg.DELETE_BLOCK :
          Blockly.Msg.DELETE_X_BLOCKS.replace('%1', String(descendantCount)),
      enabled: true,
      callback: function() {
        block.dispose(true, true);
      }
    };
    menuOptions.push(deleteOption);
  }

  // Option to get help.
  var url = goog.isFunction(this.helpUrl) ? this.helpUrl() : this.helpUrl;
  var helpOption = {enabled: !!url};
  helpOption.text = Blockly.Msg.HELP;
  helpOption.callback = function() {
    block.showHelp_();
  };
  menuOptions.push(helpOption);

  // Allow the block to add or modify menuOptions.
  if (this.customContextMenu && !block.isInFlyout) {
    this.customContextMenu(menuOptions);
  }

  Blockly.ContextMenu.show(e, menuOptions, this.RTL);
  Blockly.ContextMenu.currentBlock = this;
};

/**
 * Move the connections for this block and all blocks attached under it.
 * Also update any attached bubbles.
 * @param {number} dx Horizontal offset from current location.
 * @param {number} dy Vertical offset from current location.
 * @private
 */
Blockly.BlockSvg.prototype.moveConnections_ = function(dx, dy) {
  if (!this.rendered) {
    // Rendering is required to lay out the blocks.
    // This is probably an invisible block attached to a collapsed block.
    return;
  }
  var myConnections = this.getConnections_(false);
  for (var i = 0; i < myConnections.length; i++) {
    myConnections[i].moveBy(dx, dy);
  }
  var icons = this.getIcons();
  for (i = 0; i < icons.length; i++) {
    icons[i].computeIconLocation();
  }

  // Recurse through all blocks attached under this one.
  for (i = 0; i < this.childBlocks_.length; i++) {
    this.childBlocks_[i].moveConnections_(dx, dy);
  }
};

/**
 * Recursively adds or removes the dragging class to this node and its children.
 * @param {boolean} adding True if adding, false if removing.
 * @private
 */
Blockly.BlockSvg.prototype.setDragging_ = function(adding) {
  if (adding) {
    this.addDragging();
    Blockly.draggingConnections_ =
        Blockly.draggingConnections_.concat(this.getConnections_(true));
  } else {
    this.removeDragging();
    Blockly.draggingConnections_ = [];
  }
  // Recurse through all blocks attached under this one.
  for (var i = 0; i < this.childBlocks_.length; i++) {
    this.childBlocks_[i].setDragging_(adding);
  }
};

/**
 * Move this block to its workspace's drag surface, accounting for positioning.
 * Generally should be called at the same time as setDragging_(true).
 * @private
 */
Blockly.BlockSvg.prototype.moveToDragSurface_ = function() {
  // The translation for drag surface blocks,
  // is equal to the current relative-to-surface position,
  // to keep the position in sync as it move on/off the surface.
  var xy = this.getRelativeToSurfaceXY();
  this.clearTransformAttributes_();
  this.workspace.dragSurface.translateSurface(xy.x, xy.y);
  // Execute the move on the top-level SVG component
  this.workspace.dragSurface.setBlocksAndShow(this.getSvgRoot());
};

/**
 * Move this block back to the workspace block canvas.
 * Generally should be called at the same time as setDragging_(false).
 * @private
 */
 Blockly.BlockSvg.prototype.moveOffDragSurface_ = function() {
  // Translate to current position, turning off 3d.
  var xy = this.getRelativeToSurfaceXY();
  this.clearTransformAttributes_();
  this.translate(xy.x, xy.y, false);
  this.workspace.dragSurface.clearAndHide(this.workspace.getCanvas());
};

/**
 * Clear the block of style="..." and transform="..." attributes.
 * Used when the block is switching from 3d to 2d transform or vice versa.
 * @private
 */
Blockly.BlockSvg.prototype.clearTransformAttributes_ = function() {
  if (this.getSvgRoot().hasAttribute('transform')) {
    this.getSvgRoot().removeAttribute('transform');
  }
  if (this.getSvgRoot().hasAttribute('style')) {
    this.getSvgRoot().removeAttribute('style');
  }
};

/**
 * Drag this block to follow the mouse.
 * @param {!Event} e Mouse move event.
 * @private
 */
Blockly.BlockSvg.prototype.onMouseMove_ = function(e) {
  if (e.type == 'mousemove' && e.clientX <= 1 && e.clientY == 0 &&
      e.button == 0) {
    /* HACK:
     Safari Mobile 6.0 and Chrome for Android 18.0 fire rogue mousemove
     events on certain touch actions. Ignore events with these signatures.
     This may result in a one-pixel blind spot in other browsers,
     but this shouldn't be noticeable. */
    e.stopPropagation();
    return;
  }

  var oldXY = this.getRelativeToSurfaceXY();
  var newXY = this.workspace.moveDrag(e);

  if (Blockly.dragMode_ == Blockly.DRAG_STICKY) {
    // Still dragging within the sticky DRAG_RADIUS.
    var dr = goog.math.Coordinate.distance(oldXY, newXY) * this.workspace.scale;
    if (dr > Blockly.DRAG_RADIUS) {
      // Switch to unrestricted dragging.
      Blockly.dragMode_ = Blockly.DRAG_FREE;
      Blockly.longStop_();
      // Must move to drag surface before unplug(),
      // or else connections will calculate the wrong relative to surface XY
      // in tighten_(). Then blocks connected to this block move around on the
      // drag surface. By moving to the drag surface before unplug, connection
      // positions will be calculated correctly.
      this.moveToDragSurface_();
      if (this.parentBlock_) {
        // Push this block to the very top of the stack.
        this.unplug();
        this.disconnectUiEffect();
      }
      this.setDragging_(true);
    }
  }
  if (Blockly.dragMode_ == Blockly.DRAG_FREE) {
    var dx = oldXY.x - this.dragStartXY_.x;
    var dy = oldXY.y - this.dragStartXY_.y;
    this.workspace.dragSurface.translateSurface(newXY.x, newXY.y);
    // Drag all the nested bubbles.
    for (var i = 0; i < this.draggedBubbles_.length; i++) {
      var commentData = this.draggedBubbles_[i];
      commentData.bubble.setIconLocation(commentData.x + dx,
          commentData.y + dy);
    }

    // Check to see if any of this block's connections are within range of
    // another block's connection.
    var myConnections = this.getConnections_(false);
    // Also check the last connection on this stack
    var lastOnStack = this.lastConnectionInStack_();
    if (lastOnStack && lastOnStack != this.nextConnection) {
      myConnections.push(lastOnStack);
    }
    var closestConnection = null;
    var localConnection = null;
    var radiusConnection = Blockly.SNAP_RADIUS;
    for (i = 0; i < myConnections.length; i++) {
      var myConnection = myConnections[i];
      var neighbour = myConnection.closest(radiusConnection, dx, dy);
      if (neighbour.connection) {
        closestConnection = neighbour.connection;
        localConnection = myConnection;
        radiusConnection = neighbour.radius;
      }
    }

    var candidateIsLast = (localConnection == lastOnStack);
    this.updatePreviews(closestConnection, localConnection, radiusConnection,
        e, newXY.x - this.dragStartXY_.x, newXY.y - this.dragStartXY_.y,
        candidateIsLast);
  }
  // This event has been handled.  No need to bubble up to the document.
  e.stopPropagation();
};

/**
 * Preview the results of the drag if the mouse is released immediately.
 * @param {Blockly.Connection} closestConnection The closest connection found
 *    during the search
 * @param {Blockly.Connection} localConnection The connection on the moving
 *    block.
 * @param {number} radiusConnection The distance between closestConnection and
 *    localConnection.
 * @param {!Event} e Mouse move event.
 * @param {number} dx The x distance the block has moved onscreen up to this
 *    point in the drag.
 * @param {number} dy The y distance the block has moved onscreen up to this
 *    point in the drag.
 * @param {boolean} candidateIsLast True if the dragging stack is more than one
 *    block long and localConnection is the last connection on the stack.
 */
Blockly.BlockSvg.prototype.updatePreviews = function(closestConnection,
    localConnection, radiusConnection, e, dx, dy, candidateIsLast) {
  // Don't fire events for insertion marker creation or movement.
  Blockly.Events.disable();
  // Remove an insertion marker if needed.  For Scratch-Blockly we are using
  // grayed-out blocks instead of highlighting the connection; for compatibility
  // with Web Blockly the name "highlightedConnection" will still be used.
  if (Blockly.highlightedConnection_ &&
      Blockly.highlightedConnection_ != closestConnection) {
    if (Blockly.insertionMarker_ && Blockly.insertionMarkerConnection_) {
      Blockly.BlockSvg.disconnectInsertionMarker();
    }
    // If there's already an insertion marker but it's representing the wrong
    // block, delete it so we can create the correct one.
    if (Blockly.insertionMarker_ &&
        (candidateIsLast && Blockly.localConnection_.sourceBlock_ == this) ||
        (!candidateIsLast && Blockly.localConnection_.sourceBlock_ != this)) {
      Blockly.insertionMarker_.dispose();
      Blockly.insertionMarker_ = null;
    }
    Blockly.highlightedConnection_ = null;
    Blockly.localConnection_ = null;
  }

  // Add an insertion marker if needed.
  if (closestConnection &&
      closestConnection != Blockly.highlightedConnection_ &&
      !closestConnection.sourceBlock_.isInsertionMarker()) {
    Blockly.highlightedConnection_ = closestConnection;
    Blockly.localConnection_ = localConnection;
    if (!Blockly.insertionMarker_) {
      Blockly.insertionMarker_ =
          this.workspace.newBlock(Blockly.localConnection_.sourceBlock_.type);
      Blockly.insertionMarker_.setInsertionMarker(true);
      Blockly.insertionMarker_.initSvg();
    }

    var insertionMarker = Blockly.insertionMarker_;
    var insertionMarkerConnection = insertionMarker.getMatchingConnection(
        localConnection.sourceBlock_, localConnection);
    if (insertionMarkerConnection != Blockly.insertionMarkerConnection_) {
      insertionMarker.rendered = true;
      // Render disconnected from everything else so that we have a valid
      // connection location.
      insertionMarker.render();
      insertionMarker.getSvgRoot().setAttribute('visibility', 'visible');
      // Move the preview to the correct location before the existing block.
      if (insertionMarkerConnection.type == Blockly.NEXT_STATEMENT) {
        var newX = closestConnection.x_ - insertionMarkerConnection.x_;
        var newY = closestConnection.y_ - insertionMarkerConnection.y_;
        // If it's the first statement connection of a c-block, this block is
        // going to get taller as soon as render() is called below.
        if (insertionMarkerConnection != insertionMarker.nextConnection) {
          newY -= closestConnection.sourceBlock_.getHeightWidth().height -
              Blockly.BlockSvg.MIN_BLOCK_Y;
        }

        insertionMarker.moveBy(newX, newY);

      }
      if (insertionMarkerConnection.type == Blockly.PREVIOUS_STATEMENT &&
          !insertionMarker.nextConnection) {
        Blockly.bumpedConnection_ = closestConnection.targetConnection;
      }
      // Renders insertin marker.
      insertionMarkerConnection.connect(closestConnection);
      // Render dragging block so it appears on top.
      Blockly.insertionMarkerConnection_ = insertionMarkerConnection;
    }
  }
  // Reenable events.
  Blockly.Events.enable();

  // Provide visual indication of whether the block will be deleted if
  // dropped here.
  if (this.isDeletable()) {
    this.workspace.isDeleteArea(e);
  }
};

/**
 * Disconnect the current insertion marker from the stack, and heal the stack to
 * its previous state.
 */
Blockly.BlockSvg.disconnectInsertionMarker = function() {
  // The insertion marker is the first block in a stack, either because it
  // doesn't have a previous connection or because the previous connection is
  // not connected.  Unplug won't do anything in that case.  Instead, unplug the
  // following block.
  if (Blockly.insertionMarkerConnection_ ==
      Blockly.insertionMarker_.nextConnection &&
      (!Blockly.insertionMarker_.previousConnection ||
      !Blockly.insertionMarker_.previousConnection.targetConnection)) {
    Blockly.insertionMarkerConnection_.targetBlock().unplug(false);
  }
  // Inside of a C-block, first statement connection.
  else if (Blockly.insertionMarkerConnection_.type == Blockly.NEXT_STATEMENT &&
      Blockly.insertionMarkerConnection_ !=
      Blockly.insertionMarker_.nextConnection) {
    var innerConnection = Blockly.insertionMarkerConnection_.targetConnection;
    innerConnection.sourceBlock_.unplug(false);
    var previousBlockNextConnection =
        Blockly.insertionMarker_.previousConnection.targetConnection;
    Blockly.insertionMarker_.unplug(true);
    if (previousBlockNextConnection) {
      previousBlockNextConnection.connect(innerConnection);
    }
  }
  else {
    Blockly.insertionMarker_.unplug(true /* healStack */);
  }

  if (Blockly.insertionMarkerConnection_.targetConnection) {
    throw 'insertionMarkerConnection still connected at the end of disconnectInsertionMarker';
  }
  Blockly.insertionMarkerConnection_ = null;
  Blockly.insertionMarker_.getSvgRoot().setAttribute('visibility', 'hidden');
};

/**
 * Add or remove the UI indicating if this block is movable or not.
 */
Blockly.BlockSvg.prototype.updateMovable = function() {
  if (this.isMovable()) {
    Blockly.addClass_(/** @type {!Element} */ (this.svgGroup_),
                      'blocklyDraggable');
  } else {
    Blockly.removeClass_(/** @type {!Element} */ (this.svgGroup_),
                         'blocklyDraggable');
  }
};

/**
 * Set whether this block is movable or not.
 * @param {boolean} movable True if movable.
 */
Blockly.BlockSvg.prototype.setMovable = function(movable) {
  Blockly.BlockSvg.superClass_.setMovable.call(this, movable);
  this.updateMovable();
};

/**
 * Set whether this block is editable or not.
 * @param {boolean} editable True if editable.
 */
Blockly.BlockSvg.prototype.setEditable = function(editable) {
  Blockly.BlockSvg.superClass_.setEditable.call(this, editable);
  if (this.rendered) {
    for (var i = 0; i < this.icons_.length; i++) {
      this.icons_[i].updateEditable();
    }
  }
};

/**
 * Set whether this block is a shadow block or not.
 * @param {boolean} shadow True if a shadow.
 */
Blockly.BlockSvg.prototype.setShadow = function(shadow) {
  Blockly.BlockSvg.superClass_.setShadow.call(this, shadow);
  this.updateColour();
};

/**
 * Set whether this block is an insertion marker block or not.
 * @param {boolean} insertionMarker True if an insertion marker.
 */
Blockly.BlockSvg.prototype.setInsertionMarker = function(insertionMarker) {
  Blockly.BlockSvg.superClass_.setInsertionMarker.call(this, insertionMarker);
  this.updateColour();
};

/**
 * Return the root node of the SVG or null if none exists.
 * @return {Element} The root SVG node (probably a group).
 */
Blockly.BlockSvg.prototype.getSvgRoot = function() {
  return this.svgGroup_;
};

/**
 * Dispose of this block.
 * @param {boolean} healStack If true, then try to heal any gap by connecting
 *     the next statement with the previous statement.  Otherwise, dispose of
 *     all children of this block.
 * @param {boolean} animate If true, show a disposal animation and sound.
 */
Blockly.BlockSvg.prototype.dispose = function(healStack, animate) {
  Blockly.Field.startCache();
  // If this block is being dragged, unlink the mouse events.
  if (Blockly.selected == this) {
    this.unselect();
    Blockly.terminateDrag_();
  }
  // If this block has a context menu open, close it.
  if (Blockly.ContextMenu.currentBlock == this) {
    Blockly.ContextMenu.hide();
  }

  if (animate && this.rendered) {
    this.unplug(healStack);
    this.disposeUiEffect();
  }
  // Stop rerendering.
  this.rendered = false;

  Blockly.Events.disable();
  var icons = this.getIcons();
  for (var i = 0; i < icons.length; i++) {
    icons[i].dispose();
  }
  Blockly.Events.enable();
  Blockly.BlockSvg.superClass_.dispose.call(this, healStack);

  goog.dom.removeNode(this.svgGroup_);
  // Sever JavaScript to DOM connections.
  this.svgGroup_ = null;
  this.svgPath_ = null;
  Blockly.Field.stopCache();
};

/**
 * Play some UI effects (sound, animation) when disposing of a block.
 */
Blockly.BlockSvg.prototype.disposeUiEffect = function() {
  this.workspace.playAudio('delete');

  var xy = Blockly.getSvgXY_(/** @type {!Element} */ (this.svgGroup_),
                             this.workspace);
  // Deeply clone the current block.
  var clone = this.svgGroup_.cloneNode(true);
  clone.translateX_ = xy.x;
  clone.translateY_ = xy.y;
  clone.setAttribute('transform',
      'translate(' + clone.translateX_ + ',' + clone.translateY_ + ')');
  this.workspace.getParentSvg().appendChild(clone);
  clone.bBox_ = clone.getBBox();
  // Start the animation.
  Blockly.BlockSvg.disposeUiStep_(clone, this.RTL, new Date(),
      this.workspace.scale);
};

/**
 * Animate a cloned block and eventually dispose of it.
 * This is a class method, not an instace method since the original block has
 * been destroyed and is no longer accessible.
 * @param {!Element} clone SVG element to animate and dispose of.
 * @param {boolean} rtl True if RTL, false if LTR.
 * @param {!Date} start Date of animation's start.
 * @param {number} workspaceScale Scale of workspace.
 * @private
 */
Blockly.BlockSvg.disposeUiStep_ = function(clone, rtl, start, workspaceScale) {
  var ms = (new Date()) - start;
  var percent = ms / 150;
  if (percent > 1) {
    goog.dom.removeNode(clone);
  } else {
    var x = clone.translateX_ +
        (rtl ? -1 : 1) * clone.bBox_.width * workspaceScale / 2 * percent;
    var y = clone.translateY_ + clone.bBox_.height * workspaceScale * percent;
    var scale = (1 - percent) * workspaceScale;
    clone.setAttribute('transform', 'translate(' + x + ',' + y + ')' +
        ' scale(' + scale + ')');
    var closure = function() {
      Blockly.BlockSvg.disposeUiStep_(clone, rtl, start, workspaceScale);
    };
    setTimeout(closure, 10);
  }
};

/**
 * Play some UI effects (sound) when disconnecting a block.
 */
Blockly.BlockSvg.prototype.disconnectUiEffect = function() {
  this.workspace.playAudio('disconnect');
};

/**
 * Enable or disable a block.
 */
Blockly.BlockSvg.prototype.updateDisabled = function() {
  // not supported
};

/**
 * Returns the comment on this block (or '' if none).
 * @return {string} Block's comment.
 */
Blockly.BlockSvg.prototype.getCommentText = function() {
  if (this.comment) {
    var comment = this.comment.getText();
    // Trim off trailing whitespace.
    return comment.replace(/\s+$/, '').replace(/ +\n/g, '\n');
  }
  return '';
};

/**
 * Set this block's comment text.
 * @param {?string} text The text, or null to delete.
 */
Blockly.BlockSvg.prototype.setCommentText = function(text) {
  var changedState = false;
  if (goog.isString(text)) {
    if (!this.comment) {
      this.comment = new Blockly.Comment(this);
      changedState = true;
    }
    this.comment.setText(/** @type {string} */ (text));
  } else {
    if (this.comment) {
      this.comment.dispose();
      changedState = true;
    }
  }
  if (changedState && this.rendered) {
    this.render();
    // Adding or removing a comment icon will cause the block to change shape.
    this.bumpNeighbours_();
  }
};

/**
 * Set this block's warning text.
 * @param {?string} text The text, or null to delete.
 * @param {string=} opt_id An optional ID for the warning text to be able to
 *     maintain multiple warnings.
 */
Blockly.BlockSvg.prototype.setWarningText = function(text, opt_id) {
  if (!this.setWarningText.pid_) {
    // Create a database of warning PIDs.
    // Only runs once per block (and only those with warnings).
    this.setWarningText.pid_ = Object.create(null);
  }
  var id = opt_id || '';
  if (!id) {
    // Kill all previous pending processes, this edit supercedes them all.
    for (var n in this.setWarningText.pid_) {
      clearTimeout(this.setWarningText.pid_[n]);
      delete this.setWarningText.pid_[n];
    }
  } else if (this.setWarningText.pid_[id]) {
    // Only queue up the latest change.  Kill any earlier pending process.
    clearTimeout(this.setWarningText.pid_[id]);
    delete this.setWarningText.pid_[id];
  }
  if (Blockly.dragMode_ == Blockly.DRAG_FREE) {
    // Don't change the warning text during a drag.
    // Wait until the drag finishes.
    var thisBlock = this;
    this.setWarningText.pid_[id] = setTimeout(function() {
      if (thisBlock.workspace) {  // Check block wasn't deleted.
        delete thisBlock.setWarningText.pid_[id];
        thisBlock.setWarningText(text, id);
      }
    }, 100);
    return;
  }
  if (this.isInFlyout) {
    text = null;
  }

  var changedState = false;
  if (goog.isString(text)) {
    if (!this.warning) {
      this.warning = new Blockly.Warning(this);
      changedState = true;
    }
    this.warning.setText(/** @type {string} */ (text), id);
  } else {
    // Dispose all warnings if no id is given.
    if (this.warning && !id) {
      this.warning.dispose();
      changedState = true;
    } else if (this.warning) {
      var oldText = this.warning.getText();
      this.warning.setText('', id);
      var newText = this.warning.getText();
      if (!newText) {
        this.warning.dispose();
      }
      changedState = oldText == newText;
    }
  }
  if (changedState && this.rendered) {
    this.render();
    // Adding or removing a warning icon will cause the block to change shape.
    this.bumpNeighbours_();
  }
};

/**
 * Give this block a mutator dialog.
 * @param {Blockly.Mutator} mutator A mutator dialog instance or null to remove.
 */
Blockly.BlockSvg.prototype.setMutator = function(mutator) {
  if (this.mutator && this.mutator !== mutator) {
    this.mutator.dispose();
  }
  if (mutator) {
    mutator.block_ = this;
    this.mutator = mutator;
    mutator.createIcon();
  }
};

/**
 * Select this block.  Highlight it visually.
 */
Blockly.BlockSvg.prototype.addSelect = function() {
  Blockly.addClass_(/** @type {!Element} */ (this.svgGroup_),
                    'blocklySelected');
  // Move the selected block to the top of the stack.
  this.svgGroup_.parentNode.appendChild(this.svgGroup_);
};

/**
 * Unselect this block.  Remove its highlighting.
 */
Blockly.BlockSvg.prototype.removeSelect = function() {
  Blockly.removeClass_(/** @type {!Element} */ (this.svgGroup_),
                       'blocklySelected');
};

/**
 * Adds the dragging class to this block.
 * Also disables the highlights/shadows to improve performance.
 */
Blockly.BlockSvg.prototype.addDragging = function() {
  Blockly.addClass_(/** @type {!Element} */ (this.svgGroup_),
                    'blocklyDragging');
};

/**
 * Removes the dragging class from this block.
 */
Blockly.BlockSvg.prototype.removeDragging = function() {
  Blockly.removeClass_(/** @type {!Element} */ (this.svgGroup_),
                       'blocklyDragging');
};

// Overrides of functions on Blockly.Block that take into account whether the
// block has been rendered.

/**
 * Change the colour of a block.
 * @param {number|string} colour HSV hue value, or #RRGGBB string.
 * @param {number|string} colourSecondary Secondary HSV hue value, or #RRGGBB
 *    string.
 * @param {number|string} colourTertiary Tertiary HSV hue value, or #RRGGBB
 *    string.
 */
Blockly.BlockSvg.prototype.setColour = function(colour, colourSecondary,
    colourTertiary) {
  Blockly.BlockSvg.superClass_.setColour.call(this, colour, colourSecondary,
      colourTertiary);

  if (this.rendered) {
    this.updateColour();
  }
};

/**
 * Set whether this block can chain onto the bottom of another block.
 * @param {boolean} newBoolean True if there can be a previous statement.
 * @param {string|Array.<string>|null|undefined} opt_check Statement type or
 *     list of statement types.  Null/undefined if any type could be connected.
 */
Blockly.BlockSvg.prototype.setPreviousStatement =
    function(newBoolean, opt_check) {
  Blockly.BlockSvg.superClass_.setPreviousStatement.call(this, newBoolean,
      opt_check);

  if (this.rendered) {
    this.render();
    this.bumpNeighbours_();
  }
};

/**
 * Set whether another block can chain onto the bottom of this block.
 * @param {boolean} newBoolean True if there can be a next statement.
 * @param {string|Array.<string>|null|undefined} opt_check Statement type or
 *     list of statement types.  Null/undefined if any type could be connected.
 */
Blockly.BlockSvg.prototype.setNextStatement = function(newBoolean, opt_check) {
  Blockly.BlockSvg.superClass_.setNextStatement.call(this, newBoolean,
      opt_check);

  if (this.rendered) {
    this.render();
    this.bumpNeighbours_();
  }
};

/**
 * Set whether this block returns a value.
 * @param {boolean} newBoolean True if there is an output.
 * @param {string|Array.<string>|null|undefined} opt_check Returned type or list
 *     of returned types.  Null or undefined if any type could be returned
 *     (e.g. variable get).
 */
Blockly.BlockSvg.prototype.setOutput = function(newBoolean, opt_check) {
  Blockly.BlockSvg.superClass_.setOutput.call(this, newBoolean, opt_check);

  if (this.rendered) {
    this.render();
    this.bumpNeighbours_();
  }
};

/**
 * Set whether value inputs are arranged horizontally or vertically.
 * @param {boolean} newBoolean True if inputs are horizontal.
 */
Blockly.BlockSvg.prototype.setInputsInline = function(newBoolean) {
  Blockly.BlockSvg.superClass_.setInputsInline.call(this, newBoolean);

  if (this.rendered) {
    this.render();
    this.bumpNeighbours_();
  }
};

/**
 * Remove an input from this block.
 * @param {string} name The name of the input.
 * @param {boolean=} opt_quiet True to prevent error if input is not present.
 * @throws {goog.asserts.AssertionError} if the input is not present and
 *     opt_quiet is not true.
 */
Blockly.BlockSvg.prototype.removeInput = function(name, opt_quiet) {
  Blockly.BlockSvg.superClass_.removeInput.call(this, name, opt_quiet);

  if (this.rendered) {
    this.render();
    // Removing an input will cause the block to change shape.
    this.bumpNeighbours_();
  }
};

/**
 * Move a numbered input to a different location on this block.
 * @param {number} inputIndex Index of the input to move.
 * @param {number} refIndex Index of input that should be after the moved input.
 */
Blockly.BlockSvg.prototype.moveNumberedInputBefore = function(
    inputIndex, refIndex) {
  Blockly.BlockSvg.superClass_.moveNumberedInputBefore.call(this, inputIndex,
      refIndex);

  if (this.rendered) {
    this.render();
    // Moving an input will cause the block to change shape.
    this.bumpNeighbours_();
  }
};

/**
 * Add a value input, statement input or local variable to this block.
 * @param {number} type Either Blockly.INPUT_VALUE or Blockly.NEXT_STATEMENT or
 *     Blockly.DUMMY_INPUT.
 * @param {string} name Language-neutral identifier which may used to find this
 *     input again.  Should be unique to this block.
 * @return {!Blockly.Input} The input object created.
 * @private
 */
Blockly.BlockSvg.prototype.appendInput_ = function(type, name) {
  var input = Blockly.BlockSvg.superClass_.appendInput_.call(this, type, name);

  if (this.rendered) {
    this.render();
    // Adding an input will cause the block to change shape.
    this.bumpNeighbours_();
  }
  return input;
};

/**
 * Returns connections originating from this block.
 * @param {boolean} all If true, return all connections even hidden ones.
 *     Otherwise, for a non-rendered block return an empty list, and for a
 *     collapsed block don't return inputs connections.
 * @return {!Array.<!Blockly.Connection>} Array of connections.
 * @private
 */
Blockly.BlockSvg.prototype.getConnections_ = function(all) {
  var myConnections = [];
  if (all || this.rendered) {
    if (this.outputConnection) {
      myConnections.push(this.outputConnection);
    }
    if (this.previousConnection) {
      myConnections.push(this.previousConnection);
    }
    if (this.nextConnection) {
      myConnections.push(this.nextConnection);
    }
    if (all || !this.collapsed_) {
      for (var i = 0, input; input = this.inputList[i]; i++) {
        if (input.connection) {
          myConnections.push(input.connection);
        }
      }
    }
  }
  return myConnections;
};
