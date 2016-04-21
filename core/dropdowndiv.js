/**
 * @license
 * Scratch Blocks
 *
 * Copyright (c) 2016, Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under BSD-3-clause (see LICENSE).
 */

/**
 * @fileoverview A div that floats on top of the workspace, for drop-down menus.
 * The drop-down can be kept inside the workspace, animate in/out, etc.
 * @author tmickel@mit.edu (Tim Mickel)
 */

'use strict';

goog.provide('Blockly.DropDownDiv');

goog.require('goog.dom');
goog.require('goog.style');

/**
 * Class for drop-down div.
 * @constructor
 */
Blockly.DropDownDiv = function() {
};

/**
 * The div element. Set once by Blockly.DropDownDiv.createDom.
 * @type {Element}
 * @private
 */
Blockly.DropDownDiv.DIV_ = null;

/**
 * Drop-downs will appear within the bounds of this element if possible.
 * Set in Blockly.DropDownDiv.setBoundsElement.
 * @type {Element}
 * @private
 */
Blockly.DropDownDiv.boundsElement_ = null;

/**
 * The object currently using the drop-down.
 * @type {Object}
 * @private
 */
Blockly.DropDownDiv.owner_ = null;

/**
 * Arrow size in px. Should match the value in CSS (need to position pre-render).
 * @type {number}
 * @const
 */
Blockly.DropDownDiv.ARROW_SIZE = 16;

/**
 * Drop-down border size in px. Should match the value in CSS (need to position the arrow).
 * @type {number}
 * @const
 */
Blockly.DropDownDiv.BORDER_SIZE = 1;

/**
 * Amount the arrow must be kept away from the edges of the main drop-down div, in px.
 * @type {number}
 * @const
 */
Blockly.DropDownDiv.ARROW_HORIZONTAL_PADDING = 12;

/**
 * Amount drop-downs should be padded away from the source, in px.
 * @type {number}
 * @const
 */
Blockly.DropDownDiv.PADDING_Y = 20;

/**
 * Length of animations in seconds.
 * @type {number}
 * @const
 */
Blockly.DropDownDiv.ANIMATION_TIME = 0.25;

/**
 * Timer for animation out, to be cleared if we need to immediately hide
 * without disrupting new shows.
 * @type {number}
 */
Blockly.DropDownDiv.animateOutTimer_ = null;

/**
 * When the drop-down is opened, we save the position it animated from
 * so that it can animate back to that position on close.
 * Absolute X position of that position, in px.
 * @type {number}
 */
Blockly.DropDownDiv.hideAnimationX_ = 0;

/**
 * When the drop-down is opened, we save the position it animated from
 * so that it can animate back to that position on close.
 * Absolute Y position of that position, in px.
 * @type {number}
 */
Blockly.DropDownDiv.hideAnimationY_ = 0;

/**
 * Callback for when the drop-down is hidden.
 * @type {Function}
 */
Blockly.DropDownDiv.onHide_ = 0;

/**
 * Create and insert the DOM element for this div.
 * @param {Element} container Element that the div should be contained in.
 */
Blockly.DropDownDiv.createDom = function() {
  if (Blockly.DropDownDiv.DIV_) {
    return;  // Already created.
  }
  Blockly.DropDownDiv.DIV_ = goog.dom.createDom('div', 'blocklyDropDownDiv');
  document.body.appendChild(Blockly.DropDownDiv.DIV_);
  Blockly.DropDownDiv.content_ = goog.dom.createDom('div', 'blocklyDropDownContent');
  Blockly.DropDownDiv.DIV_.appendChild(Blockly.DropDownDiv.content_);
  Blockly.DropDownDiv.arrow_ = goog.dom.createDom('div', 'blocklyDropDownArrow');
  Blockly.DropDownDiv.DIV_.appendChild(Blockly.DropDownDiv.arrow_);
};

/**
 * Set an element to maintain bounds within. Drop-downs will appear
 * within the box of this element if possible.
 * @param {Element} boundsElement Element to bound drop-down to.
 */
Blockly.DropDownDiv.setBoundsElement = function(boundsElement) {
  Blockly.DropDownDiv.boundsElement_ = boundsElement;
};

/**
 * Provide the div for inserting content into the drop-down.
 * @return {Element} Div to populate with content
 */
Blockly.DropDownDiv.getContentDiv = function() {
  return Blockly.DropDownDiv.content_;
};

/**
 * Clear the content of the drop-down.
 */
Blockly.DropDownDiv.clearContent = function() {
  Blockly.DropDownDiv.content_.innerHTML = '';
};

/**
 * Set the colour for the drop-down.
 * @param {string} backgroundColour Any CSS color for the background
 * @param {string} borderColour Any CSS color for the border
 */
Blockly.DropDownDiv.setColour = function(backgroundColour, borderColour) {
  Blockly.DropDownDiv.DIV_.style.backgroundColor = backgroundColour;
  Blockly.DropDownDiv.arrow_.style.backgroundColor = backgroundColour;
  Blockly.DropDownDiv.DIV_.style.borderColor = borderColour;
  Blockly.DropDownDiv.arrow_.style.borderColor = borderColour;
};

/**
 * Show and place the drop-down.
 * The drop-down is placed with an absolute "origin point" (x, y) - i.e.,
 * the arrow will point at this origin and box will positioned below or above it.
 * If we can maintain the container bounds at the primary point, the arrow will
 * point there, and the container will be positioned below it.
 * If we can't maintain the container bounds at the primary point, fall-back to the
 * secondary point and position above.
 * @param {Object} owner The object showing the drop-down
 * @param {number} primaryX Desired origin point x, in absolute px
 * @param {number} primaryY Desired origin point y, in absolute px
 * @param {number} secondaryX Secondary/alternative origin point x, in absolute px
 * @param {number} secondaryY Secondary/alternative origin point y, in absolute px
 * @param {Function=} opt_onHide Optional callback for when the drop-down is hidden
 * @return {boolean} True if the menu rendered at the primary origin point.
 */
Blockly.DropDownDiv.show = function(owner, primaryX, primaryY, secondaryX, secondaryY, opt_onHide) {
  Blockly.DropDownDiv.owner_ = owner;
  Blockly.DropDownDiv.onHide_ = opt_onHide;
  var div = Blockly.DropDownDiv.DIV_;
  var metrics = Blockly.DropDownDiv.getPositionMetrics(primaryX, primaryY, secondaryX, secondaryY);
  // Update arrow CSS
  Blockly.DropDownDiv.arrow_.style.transform = 'translate(' +
    metrics.arrowX + 'px,' + metrics.arrowY + 'px) rotate(45deg)';
  Blockly.DropDownDiv.arrow_.setAttribute('class',
    metrics.arrowAtTop ? 'blocklyDropDownArrow arrowTop' : 'blocklyDropDownArrow arrowBottom');
  // First apply initial translation
  div.style.transform = 'translate(' + metrics.initialX + 'px,' + metrics.initialY + 'px)';
  // Save for animate out
  Blockly.DropDownDiv.hideAnimationX_ = metrics.initialX;
  Blockly.DropDownDiv.hideAnimationY_ = metrics.initialY;
  // Show the div
  div.style.display = 'block';
  div.style.opacity = 1;
  // Add transition and apply final translate after a cycle.
  setTimeout(function() {
    div.style.transition = 'transform ' + Blockly.DropDownDiv.ANIMATION_TIME + 's, ' +
      'opacity ' + Blockly.DropDownDiv.ANIMATION_TIME + 's';
    div.style.transform = 'translate(' + metrics.finalX + 'px,' + metrics.finalY + 'px)';
  }, 1);
  return metrics.arrowAtTop;
};

/**
 * Helper to position the drop-down and the arrow, maintaining bounds.
 * See explanation of origin points in Blockly.DropDownDiv.show.
 * @param {number} primaryX Desired origin point x, in absolute px
 * @param {number} primaryY Desired origin point y, in absolute px
 * @param {number} secondaryX Secondary/alternative origin point x, in absolute px
 * @param {number} secondaryY Secondary/alternative origin point y, in absolute px
 * @returns {Object} Various final metrics, including rendered positions for drop-down and arrow.
 */
Blockly.DropDownDiv.getPositionMetrics = function(primaryX, primaryY, secondaryX, secondaryY) {
  var div = Blockly.DropDownDiv.DIV_;
  var boundPosition = goog.style.getClientPosition(Blockly.DropDownDiv.boundsElement_);
  var boundSize = goog.style.getSize(Blockly.DropDownDiv.boundsElement_);
  var divSize = goog.style.getSize(div);

  // First decide if we will render at primary or secondary position
  // i.e., above or below
  // renderX, renderY will eventually be the final rendered position of the box.
  var renderX, renderY, renderedSecondary;
  // Can the div fit inside the bounds if we render below the primary point?
  if (primaryY + divSize.height > boundPosition.y + boundSize.height) {
    // We can't fit below in terms of y. Can we fit above?
    if (secondaryY - divSize.height < boundPosition.y) {
      // We also can't fit above, so just render below anyway.
      renderX = primaryX;
      renderY = primaryY + Blockly.DropDownDiv.PADDING_Y;
      renderedSecondary = false;
    } else {
      // We can fit above, render secondary
      renderX = secondaryX;
      renderY = secondaryY - divSize.height - Blockly.DropDownDiv.PADDING_Y;
      renderedSecondary = true;
    }
  } else {
    // We can fit below, render primary
    renderX = primaryX;
    renderY = primaryY + Blockly.DropDownDiv.PADDING_Y;
    renderedSecondary = false;
  }
  // First calculate the absolute arrow X
  // This needs to be done before positioning the div, since the arrow
  // wants to be as close to the origin point as possible.
  var arrowX = renderX - Blockly.DropDownDiv.ARROW_SIZE / 2;
  // Keep in overall bounds
  arrowX = Math.max(boundPosition.x, Math.min(arrowX, boundPosition.x + boundSize.width));

  // Adjust the x-position of the drop-down so that the div is centered and within bounds.
  var centerX = divSize.width / 2;
  renderX -= centerX;
  // Fit horizontally in the bounds.
  renderX = Math.max(
    boundPosition.x,
    Math.min(renderX, boundPosition.x + boundSize.width - divSize.width)
  );
  // After we've finished caclulating renderX, adjust the arrow to be relative to it.
  arrowX -= renderX;

  // Pad the arrow by some pixels, primarily so that it doesn't render on top of a rounded border.
  arrowX = Math.max(
    Blockly.DropDownDiv.ARROW_HORIZONTAL_PADDING,
    Math.min(arrowX, divSize.width - Blockly.DropDownDiv.ARROW_HORIZONTAL_PADDING - Blockly.DropDownDiv.ARROW_SIZE)
  );

  // Calculate arrow Y. If we rendered secondary, add on bottom.
  // Extra pixels are added so that it covers the border of the div.
  var arrowY = (renderedSecondary) ? divSize.height - Blockly.DropDownDiv.BORDER_SIZE : 0;
  arrowY -= (Blockly.DropDownDiv.ARROW_SIZE / 2) + Blockly.DropDownDiv.BORDER_SIZE;

  // Initial position calculated without any padding to provide an animation point.
  var initialX = renderX; // X position remains constant during animation.
  var initialY;
  if (renderedSecondary) {
    initialY = secondaryY - divSize.height; // No padding on Y
  } else {
    initialY = primaryY; // No padding on Y
  }

  return {
    initialX: initialX,
    initialY : initialY,
    finalX: renderX,
    finalY: renderY,
    arrowX: arrowX,
    arrowY: arrowY,
    arrowAtTop: !renderedSecondary
  };
};

/**
 * Hide the menu only if it is owned by the provided object.
 * @param {Object} owner Object which must be owning the drop-down to hide
 * @return {Boolean} True if hidden
 */
Blockly.DropDownDiv.hideIfOwner = function(owner) {
  if (Blockly.DropDownDiv.owner_ === owner) {
    Blockly.DropDownDiv.hide();
    return true;
  }
  return false;
};

/**
 * Hide the menu, triggering animation.
 */
Blockly.DropDownDiv.hide = function() {
  // Start the animation by setting the translation and fading out.
  var div = Blockly.DropDownDiv.DIV_;
  div.style.transform = 'translate(' + Blockly.DropDownDiv.hideAnimationX_ +
    'px,' + Blockly.DropDownDiv.hideAnimationY_ + 'px)';
  div.style.opacity = 0;
  Blockly.DropDownDiv.animateOutTimer_ = setTimeout(function() {
    // Finish animation - reset all values to default.
    Blockly.DropDownDiv.hideWithoutAnimation();
  }, Blockly.DropDownDiv.ANIMATION_TIME * 1000);
  if (Blockly.DropDownDiv.onHide_) {
    Blockly.DropDownDiv.onHide_();
    Blockly.DropDownDiv.onHide_ = null;
  }
};

/**
 * Hide the menu, without animation.
 */
Blockly.DropDownDiv.hideWithoutAnimation = function() {
  var div = Blockly.DropDownDiv.DIV_;
  Blockly.DropDownDiv.animateOutTimer_ && window.clearTimeout(Blockly.DropDownDiv.animateOutTimer_);
  div.style.transition = '';
  div.style.transform = '';
  div.style.display = 'none';
  Blockly.DropDownDiv.clearContent();
  Blockly.DropDownDiv.owner_ = null;
  if (Blockly.DropDownDiv.onHide_) {
    Blockly.DropDownDiv.onHide_();
    Blockly.DropDownDiv.onHide_ = null;
  }
};
