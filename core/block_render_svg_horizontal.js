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
 * Horizontal space between elements.
 * @const
 */
Blockly.BlockSvg.SEP_SPACE_X = 8;
/**
 * Vertical space between elements.
 * @const
 */
Blockly.BlockSvg.SEP_SPACE_Y = 8;
/**
 * Vertical padding around inline elements.
 * @const
 */
Blockly.BlockSvg.INLINE_PADDING_Y = 5;
/**
 * Height of user inputs
 * @const
 */
Blockly.BlockSvg.FIELD_HEIGHT = 32;
/**
 * Width of user inputs
 * @const
 */
Blockly.BlockSvg.FIELD_WIDTH = 48;
/**
 * Corner radius of number inputs
 * @const
 */
Blockly.BlockSvg.NUMBER_FIELD_CORNER_RADIUS = 16;
/**
 * Corner radius of text inputs
 * @const
 */
Blockly.BlockSvg.TEXT_FIELD_CORNER_RADIUS = 4;
/**
 * Minimum width of a block.
 * @const
 */
Blockly.BlockSvg.MIN_BLOCK_X = 40;
/**
 * Width of horizontal puzzle tab.
 * @const
 */
Blockly.BlockSvg.TAB_WIDTH = 8;
/**
 * Rounded corner radius.
 * @const
 */
Blockly.BlockSvg.CORNER_RADIUS = 4;
/**
 * Rounded corner radius.
 * @const
 */
Blockly.BlockSvg.HAT_CORNER_RADIUS = 16;
/**
 * Rounded notch radius.
 * @const
 */
Blockly.BlockSvg.NOTCH_RADIUS = 2.5;
/**
 * Height of connector notch, not including rounded corner at top and bottom.
 * @const
 */
Blockly.BlockSvg.NOTCH_BASE_HEIGHT = 32;
/**
 * Full height of connector notch including rounded corner.
 * @const
 */
Blockly.BlockSvg.NOTCH_HEIGHT = Blockly.BlockSvg.NOTCH_BASE_HEIGHT + Blockly.BlockSvg.NOTCH_RADIUS;
/**
 * Width of connector notch
 * @const
 */
Blockly.BlockSvg.NOTCH_WIDTH = Blockly.BlockSvg.NOTCH_BASE_HEIGHT/4;
/**
 * SVG path for drawing next/previous notch from top to bottom.
 * @const
 */
Blockly.BlockSvg.NOTCH_PATH_DOWN =
  'a ' + -Blockly.BlockSvg.NOTCH_RADIUS + ',' + Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
          '0 0 0 ' + Blockly.BlockSvg.NOTCH_RADIUS/2 + ',' + Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
  'l ' + (Blockly.BlockSvg.NOTCH_BASE_HEIGHT/4 - Blockly.BlockSvg.NOTCH_RADIUS) + ',' +
         (Blockly.BlockSvg.NOTCH_BASE_HEIGHT/4 - Blockly.BlockSvg.NOTCH_RADIUS) + ' ' +
  'a ' + -Blockly.BlockSvg.NOTCH_RADIUS + ',' + Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
          '0 0 1 ' + Blockly.BlockSvg.NOTCH_RADIUS/2 + ',' + Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
  'v ' + (Blockly.BlockSvg.NOTCH_BASE_HEIGHT/2 - Blockly.BlockSvg.NOTCH_RADIUS) + ' ' +
  'a ' + -Blockly.BlockSvg.NOTCH_RADIUS + ',' + Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
          '0 0 1 ' + -Blockly.BlockSvg.NOTCH_RADIUS/2 + ',' + Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
  'l ' + (-Blockly.BlockSvg.NOTCH_BASE_HEIGHT/4 + Blockly.BlockSvg.NOTCH_RADIUS) + ',' +
         (Blockly.BlockSvg.NOTCH_BASE_HEIGHT/4 - Blockly.BlockSvg.NOTCH_RADIUS) + ' ' +
  'a ' + -Blockly.BlockSvg.NOTCH_RADIUS + ',' + Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
        '0 0 0 ' + -Blockly.BlockSvg.NOTCH_RADIUS/2 + ',' + Blockly.BlockSvg.NOTCH_RADIUS;
/**
 * SVG path for drawing next/previous notch from bottom to top.
 * @const
 */
Blockly.BlockSvg.NOTCH_PATH_UP =
  'a ' + Blockly.BlockSvg.NOTCH_RADIUS + ',' + -Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
          '0 0 1 ' + Blockly.BlockSvg.NOTCH_RADIUS/2 + ',' + -Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
  'l ' + (Blockly.BlockSvg.NOTCH_BASE_HEIGHT/4 - Blockly.BlockSvg.NOTCH_RADIUS) + ',' +
         -1*(Blockly.BlockSvg.NOTCH_BASE_HEIGHT/4 - Blockly.BlockSvg.NOTCH_RADIUS) + ' ' +
  'a ' + Blockly.BlockSvg.NOTCH_RADIUS + ',' + -Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
          '0 0 0 ' + Blockly.BlockSvg.NOTCH_RADIUS/2 + ',' + -Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
  'v ' + -1*(Blockly.BlockSvg.NOTCH_BASE_HEIGHT/2 - Blockly.BlockSvg.NOTCH_RADIUS) + ' ' +
  'a ' + Blockly.BlockSvg.NOTCH_RADIUS + ',' + -Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
          '0 0 0 ' + -Blockly.BlockSvg.NOTCH_RADIUS/2 + ',' + -Blockly.BlockSvg.NOTCH_RADIUS +
  'l ' + (-Blockly.BlockSvg.NOTCH_BASE_HEIGHT/4 + Blockly.BlockSvg.NOTCH_RADIUS) + ',' +
         (-Blockly.BlockSvg.NOTCH_BASE_HEIGHT/4 + Blockly.BlockSvg.NOTCH_RADIUS) + ' ' +
  'a ' + Blockly.BlockSvg.NOTCH_RADIUS + ',' + -Blockly.BlockSvg.NOTCH_RADIUS + ' ' +
        '0 0 1 ' + -Blockly.BlockSvg.NOTCH_RADIUS/2 + ',' + -Blockly.BlockSvg.NOTCH_RADIUS;
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
 * SVG path for drawing the top-left corner of a statement input.
 * Includes the top notch, a horizontal space, and the rounded inside corner.
 * @const
 */
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER =
    Blockly.BlockSvg.NOTCH_PATH_UP + ' h -' +
    (Blockly.BlockSvg.NOTCH_HEIGHT - 15 - Blockly.BlockSvg.CORNER_RADIUS) +
    ' h -0.5 a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 -' +
    Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS;
/**
 * SVG path for drawing the bottom-left corner of a statement input.
 * Includes the rounded inside corner.
 * @const
 */
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER =
    'a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
    Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS;


/**
 * Play some UI effects (sound, ripple) after a connection has been established.
 */
Blockly.BlockSvg.prototype.connectionUiEffect = function() {
  this.workspace.playAudio('click');
  if (this.workspace.scale < 1) {
    return;  // Too small to care about visual effects.
  }
  // Determine the absolute coordinates of the inferior block.
  var xy = Blockly.getSvgXY_(/** @type {!Element} */ (this.svgGroup_),
                             this.workspace);
  // Offset the coordinates based on the two connection types, fix scale.
  xy.x += 8 * this.workspace.scale;
  xy.y += this.height - (Blockly.BlockSvg.CORNER_RADIUS * 2 + Blockly.BlockSvg.NOTCH_HEIGHT / 2) - 8 * this.workspace.scale;

  var ripple = Blockly.createSvgElement('circle',
      {'cx': xy.x, 'cy': xy.y, 'r': 0, 'fill': 'none',
       'stroke': '#EEE', 'stroke-width': 8},
      this.workspace.getParentSvg());

  // Start the animation.
  Blockly.BlockSvg.connectionUiStep_(ripple, new Date(), this.workspace.scale);
};

/**
 * Expand a ripple around a connection.
 * @param {!Element} ripple Element to animate.
 * @param {!Date} start Date of animation's start.
 * @param {number} workspaceScale Scale of workspace.
 * @private
 */
Blockly.BlockSvg.connectionUiStep_ = function(ripple, start, workspaceScale) {
  var ms = (new Date()) - start;
  var percent = ms / 150;
  if (percent > 1) {
    goog.dom.removeNode(ripple);
  } else {
    ripple.setAttribute('r', percent * 25 * workspaceScale);
    ripple.style.opacity = 0.8 - percent;
    var closure = function() {
      Blockly.BlockSvg.connectionUiStep_(ripple, start, workspaceScale);
    };
    Blockly.BlockSvg.disconnectUiStop_.pid_ = setTimeout(closure, 10);
  }
};

/**
 * Change the colour of a block.
 */
Blockly.BlockSvg.prototype.updateColour = function() {
  // Render block fill
  var hexColour = this.parentBlock_ ? this.parentBlock_.getColour() : this.getColour();
  var rgb = goog.color.hexToRgb(hexColour);
  if (this.isShadow()) {
    this.svgPath_.setAttribute('fill', '#ffffff');
  } else {
    this.svgPath_.setAttribute('fill', hexColour);
  }

  // Render block stroke
  var colorShift = goog.color.darken(rgb, 0.1);
  var strokeColor = goog.color.rgbArrayToHex(colorShift);
  this.svgPath_.setAttribute('stroke', strokeColor);

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
  } else if (!this.nextConnection && !this.outputConnection) {
    // Add a bit of margin under blocks with no bottom tab.
    height += 2;
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
 * @param {number} iconWidth Offset of first row due to icons.
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
    startHat: false,
    endHat: false
  };

  if (this.nextConnection && !this.previousConnection) {
    metrics.startHat = true;
  }
  if (this.previousConnection && !this.nextConnection) {
    metrics.endHat = true;
  }

  // Does block have a statement?
  for (var i = 0, input; input = this.inputList[i]; i++) {
    if (input.type == Blockly.NEXT_STATEMENT) {
      metrics.statement = input;
      // Compute minimum input size.
      // @todo Why 3?
      metrics.bayHeight = Blockly.BlockSvg.NOTCH_HEIGHT + 16 +
        Blockly.BlockSvg.CORNER_RADIUS * 3;
      metrics.bayWidth = Blockly.BlockSvg.NOTCH_WIDTH * 2 +
      Blockly.BlockSvg.MIN_BLOCK_X;
      // Expand input size if there is a connection.
      if (input.connection && input.connection.targetConnection) {
        var linkedBlock = input.connection.targetBlock();
        var bBox = linkedBlock.getHeightWidth();
        metrics.bayHeight = Math.max(metrics.bayHeight, bBox.height);
        metrics.bayWidth = Math.max(metrics.bayWidth, bBox.width);
      }
    }

    // Find icon
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      if (field instanceof Blockly.FieldImage) {
        metrics.icon = field;
      }
      if (field instanceof Blockly.FieldTextInput) {
        var fieldBBox = field.textElement_.getBBox();
        metrics.fieldWidth = fieldBBox.width + Blockly.BlockSvg.SEP_SPACE_X;
        metrics.fieldHeight = fieldBBox.height;
        if (field.sourceBlock_.type === 'math_number') {
          metrics.fieldRadius = Blockly.BlockSvg.NUMBER_FIELD_CORNER_RADIUS;
        } else {
          metrics.fieldRadius = Blockly.BlockSvg.TEXT_FIELD_CORNER_RADIUS;
        }
      }
    }
  }

  for (var i = 0, child; child = this.childBlocks_[i]; i++) {
    if (child.isShadow()) {
      metrics.valueInput = child;
    }
  }

  var iconSize = (metrics.icon) ? metrics.icon.getSize() : new goog.math.Size(0,0);
  metrics.width =
    Blockly.BlockSvg.SEP_SPACE_X * 2 + iconSize.width + metrics.bayWidth;
  if (metrics.statement) {
    metrics.width += 2 * Blockly.BlockSvg.CORNER_RADIUS + 8;
  }
  if (this.outputConnection) {
    metrics.height = Blockly.BlockSvg.FIELD_HEIGHT;
    metrics.width = Blockly.BlockSvg.FIELD_WIDTH;
  } else {
    metrics.height = Math.max(
      Blockly.BlockSvg.SEP_SPACE_Y * 2 + iconSize.height,
      Blockly.BlockSvg.NOTCH_HEIGHT + 16 + Blockly.BlockSvg.CORNER_RADIUS * 2,
      metrics.bayHeight + Blockly.BlockSvg.SEP_SPACE_Y
    );
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
    icon.setAttribute('transform',
      'translate(' + (metrics.width - iconSize.width - Blockly.BlockSvg.SEP_SPACE_X / 2) + ',' +
      (metrics.height - iconSize.height - Blockly.BlockSvg.SEP_SPACE_Y) + ')');
    // @todo RTL
  }

  // Position value input
  if (metrics.valueInput) {
    var input = metrics.valueInput.getSvgRoot();
    var inputBBox = input.getBBox();
    var transformation = 'translate(' +
      (Blockly.BlockSvg.NOTCH_WIDTH + (metrics.bayWidth ? 8 + Blockly.BlockSvg.NOTCH_WIDTH*2 : 0) + metrics.bayWidth) + ',' +
      (metrics.height - 8) + ')';
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
    steps.push('V', metrics.height - Blockly.BlockSvg.HAT_CORNER_RADIUS);
  } else if (this.previousConnection) {
    // Regular block
    // Position the cursor at the top-left starting point.
    steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START);
    // Top-left rounded corner.
    steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER);
    var cursorY = metrics.height - Blockly.BlockSvg.CORNER_RADIUS - 8 - Blockly.BlockSvg.NOTCH_HEIGHT;
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
    steps.push('h', 8);
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
               Blockly.BlockSvg.CORNER_RADIUS + ',-' +
               Blockly.BlockSvg.CORNER_RADIUS);
    steps.push('v', -8);
    steps.push(Blockly.BlockSvg.NOTCH_PATH_UP);
    // @todo Why 3?
    steps.push('v', -metrics.bayHeight + (Blockly.BlockSvg.CORNER_RADIUS * 3) + Blockly.BlockSvg.NOTCH_HEIGHT + 8);
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 ' +
               Blockly.BlockSvg.CORNER_RADIUS + ',-' +
               Blockly.BlockSvg.CORNER_RADIUS);
    steps.push('h', metrics.bayWidth - (Blockly.BlockSvg.CORNER_RADIUS * 2));
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 ' +
               Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS);
    steps.push('v', metrics.bayHeight - (Blockly.BlockSvg.CORNER_RADIUS * 3) - Blockly.BlockSvg.NOTCH_HEIGHT - 8);
    steps.push(Blockly.BlockSvg.NOTCH_PATH_DOWN);
    steps.push('v', 8);
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
               Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS);

    // Create statement connection.
    // @todo RTL
    // var connectionX = connectionsXY.x + (this.RTL ? -cursorX : cursorX + 1);
    var connectionX = connectionsXY.x + Blockly.BlockSvg.CORNER_RADIUS * 2 + 8;
    var connectionY = connectionsXY.y + metrics.height - Blockly.BlockSvg.CORNER_RADIUS * 2;
    metrics.statement.connection.moveTo(connectionX, connectionY);
    if (metrics.statement.connection.targetConnection) {
      metrics.statement.connection.tighten_();
    }
  }

  if (metrics.endHat) {
    steps.push('H', metrics.width - Blockly.BlockSvg.HAT_CORNER_RADIUS);
  } else if (this.nextConnection) {
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
  if (metrics.endHat) {
    steps.push('a', Blockly.BlockSvg.HAT_CORNER_RADIUS + ',' +
               Blockly.BlockSvg.HAT_CORNER_RADIUS + ' 0 0,0 ' +
               Blockly.BlockSvg.HAT_CORNER_RADIUS + ',-' +
               Blockly.BlockSvg.HAT_CORNER_RADIUS);
    steps.push('v', -8);
  } else if (this.nextConnection) {
    steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
               Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
               Blockly.BlockSvg.CORNER_RADIUS + ',-' +
               Blockly.BlockSvg.CORNER_RADIUS);
    steps.push('v', -8);
  } else {
    // Input
    steps.push(
      'a', metrics.fieldRadius + ',' + metrics.fieldRadius,
      '0', '0,0', metrics.fieldRadius + ',' + -1*metrics.fieldRadius);
    steps.push('v', -1*(metrics.height - metrics.fieldRadius*2));
  }

  if (metrics.endHat) {
    steps.push('V', Blockly.BlockSvg.HAT_CORNER_RADIUS);
  } else if (this.nextConnection) {
    steps.push(Blockly.BlockSvg.NOTCH_PATH_UP);

    // Create next block connection.
    var connectionX;
    if (this.RTL) {
      connectionX = connectionsXY.x + metrics.width;
    } else {
      connectionX = connectionsXY.x + metrics.width;
    }
    var connectionY = connectionsXY.y + metrics.height - Blockly.BlockSvg.CORNER_RADIUS * 2;
    this.nextConnection.moveTo(connectionX, connectionY);
    if (this.nextConnection.targetConnection) {
      this.nextConnection.tighten_();
    }
    this.height += 4;  // Height of tab.
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
  if (metrics.endHat) {
    steps.push('a', Blockly.BlockSvg.HAT_CORNER_RADIUS + ',' +
               Blockly.BlockSvg.HAT_CORNER_RADIUS + ' 0 0,0 -' +
               Blockly.BlockSvg.HAT_CORNER_RADIUS + ',-' +
               Blockly.BlockSvg.HAT_CORNER_RADIUS);
  } else if (this.nextConnection) {
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
