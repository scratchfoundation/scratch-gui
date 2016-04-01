/**
 * @fileoverview An SVG that floats on top of the workspace.
 * Blocks are moved into this SVG during a drag, improving performance.
 * @author tmickel@mit.edu (Tim Mickel)
 */

 'use strict';

 goog.provide('Blockly.DragSurfaceSvg');

 goog.require('Blockly.utils');
 goog.require('Blockly.constants');

 goog.require('goog.asserts');

 /**
  * Class for a Drag Surface SVG.
  * @param {Element} container Containing element.
  * @constructor
  */
Blockly.DragSurfaceSvg = function(container) {
  this.container_ = container;
};

 /**
  * The SVG drag surface. Set once by Blockly.DragSurfaceSvg.createDom.
  * @type {Element}
  * @private
  */
Blockly.DragSurfaceSvg.prototype.SVG_ = null;

 /**
  * SVG group inside the drag surface. This is where blocks are moved to.
  * @type {Element}
  * @private
  */
Blockly.DragSurfaceSvg.prototype.dragGroup_ = null;

 /**
  * Containing HTML element; parent of the workspace and the drag surface.
  * @type {Element}
  * @private
  */
Blockly.DragSurfaceSvg.prototype.container_ = null;

 /**
  * Create the drag surface and inject it into the container.
  */
Blockly.DragSurfaceSvg.prototype.createDom = function () {
  if (this.SVG_) {
    return;  // Already created.
  }
  this.SVG_ = Blockly.createSvgElement('svg', {
    'xmlns': Blockly.SVG_NS,
    'xmlns:html': Blockly.HTML_NS,
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    'version': '1.1',
    'class': 'blocklyDragSurface'
  }, this.container_);
  Blockly.createSvgElement('defs', {}, this.SVG_);
  this.dragGroup_ = Blockly.createSvgElement('g', {}, this.SVG_);
};

/**
 * Set the dimensions (width, height, top offset) of the surface.
 * @param {Number} width Width of the surface in pixels
 * @param {Number} height Height of the surface in pixels
 * @param {Number} top Top offset of the surface in pixels
 */
Blockly.DragSurfaceSvg.prototype.setSurfaceDimensions = function (width, height, top) {
  this.SVG_.setAttribute('width', width + 'px');
  this.SVG_.setAttribute('height', height + 'px');
  this.SVG_.style.top = top + 'px';
};

 /**
  * Set the SVG blocks on the drag surface's group and show the surface.
  * Only one block should be on the drag surface at a time.
  * @param {!Element} blocks Block or group of blocks to place on the drag surface
  */
Blockly.DragSurfaceSvg.prototype.setBlocksAndShow = function (blocks) {
  goog.asserts.assert(this.dragGroup_.childNodes.length == 0, 'Already dragging a block.');
  this.dragGroup_.appendChild(blocks);
  this.SVG_.style.display = 'block';
};

 /**
  * Translate blocks on the drag surface's group.
  * @param {Number} x X translation
  * @param {Number} y Y translation
  */
Blockly.DragSurfaceSvg.prototype.translateBlocks = function (x, y) {
  var blocks = this.dragGroup_.childNodes[0];
  // TODO: fall back to 2D translate when translate3d not supported.
  blocks.setAttribute('style', 'transform: translate3d(' + x + 'px,' + y + 'px, 0px)');
};

/**
 * Translate and scale the entire drag surface group to keep in sync with the workspace.
 * @param {Number} x X translation
 * @param {Number} y Y translation
 * @param {Number} scale Scale of the group
 */
Blockly.DragSurfaceSvg.prototype.translateAndScaleGroup = function (x, y, scale) {
  // TODO: fall back to 2D translate when translate3d not supported.
  var transform = 'transform: translate3d(' + x + 'px, ' + y + 'px, 0px) ' +
      'scale3d(' + scale + ',' + scale + ',' + scale + ');';
  this.dragGroup_.setAttribute('style', transform);
};

 /**
  * Clear the group and hide the surface; move the blocks off onto the provided element.
  * @param {!Element} newSurface Surface the dragging blocks should be moved to
  */
Blockly.DragSurfaceSvg.prototype.clearAndHide = function (newSurface) {
  newSurface.appendChild(this.dragGroup_.childNodes[0]);
  this.SVG_.style.display = 'none';
  goog.asserts.assert(this.dragGroup_.childNodes.length == 0, 'Drag group was not cleared.');
};
