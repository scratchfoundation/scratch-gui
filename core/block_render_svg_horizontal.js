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

goog.provide('Blockly.BlockSvg.render');

goog.require('Blockly.BlockSvg');


// UI constants for rendering blocks.
/**
* Grid unit to pixels conversion
* @const
*/
Blockly.BlockSvg.GRID_UNIT = 4;

/**
 * Horizontal space between elements.
 * @const
 */
Blockly.BlockSvg.SEP_SPACE_X = 3 * Blockly.BlockSvg.GRID_UNIT;
/**
 * Vertical space between elements.
 * @const
 */
Blockly.BlockSvg.SEP_SPACE_Y = 3 * Blockly.BlockSvg.GRID_UNIT;

/**
 * Vertical space above blocks with statements.
 * @const
 */
Blockly.BlockSvg.STATEMENT_BLOCK_SPACE = 3 * Blockly.BlockSvg.GRID_UNIT;

/**
 * Height of user inputs
 * @const
 */
Blockly.BlockSvg.FIELD_HEIGHT = 8 * Blockly.BlockSvg.GRID_UNIT;
/**
 * Width of user inputs
 * @const
 */
Blockly.BlockSvg.FIELD_WIDTH = 12 * Blockly.BlockSvg.GRID_UNIT;

/**
 * Top padding of user inputs
 * @const
 */
Blockly.BlockSvg.FIELD_TOP_PADDING = 1.5 * Blockly.BlockSvg.GRID_UNIT;

/**
 * Corner radius of number inputs
 * @const
 */
Blockly.BlockSvg.NUMBER_FIELD_CORNER_RADIUS = 4 * Blockly.BlockSvg.GRID_UNIT;
/**
 * Corner radius of text inputs
 * @const
 */
Blockly.BlockSvg.TEXT_FIELD_CORNER_RADIUS = 1 * Blockly.BlockSvg.GRID_UNIT;
/**
 * Minimum width of a block.
 * @const
 */
Blockly.BlockSvg.MIN_BLOCK_X = 16 * Blockly.BlockSvg.GRID_UNIT;

/**
 * Minimum height of a block.
 * @const
 */
Blockly.BlockSvg.MIN_BLOCK_Y = 16 * Blockly.BlockSvg.GRID_UNIT;

/**
 * Width of horizontal puzzle tab.
 * @const
 */
Blockly.BlockSvg.TAB_WIDTH = 2 * Blockly.BlockSvg.GRID_UNIT;
/**
 * Rounded corner radius.
 * @const
 */
Blockly.BlockSvg.CORNER_RADIUS = 1 * Blockly.BlockSvg.GRID_UNIT;
/**
 * Rounded corner radius.
 * @const
 */
Blockly.BlockSvg.HAT_CORNER_RADIUS = 8 * Blockly.BlockSvg.GRID_UNIT;
/**
 * Full height of connector notch including rounded corner.
 * @const
 */
Blockly.BlockSvg.NOTCH_HEIGHT = 8 * Blockly.BlockSvg.GRID_UNIT + 2;
/**
 * Width of connector notch
 * @const
 */
Blockly.BlockSvg.NOTCH_WIDTH = 2 * Blockly.BlockSvg.GRID_UNIT;
/**
 * SVG path for drawing next/previous notch from top to bottom.
 * Drawn in pixel units since Bezier control points are off the grid.
 * @const
 */

Blockly.BlockSvg.NOTCH_PATH_DOWN =
  'c 0,2 1,3 2,4 ' +
  'l 4,4 ' +
  'c 1,1 2,2 2,4 ' +
  'v 12 ' +
  'c 0,2 -1,3 -2,4 ' +
  'l -4,4 ' +
  'c -1,1 -2,2 -2,4';
/**
 * SVG path for drawing next/previous notch from bottom to top.
 * Drawn in pixel units since Bezier control points are off the grid.
 * @const
 */
Blockly.BlockSvg.NOTCH_PATH_UP =
  'c 0,-2 1,-3 2,-4 '+
  'l 4,-4 ' +
  'c 1,-1 2,-2 2,-4 ' +
  'v -12 ' +
  'c 0,-2 -1,-3 -2,-4 ' +
  'l -4,-4 ' +
  'c -1,-1 -2,-2 -2,-4';

/**
* Width of rendered icons in px
* @const
*/
Blockly.BlockSvg.ICON_WIDTH = 10 * Blockly.BlockSvg.GRID_UNIT;

/**
* Height of rendered icons in px
* @const
*/
Blockly.BlockSvg.ICON_HEIGHT = 10 * Blockly.BlockSvg.GRID_UNIT;

/**
 * SVG start point for drawing the top-left corner.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_START =
    'm ' + Blockly.BlockSvg.CORNER_RADIUS + ',0';
/**
 * SVG path for drawing the rounded top-left corner.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER =
    'A ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
    '0,' + Blockly.BlockSvg.CORNER_RADIUS;
/**
 * SVG start point for drawing the top-left corner.
 * @const
 */
Blockly.BlockSvg.HAT_TOP_LEFT_CORNER_START =
    'm ' + Blockly.BlockSvg.HAT_CORNER_RADIUS + ',0';
/**
 * SVG path for drawing the rounded top-left corner.
 * @const
 */
Blockly.BlockSvg.HAT_TOP_LEFT_CORNER =
    'A ' + Blockly.BlockSvg.HAT_CORNER_RADIUS + ',' +
    Blockly.BlockSvg.HAT_CORNER_RADIUS + ' 0 0,0 ' +
    '0,' + Blockly.BlockSvg.HAT_CORNER_RADIUS;


/**
 * Play some UI effects (sound) after a connection has been established.
 */
Blockly.BlockSvg.prototype.connectionUiEffect = function() {
  this.workspace.playAudio('click');
};

/**
 * Change the colour of a block.
 */
Blockly.BlockSvg.prototype.updateColour = function() {
  var strokeColour = this.getColourTertiary();
  if (this.isShadow() && this.parentBlock_) {
    // Pull shadow block stroke colour from parent block's tertiary if possible.
    strokeColour = this.parentBlock_.getColourTertiary();
  }

  // Render block stroke
  this.svgPath_.setAttribute('stroke', strokeColour);

  // Render block fill
  var fillColour = (this.isGlowing_) ? this.getColourSecondary() : this.getColour();
  this.svgPath_.setAttribute('fill', fillColour);

  // Bump every dropdown to change its colour.
  for (var x = 0, input; input = this.inputList[x]; x++) {
    for (var y = 0, field; field = input.fieldRow[y]; y++) {
      field.setText(null);
    }
  }
};

/**
 * Returns a bounding box describing the dimensions of this block
 * and any blocks stacked below it.
 * @return {!{height: number, width: number}} Object with height and width properties.
 */
Blockly.BlockSvg.prototype.getHeightWidth = function() {
  var height = this.height;
  var width = this.width;
  // Recursively add size of subsequent blocks.
  var nextBlock = this.getNextBlock();
  if (nextBlock) {
    var nextHeightWidth = nextBlock.getHeightWidth();
    width += nextHeightWidth.width;
    height = Math.max(height, nextHeightWidth.height);
  }
  return {height: height, width: width};
};

/**
 * Render the block.
 * Lays out and reflows a block based on its contents and settings.
 * @param {boolean=} opt_bubble If false, just render this block.
 *   If true, also render block's parent, grandparent, etc.  Defaults to true.
 */
Blockly.BlockSvg.prototype.render = function(opt_bubble) {
  Blockly.Field.startCache();
  this.rendered = true;

  var metrics = this.renderCompute_();
  this.height = metrics.height;
  this.width = metrics.width;
  this.renderDraw_(metrics);

  if (opt_bubble !== false) {
    // Render all blocks above this one (propagate a reflow).
    var parentBlock = this.getParent();
    if (parentBlock) {
      parentBlock.render(true);
    } else {
      // Top-most block.  Fire an event to allow scrollbars to resize.
      Blockly.fireUiEvent(window, 'resize');
    }
  }
  Blockly.Field.stopCache();
};

/**
 * Computes the height and widths for each row and field.
 * @return {!Array.<!Array.<!Object>>} 2D array of objects, each containing
 *     position information.
 * @private
 */
Blockly.BlockSvg.prototype.renderCompute_ = function() {
  var metrics = {
    statement: null,
    valueInput: null,
    icon: null,
    width: 0,
    height: 0,
    bayHeight: 0,
    bayWidth: 0,
    fieldWidth: 0,
    fieldHeight: 0,
    fieldRadius: 0,
    startHat: false
  };

  if (this.nextConnection && !this.previousConnection) {
    metrics.startHat = true;
  }

  // Does block have a statement?
  for (var i = 0, input; input = this.inputList[i]; i++) {
    if (input.type == Blockly.NEXT_STATEMENT) {
      metrics.statement = input;
      // Compute minimum input size.
      metrics.bayHeight = Blockly.BlockSvg.MIN_BLOCK_Y;
      metrics.bayWidth = Blockly.BlockSvg.MIN_BLOCK_X;
      // Expand input size if there is a connection.
      if (input.connection && input.connection.targetConnection) {
        var linkedBlock = input.connection.targetBlock();
        var bBox = linkedBlock.getHeightWidth();
        metrics.bayHeight = Math.max(metrics.bayHeight, bBox.height);
        metrics.bayWidth = Math.max(metrics.bayWidth, bBox.width);
      }
    }

    // Find icon, input fields
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      if (field instanceof Blockly.FieldImage) {
        metrics.icon = field;
      }
      if (field instanceof Blockly.FieldTextInput) {
        var fieldBBox = field.textElement_.getBBox();
        metrics.fieldWidth = fieldBBox.width + Blockly.BlockSvg.SEP_SPACE_X;
        metrics.fieldHeight = fieldBBox.height;
        metrics.fieldRadius = field.getBorderRadius();
      }
    }
  }

  for (var i = 0, child; child = this.childBlocks_[i]; i++) {
    if (child.isShadow()) {
      metrics.valueInput = child;
    }
  }

  // Always render icon at 40x40 px
  // Normal block sizing
  metrics.width = Blockly.BlockSvg.SEP_SPACE_X * 2 + Blockly.BlockSvg.ICON_WIDTH;
  metrics.height = Blockly.BlockSvg.SEP_SPACE_Y * 2 + Blockly.BlockSvg.ICON_HEIGHT;

  if (this.outputConnection) {
    // Field shadow block
    metrics.height = Blockly.BlockSvg.FIELD_HEIGHT;
    metrics.width = Blockly.BlockSvg.FIELD_WIDTH;
  }
  if (metrics.statement) {
    // Block with statement (e.g., repeat, forever)
    metrics.width += metrics.bayWidth + 4 * Blockly.BlockSvg.CORNER_RADIUS + 2 * Blockly.BlockSvg.GRID_UNIT;
    metrics.height = metrics.bayHeight + Blockly.BlockSvg.STATEMENT_BLOCK_SPACE;
  }
  if (metrics.startHat) {
    // Start hats are 1 unit wider to account for optical effect of curve
    metrics.width += 1 * Blockly.BlockSvg.GRID_UNIT;
  }
  return metrics;
};


/**
 * Draw the path of the block.
 * Move the fields to the correct locations.
 * @param {number} iconWidth Offset of first row due to icons.
 * @param {!Array.<!Array.<!Object>>} inputRows 2D array of objects, each
 *     containing position information.
 * @private
 */
Blockly.BlockSvg.prototype.renderDraw_ = function(metrics) {
  // Fetch the block's coordinates on the surface for use in anchoring
  // the connections.
  var connectionsXY = this.getRelativeToSurfaceXY();
  // Assemble the block's path.
  var steps = [];

  this.renderDrawLeft_(steps, connectionsXY, metrics);
  this.renderDrawBottom_(steps, connectionsXY, metrics);
  this.renderDrawRight_(steps, connectionsXY, metrics);
  this.renderDrawTop_(steps, connectionsXY, metrics);

  var pathString = steps.join(' ');
  this.svgPath_.setAttribute('d', pathString);

  if (this.RTL) {
    // Mirror the block's path.
    // This is awesome.
    this.svgPath_.setAttribute('transform', 'scale(-1 1)');
  }

  // Position icon
  if (metrics.icon) {
    var icon = metrics.icon.getSvgRoot();
    var iconSize = metrics.icon.getSize();
    // Icon's position is calculated relative to the "end" edge of the block.
    var iconX = metrics.width - iconSize.width - Blockly.BlockSvg.SEP_SPACE_X / 1.5;
    var iconY = metrics.height - iconSize.height - Blockly.BlockSvg.SEP_SPACE_Y;
    var iconScale = "scale(1 1)";
    if (this.RTL) {
      // Do we want to mirror the icon left-to-right?
      if (metrics.icon.getFlipRTL()) {
        iconScale = "scale(-1 1)";
        iconX = -metrics.width + iconSize.width + Blockly.BlockSvg.SEP_SPACE_X / 1.5;
      } else {
        // If not, don't offset by iconSize.width
        iconX = -metrics.width + Blockly.BlockSvg.SEP_SPACE_X / 1.5;
      }
    }
    if (this.isInsertionMarker()) {
      icon.setAttribute('display', 'none');
    }
    icon.setAttribute('transform',
      'translate(' + iconX + ',' + iconY + ') ' + iconScale);
  }

  // Position value input
  if (metrics.valueInput) {
    var input = metrics.valueInput.getSvgRoot();
    var inputBBox = input.getBBox();
    var valueX = (Blockly.BlockSvg.NOTCH_WIDTH +
      (metrics.bayWidth ? 2 * Blockly.BlockSvg.GRID_UNIT +
        Blockly.BlockSvg.NOTCH_WIDTH*2 : 0) + metrics.bayWidth);
    if (this.RTL) {
      valueX = -valueX;
    }
    var valueY = (metrics.height - 2 * Blockly.BlockSvg.GRID_UNIT);
    var transformation = 'translate(' + valueX + ',' + valueY + ')';
    input.setAttribute('transform', transformation);
  }
};

/**
 * Render the left edge of the block.
 * @param {!Array.<string>} steps Path of block outline.
 * @param {!Object} connectionsXY Location of block.
 * @param {number} rightEdge Minimum width of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawLeft_ =
    function(steps, connectionsXY, metrics) {

  // Top edge.
  if (metrics.startHat) {
    // Hat block
    // Position the cursor at the top-left starting point.
    steps.push(Blockly.BlockSvg.HAT_TOP_LEFT_CORNER_START);
    // Top-left rounded corner.
    steps.push(Blockly.BlockSvg.HAT_TOP_LEFT_CORNER);
  } else if (this.previousConnection) {
    // Regular block
    // Position the cursor at the top-left starting point.
    steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START);
    // Top-left rounded corner.
    steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER);
    var cursorY = metrics.height - Blockly.BlockSvg.CORNER_RADIUS - Blockly.BlockSvg.SEP_SPACE_Y - Blockly.BlockSvg.NOTCH_HEIGHT;
    steps.push('V', cursorY);
    steps.push(Blockly.BlockSvg.NOTCH_PATH_DOWN);
    // Create previous block connection.
    var connectionX = connectionsXY.x;
    var connectionY = connectionsXY.y + metrics.height - Blockly.BlockSvg.CORNER_RADIUS * 2;
    this.previousConnection.moveTo(connectionX, connectionY);
    // This connection will be tightened when the parent renders.
    steps.push('V', metrics.height - Blockly.BlockSvg.CORNER_RADIUS);
  } else {
    // Input
    // Position the cursor at the top-left starting point.
    steps.push('m', metrics.fieldRadius + ',0');
    // Top-left rounded corner.
    steps.push(
      'A', metrics.fieldRadius + ',' + metrics.fieldRadius,
      '0', '0,0', '0,' + metrics.fieldRadius);
    steps.push(
      'V', metrics.height - metrics.fieldRadius);
  }
};

/**
 * Render the bottom edge of the block.
 * @param {!Array.<string>} steps Path of block outline.
 * @param {!Object} connectionsXY Location of block.
 * @param {!Array.<!Array.<!Object>>} inputRows 2D array of objects, each
 *     containing position information.
 * @param {number} iconWidth Offset of first row due to icons.
 * @return {number} Height of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawBottom_ = function(steps,
    connectionsXY, metrics) {

  if (metrics.startHat) {
    steps.push('a', Blockly.BlockSvg.HAT_CORNER_RADIUS + ',' +
               Blockly.BlockSvg.HAT_CORNER_RADIUS + ' 0 0,0 ' +
               Blockly.BlockSvg.HAT_CORNER_RADIUS + ',' +
               Blockly.BlockSvg.HAT_CORNER_RADIUS);
  } else if (this.previousConnection) {
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
               Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS);
  } else {
    // Input
    steps.push(
      'a', metrics.fieldRadius + ',' + metrics.fieldRadius,
      '0', '0,0', metrics.fieldRadius + ',' + metrics.fieldRadius);
  }

  // Has statement
  if (metrics.statement) {
    steps.push('h', 4 * Blockly.BlockSvg.GRID_UNIT);
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
               Blockly.BlockSvg.CORNER_RADIUS + ',-' +
               Blockly.BlockSvg.CORNER_RADIUS);
    steps.push('v', -2.5 * Blockly.BlockSvg.GRID_UNIT);
    steps.push(Blockly.BlockSvg.NOTCH_PATH_UP);
    // @todo Why 3?
    steps.push('v', -metrics.bayHeight + (Blockly.BlockSvg.CORNER_RADIUS * 3) +
      Blockly.BlockSvg.NOTCH_HEIGHT + 2 * Blockly.BlockSvg.GRID_UNIT);
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 ' +
               Blockly.BlockSvg.CORNER_RADIUS + ',-' +
               Blockly.BlockSvg.CORNER_RADIUS);
    steps.push('h', metrics.bayWidth - (Blockly.BlockSvg.CORNER_RADIUS * 2));
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 ' +
               Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS);
    steps.push('v', metrics.bayHeight - (Blockly.BlockSvg.CORNER_RADIUS * 3) -
      Blockly.BlockSvg.NOTCH_HEIGHT - 2 * Blockly.BlockSvg.GRID_UNIT);
    steps.push(Blockly.BlockSvg.NOTCH_PATH_DOWN);
    steps.push('v', 2.5 * Blockly.BlockSvg.GRID_UNIT);
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
               Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS);

    // Create statement connection.
    var connectionX = connectionsXY.x + Blockly.BlockSvg.CORNER_RADIUS * 2 + 4 * Blockly.BlockSvg.GRID_UNIT;
    if (this.RTL) {
      connectionX = connectionsXY.x - Blockly.BlockSvg.CORNER_RADIUS * 2 - 4 * Blockly.BlockSvg.GRID_UNIT;
    }
    var connectionY = connectionsXY.y + metrics.height - Blockly.BlockSvg.CORNER_RADIUS * 2;
    metrics.statement.connection.moveTo(connectionX, connectionY);
    if (metrics.statement.connection.targetConnection) {
      metrics.statement.connection.tighten_();
    }
  }

  if (!this.isShadow()) {
    steps.push('H', metrics.width - Blockly.BlockSvg.CORNER_RADIUS);
  } else {
    // input
    steps.push('H', metrics.width - metrics.fieldRadius);
  }
};

/**
 * Render the right edge of the block.
 * @param {!Array.<string>} steps Path of block outline.
 * @param {!Object} connectionsXY Location of block.
 * @param {number} cursorY Height of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawRight_ =
    function(steps, connectionsXY, metrics) {
  if (!this.isShadow()) {
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
               Blockly.BlockSvg.CORNER_RADIUS + ',-' +
               Blockly.BlockSvg.CORNER_RADIUS);
    steps.push('v', -2.5 * Blockly.BlockSvg.GRID_UNIT);
  } else {
    // Input
    steps.push(
      'a', metrics.fieldRadius + ',' + metrics.fieldRadius,
      '0', '0,0', metrics.fieldRadius + ',' + -1*metrics.fieldRadius);
    steps.push('v', -1*(metrics.height - metrics.fieldRadius*2));
  }

  if (this.nextConnection) {
    steps.push(Blockly.BlockSvg.NOTCH_PATH_UP);

    // Create next block connection.
    var connectionX;
    if (this.RTL) {
      connectionX = connectionsXY.x - metrics.width;
    } else {
      connectionX = connectionsXY.x + metrics.width;
    }
    var connectionY = connectionsXY.y + metrics.height - Blockly.BlockSvg.CORNER_RADIUS * 2;
    this.nextConnection.moveTo(connectionX, connectionY);
    if (this.nextConnection.targetConnection) {
      this.nextConnection.tighten_();
    }
    steps.push('V', Blockly.BlockSvg.CORNER_RADIUS);
  } else if (!this.isShadow()) {
    steps.push('V', Blockly.BlockSvg.CORNER_RADIUS);
  }
};

/**
 * Render the top edge of the block.
 * @param {!Array.<string>} steps Path of block outline.
 * @param {!Object} connectionsXY Location of block.
 * @param {number} cursorY Height of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawTop_ =
    function(steps, connectionsXY, metrics) {
  if (!this.isShadow()) {
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 -' +
               Blockly.BlockSvg.CORNER_RADIUS + ',-' +
               Blockly.BlockSvg.CORNER_RADIUS);
  } else {
    steps.push(
      'a', metrics.fieldRadius + ',' + metrics.fieldRadius,
      '0', '0,0', '-' + metrics.fieldRadius + ',-' + metrics.fieldRadius);
  }
  steps.push('z');
};
