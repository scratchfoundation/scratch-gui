/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
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
 * @fileoverview Field for numbers. Includes validator and numpad on touch.
 * @author tmickel@mit.edu (Tim Mickel)
 */
'use strict';

goog.provide('Blockly.FieldNumber');

goog.require('Blockly.FieldTextInput');
goog.require('goog.math');
goog.require('goog.userAgent');


/**
 * Class for an editable number field.
 * @param {string} text The initial content of the field.
 * @param {Function=} opt_validator An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns the accepted text or null to abort
 *     the change.
 * @param {number} precision Precision of the decimal value (negative power of 10).
 * @param {number} min Minimum value of the number.
 * @param {number} max Maximum value of the number.
 * @extends {Blockly.FieldTextInput}
 * @constructor
 */
Blockly.FieldNumber = function(text, opt_validator, precision, min, max) {
  this.precision_ = precision;
  this.min_ = min;
  this.max_ = max;
  Blockly.FieldNumber.superClass_.constructor.call(this, text, opt_validator);
};
goog.inherits(Blockly.FieldNumber, Blockly.FieldTextInput);

/**
 * Fixed width of the num-pad drop-down, in px.
 * @type {number}
 * @const
 */
Blockly.FieldNumber.DROPDOWN_WIDTH = 168;

/**
 * Extra padding to add between the block and the num-pad drop-down, in px.
 * @type {number}
 * @const
 */
Blockly.FieldNumber.DROPDOWN_Y_PADDING = 8;

/**
 * Buttons for the num-pad, in order from the top left.
 * Values are strings of the number or symbol will be added to the field text
 * when the button is pressed.
 * @type {Array.<string>}
 * @const
 */
 // Calculator order
Blockly.FieldNumber.NUMPAD_BUTTONS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0'];

/**
 * Src for the delete icon to be shown on the num-pad.
 * @type {string}
 * @const
 */
Blockly.FieldNumber.NUMPAD_DELETE_ICON = 'data:image/svg+xml;utf8,' +
  '<svg ' +
  'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">' +
  '<path d="M28.89,11.45H16.79a2.86,2.86,0,0,0-2,.84L9.09,1' +
  '8a2.85,2.85,0,0,0,0,4l5.69,5.69a2.86,2.86,0,0,0,2,.84h12' +
  '.1a2.86,2.86,0,0,0,2.86-2.86V14.31A2.86,2.86,0,0,0,28.89' +
  ',11.45ZM27.15,22.73a1,1,0,0,1,0,1.41,1,1,0,0,1-.71.3,1,1' +
  ',0,0,1-.71-0.3L23,21.41l-2.73,2.73a1,1,0,0,1-1.41,0,1,1,' +
  '0,0,1,0-1.41L21.59,20l-2.73-2.73a1,1,0,0,1,0-1.41,1,1,0,' +
  '0,1,1.41,0L23,18.59l2.73-2.73a1,1,0,1,1,1.42,1.41L24.42,20Z" fill="' +
  Blockly.Colours.numPadText + '"/></svg>';

/**
 * Currently active field during an edit.
 * Used to give a reference to the num-pad button callbacks.
 * @type {?FieldNumber}
 * @private
 */
Blockly.FieldNumber.activeField_ = null;

/**
 * Sets a new change handler for angle field.
 * @param {Function} handler New change handler, or null.
 */
Blockly.FieldNumber.prototype.setValidator = function(handler) {
  var wrappedHandler;
  if (handler) {
    // Wrap the user's change handler together with the number validator.
    // This is copied entirely from FieldAngle.
    wrappedHandler = function(value) {
      var v1 = handler.call(this, value);
      var v2;
      if (v1 === null) {
        v2 = v1;
      } else {
        if (v1 === undefined) {
          v1 = value;
        }
        v2 = Blockly.FieldNumber.numberValidator.call(this, v1);
        if (v2 === undefined) {
          v2 = v1;
        }
      }
      return v2 === value ? undefined : v2;
    };
  } else {
    wrappedHandler = Blockly.FieldNumber.numberValidator;
  }
  Blockly.FieldNumber.superClass_.setValidator.call(this, wrappedHandler);
};

/**
 * Show the inline free-text editor on top of the text and the num-pad if appropriate.
 * @private
 */
Blockly.FieldNumber.prototype.showEditor_ = function() {
  Blockly.FieldNumber.activeField_ = this;
  // Do not focus on mobile devices so we can show the num-pad
  var showNumPad =
      goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD;
  Blockly.FieldNumber.superClass_.showEditor_.call(this, false, showNumPad);

  // Show a numeric keypad in the drop-down on touch
  if (showNumPad) {
    this.showNumPad_();
  }
};

Blockly.FieldNumber.prototype.showNumPad_ = function() {
  // If there is an existing drop-down someone else owns, hide it immediately and clear it.
  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();

  var contentDiv = Blockly.DropDownDiv.getContentDiv();

  // Accessibility properties
  contentDiv.setAttribute('role', 'menu');
  contentDiv.setAttribute('aria-haspopup', 'true');

  // Add numeric keypad buttons
  var buttons = Blockly.FieldNumber.NUMPAD_BUTTONS;
  for (var i = 0, buttonText; buttonText = buttons[i]; i++) {
    var button = document.createElement('button');
    button.setAttribute('role', 'menuitem');
    button.setAttribute('class', 'blocklyNumPadButton');
    button.title = buttonText;
    button.innerHTML = buttonText;
    // Num-pad only reacts on touch devices
    button.ontouchstart = Blockly.FieldNumber.numPadButtonTouch_;
    if (buttonText == '.' && this.precision_ == 0) {
      // Don't show the decimal point for inputs that must be round numbers
      button.setAttribute('style', 'visibility: hidden');
    }
    contentDiv.appendChild(button);
  }
  // Add erase button to the end
  var eraseButton = document.createElement('button');
  eraseButton.setAttribute('role', 'menuitem');
  eraseButton.setAttribute('class', 'blocklyNumPadButton');
  eraseButton.title = 'Delete';
  var eraseImage = document.createElement('img');
  eraseImage.src = Blockly.FieldNumber.NUMPAD_DELETE_ICON;
  eraseButton.appendChild(eraseImage);
  // Num-pad only reacts on touch devices
  eraseButton.ontouchstart = Blockly.FieldNumber.numPadEraseButtonTouch_;
  contentDiv.appendChild(eraseButton);

  // Set colour and size of drop-down
  Blockly.DropDownDiv.setColour(Blockly.Colours.numPadBackground, Blockly.Colours.numPadBorder);
  contentDiv.style.width = Blockly.FieldNumber.DROPDOWN_WIDTH + 'px';

  // Calculate positioning for the drop-down
  // sourceBlock_ is the rendered shadow field input box
  var scale = this.sourceBlock_.workspace.scale;
  var bBox = this.sourceBlock_.getHeightWidth();
  bBox.width *= scale;
  bBox.height *= scale;
  var position = this.getAbsoluteXY_();
  // If we can fit it, render below the shadow block
  var primaryX = position.x + bBox.width / 2;
  var primaryY = position.y + bBox.height + Blockly.FieldNumber.DROPDOWN_Y_PADDING;
  // If we can't fit it, render above the entire parent block
  var secondaryX = primaryX;
  var secondaryY = position.y - (Blockly.BlockSvg.MIN_BLOCK_Y * scale) - (Blockly.BlockSvg.FIELD_Y_OFFSET * scale);

  Blockly.DropDownDiv.setBoundsElement(this.sourceBlock_.workspace.getParentSvg().parentNode);
  Blockly.DropDownDiv.show(this, primaryX, primaryY, secondaryX, secondaryY, this.onHide_.bind(this));
};

/**
 * Call for when a num-pad button is touched.
 * Determine what the user is inputting, and update the text field appropriately.
 */
Blockly.FieldNumber.numPadButtonTouch_ = function() {
  // String of the button (e.g., '7')
  var spliceValue = this.innerHTML;
  // Old value of the text field
  var oldValue = Blockly.FieldTextInput.htmlInput_.value;
  // Determine the selected portion of the text field
  var selectionStart = Blockly.FieldTextInput.htmlInput_.selectionStart;
  var selectionEnd = Blockly.FieldTextInput.htmlInput_.selectionEnd;
  // Splice in the new value
  var newValue = oldValue.slice(0, selectionStart) + spliceValue + oldValue.slice(selectionEnd);
  // Updates the display. The actual setValue occurs when the field is stopped editing.
  Blockly.FieldTextInput.htmlInput_.value = Blockly.FieldTextInput.htmlInput_.defaultValue = newValue;
  // Resize and scroll the text field appropriately
  Blockly.FieldNumber.superClass_.resizeEditor_.call(Blockly.FieldNumber.activeField_);
  Blockly.FieldTextInput.htmlInput_.setSelectionRange(newValue.length, newValue.length);
  Blockly.FieldTextInput.htmlInput_.scrollLeft = Blockly.FieldTextInput.htmlInput_.scrollWidth;
};

/**
 * Call for when the num-pad erase button is touched.
 * Determine what the user is asking to erase, and erase it.
 */
Blockly.FieldNumber.numPadEraseButtonTouch_ = function() {
  // Old value of the text field
  var oldValue = Blockly.FieldTextInput.htmlInput_.value;
  // Determine what is selected to erase (if anything)
  var selectionStart = Blockly.FieldTextInput.htmlInput_.selectionStart;
  var selectionEnd = Blockly.FieldTextInput.htmlInput_.selectionEnd;
  // Cut out anything that was previously selected
  var newValue = oldValue.slice(0, selectionStart) + oldValue.slice(selectionEnd);
  if (selectionEnd - selectionStart == 0) { // Length of selection == 0
    // Delete the last character if nothing was selected
    newValue = oldValue.slice(0, selectionStart - 1) + oldValue.slice(selectionStart);
  }
  // Update the display to show erased value.
  Blockly.FieldTextInput.htmlInput_.value = Blockly.FieldTextInput.htmlInput_.defaultValue = newValue;
  // Resize and scroll the text field appropriately
  Blockly.FieldNumber.superClass_.resizeEditor_.call(Blockly.FieldNumber.activeField_);
  Blockly.FieldTextInput.htmlInput_.setSelectionRange(newValue.length, newValue.length);
  Blockly.FieldTextInput.htmlInput_.scrollLeft = Blockly.FieldTextInput.htmlInput_.scrollWidth;
};

/**
 * Callback for when the drop-down is hidden.
 */
Blockly.FieldNumber.prototype.onHide_ = function() {
  // Clear accessibility properties
  Blockly.DropDownDiv.content_.removeAttribute('role');
  Blockly.DropDownDiv.content_.removeAttribute('aria-haspopup');
};

/**
 * Ensure that only a number may be entered with the properties of this field.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid angle, or null if invalid.
 */
Blockly.FieldNumber.numberValidator = function(text) {
  var n = Blockly.FieldTextInput.numberValidator(text);
  if (n !== null) {
    // string -> float
    n = parseFloat(n);
    // Keep within min and max
    n = Math.min(Math.max(n, this.min_), this.max_);
    // Update float precision (returns a string)
    n = n.toFixed(this.precision_);
    // Parse to a float and back to string to remove trailing decimals
    n = parseFloat(n);
    n = String(n);
  }
  return n;
};
