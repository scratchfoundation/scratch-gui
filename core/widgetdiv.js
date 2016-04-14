/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview A div that floats on top of Blockly.  This singleton contains
 *     temporary HTML UI widgets that the user is currently interacting with.
 *     E.g. text input areas, colour pickers, context menus.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.WidgetDiv');

goog.require('Blockly.Css');
goog.require('goog.dom');
goog.require('goog.style');


/**
 * The HTML container.  Set once by Blockly.WidgetDiv.createDom.
 * @type {Element}
 */
Blockly.WidgetDiv.DIV = null;

/**
 * The object currently using this container.
 * @type {Object}
 * @private
 */
Blockly.WidgetDiv.owner_ = null;

/**
 * Optional cleanup function set by whichever object uses the widget.
 * This is called as soon as a dispose is desired. If the dispose should
 * be animated, the animation should start on the call of dispose_.
 * @type {Function}
 * @private
 */
Blockly.WidgetDiv.dispose_ = null;

/**
 * Optional function called at the end of a dispose animation.
 * Set by whichever object is using the widget.
 * @type {Function}
 * @private
 */
Blockly.WidgetDiv.disposeAnimationFinished_ = null;

/**
 * Timer ID for the dispose animation.
 * @type {number}
 * @private
 */
Blockly.WidgetDiv.disposeAnimationTimer_ = null;

/**
 * Length of time in seconds for the dispose animation.
 * @type {number}
 * @private
 */
Blockly.WidgetDiv.disposeAnimationTimerLength_ = 0;


/**
 * Create the widget div and inject it onto the page.
 */
Blockly.WidgetDiv.createDom = function() {
  if (Blockly.WidgetDiv.DIV) {
    return;  // Already created.
  }
  // Create an HTML container for popup overlays (e.g. editor widgets).
  Blockly.WidgetDiv.DIV = goog.dom.createDom('div', 'blocklyWidgetDiv');
  document.body.appendChild(Blockly.WidgetDiv.DIV);
};

/**
 * Initialize and display the widget div.  Close the old one if needed.
 * @param {!Object} newOwner The object that will be using this container.
 * @param {boolean} rtl Right-to-left (true) or left-to-right (false).
 * @param {Function=} opt_dispose Optional cleanup function to be run when the widget
 *   is closed. If the dispose is animated, this function must start the animation.
 * @param {Function=} opt_disposeAnimationFinished Optional cleanup function to be run
 *   when the widget is done animating and must disappear.
 * @param {number=} opt_disposeAnimationTimerLength Length of animation time in seconds
     if a dispose animation is provided.
 */
Blockly.WidgetDiv.show = function(newOwner, rtl, opt_dispose,
    opt_disposeAnimationFinished, opt_disposeAnimationTimerLength) {
  Blockly.WidgetDiv.hide();
  Blockly.WidgetDiv.owner_ = newOwner;
  Blockly.WidgetDiv.dispose_ = opt_dispose;
  Blockly.WidgetDiv.disposeAnimationFinished_ = opt_disposeAnimationFinished;
  Blockly.WidgetDiv.disposeAnimationTimerLength_ = opt_disposeAnimationTimerLength;
  // Temporarily move the widget to the top of the screen so that it does not
  // cause a scrollbar jump in Firefox when displayed.
  var xy = goog.style.getViewportPageOffset(document);
  Blockly.WidgetDiv.DIV.style.top = xy.y + 'px';
  Blockly.WidgetDiv.DIV.style.direction = rtl ? 'rtl' : 'ltr';
  Blockly.WidgetDiv.DIV.style.display = 'block';
  Blockly.Events.setGroup(true);
};

/**
 * Destroy the widget and hide the div.
 */
Blockly.WidgetDiv.hide = function() {
  if (Blockly.WidgetDiv.disposeAnimationTimer_) {
    // An animation timer is set already.
    // This happens when a previous widget was animating out,
    // but Blockly is hiding the widget to create a new one.
    // So, short-circuit the animation and clear the timer.
    window.clearTimeout(Blockly.WidgetDiv.disposeAnimationTimer_);
    Blockly.WidgetDiv.disposeAnimationFinished_ && Blockly.WidgetDiv.disposeAnimationFinished_();
    Blockly.WidgetDiv.disposeAnimationFinished_ = null;
    Blockly.WidgetDiv.disposeAnimationTimer_ = null;
    Blockly.WidgetDiv.owner_ = null;
    Blockly.WidgetDiv.hideAndClearDom_();
  } else if (Blockly.WidgetDiv.isVisible()) {
    // No animation timer set, but the widget is visible
    // Start animation out (or immediately hide)
    Blockly.WidgetDiv.dispose_ && Blockly.WidgetDiv.dispose_();
    Blockly.WidgetDiv.dispose_ = null;
    // If we want to animate out, set the appropriate timer for final dispose.
    if (Blockly.WidgetDiv.disposeAnimationFinished_) {
      Blockly.WidgetDiv.disposeAnimationTimer_ = window.setTimeout(
        Blockly.WidgetDiv.hide, // Come back to hide and take the first branch.
        Blockly.WidgetDiv.disposeAnimationTimerLength_ * 1000
      );
    } else {
      // No timer provided - auto-hide the DOM now.
      Blockly.WidgetDiv.owner_ = null;
      Blockly.WidgetDiv.hideAndClearDom_();
    }
    Blockly.Events.setGroup(false);
  }
};

/**
 * Hide all DOM for the WidgetDiv, and clear its children.
 * @private
 */
Blockly.WidgetDiv.hideAndClearDom_ = function() {
  Blockly.WidgetDiv.DIV.style.display = 'none';
  Blockly.WidgetDiv.DIV.style.left = '';
  Blockly.WidgetDiv.DIV.style.top = '';
  Blockly.WidgetDiv.DIV.style.height = '';
  goog.dom.removeChildren(Blockly.WidgetDiv.DIV);
};

/**
 * Is the container visible?
 * @return {boolean} True if visible.
 */
Blockly.WidgetDiv.isVisible = function() {
  return !!Blockly.WidgetDiv.owner_;
};

/**
 * Destroy the widget and hide the div if it is being used by the specified
 *   object.
 * @param {!Object} oldOwner The object that was using this container.
 */
Blockly.WidgetDiv.hideIfOwner = function(oldOwner) {
  if (Blockly.WidgetDiv.owner_ == oldOwner) {
    Blockly.WidgetDiv.hide();
  }
};

/**
 * Position the widget at a given location.  Prevent the widget from going
 * offscreen top or left (right in RTL).
 * @param {number} anchorX Horizontal location (window coorditates, not body).
 * @param {number} anchorY Vertical location (window coorditates, not body).
 * @param {!goog.math.Size} windowSize Height/width of window.
 * @param {!goog.math.Coordinate} scrollOffset X/y of window scrollbars.
 * @param {boolean} rtl True if RTL, false if LTR.
 */
Blockly.WidgetDiv.position = function(anchorX, anchorY, windowSize,
                                      scrollOffset, rtl) {
  // Don't let the widget go above the top edge of the window.
  if (anchorY < scrollOffset.y) {
    anchorY = scrollOffset.y;
  }
  if (rtl) {
    // Don't let the widget go right of the right edge of the window.
    if (anchorX > windowSize.width + scrollOffset.x) {
      anchorX = windowSize.width + scrollOffset.x;
    }
  } else {
    // Don't let the widget go left of the left edge of the window.
    if (anchorX < scrollOffset.x) {
      anchorX = scrollOffset.x;
    }
  }
  Blockly.WidgetDiv.DIV.style.left = anchorX + 'px';
  Blockly.WidgetDiv.DIV.style.top = anchorY + 'px';
  Blockly.WidgetDiv.DIV.style.height =
      (windowSize.height - anchorY + scrollOffset.y) + 'px';
};
