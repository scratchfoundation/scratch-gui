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
 * @fileoverview Text input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldTextInput');

goog.require('Blockly.BlockSvg.render');
goog.require('Blockly.Colours');
goog.require('Blockly.Field');
goog.require('Blockly.Msg');
goog.require('Blockly.utils');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.userAgent');


/**
 * Class for an editable text field.
 * @param {string} text The initial content of the field.
 * @param {Function=} opt_validator An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns either the accepted text, a replacement
 *     text, or null to abort the change.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldTextInput = function(text, opt_validator) {
  Blockly.FieldTextInput.superClass_.constructor.call(this, text,
      opt_validator);
};
goog.inherits(Blockly.FieldTextInput, Blockly.Field);

/**
 * Point size of text before animation. Must match size in CSS.
 */
Blockly.FieldTextInput.FONTSIZE_INITIAL = 12;

/**
 * Point size of text after animation.
 */
Blockly.FieldTextInput.FONTSIZE_FINAL = 14;

/**
 * Length of animations in seconds.
 */
Blockly.FieldTextInput.ANIMATION_TIME = 0.25;

/**
 * Padding to use for text measurement for the field during editing, in px.
 */
Blockly.FieldTextInput.TEXT_MEASURE_PADDING_MAGIC = 35;

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldTextInput.prototype.CURSOR = 'text';

/**
 * Allow browser to spellcheck this field.
 * @private
 */
Blockly.FieldTextInput.prototype.spellcheck_ = true;

/**
 * Close the input widget if this input is being deleted.
 */
Blockly.FieldTextInput.prototype.dispose = function() {
  Blockly.WidgetDiv.hideIfOwner(this);
  Blockly.FieldTextInput.superClass_.dispose.call(this);
};

/**
 * Set the text in this field.
 * @param {?string} text New text.
 * @override
 */
Blockly.FieldTextInput.prototype.setValue = function(text) {
  if (text === null) {
    return;  // No change if null.
  }
  if (this.sourceBlock_ && this.validator_) {
    var validated = this.validator_(text);
    // If the new text is invalid, validation returns null.
    // In this case we still want to display the illegal result.
    if (validated !== null && validated !== undefined) {
      text = validated;
    }
  }
  Blockly.Field.prototype.setValue.call(this, text);
};

/**
 * Set whether this field is spellchecked by the browser.
 * @param {boolean} check True if checked.
 */
Blockly.FieldTextInput.prototype.setSpellcheck = function(check) {
  this.spellcheck_ = check;
};

/**
 * Show the inline free-text editor on top of the text.
 * @param {boolean=} opt_quietInput True if editor should be created without
 *     focus.  Defaults to false.
 * @private
 */
Blockly.FieldTextInput.prototype.showEditor_ = function(opt_quietInput) {
  this.workspace_ = this.sourceBlock_.workspace;
  var quietInput = opt_quietInput || false;
  if (!quietInput && (goog.userAgent.MOBILE || goog.userAgent.ANDROID ||
                      goog.userAgent.IPAD)) {
    // Mobile browsers have issues with in-line textareas (focus & keyboards).
    var newValue = window.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, this.text_);
    if (this.sourceBlock_ && this.validator_) {
      var override = this.validator_(newValue);
      if (override !== undefined) {
        newValue = override;
      }
    }
    this.setValue(newValue);
    return;
  }

  Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL,
      this.widgetDispose_(), this.widgetDisposeAnimationFinished_(),
      Blockly.FieldTextInput.ANIMATION_TIME);
  var div = Blockly.WidgetDiv.DIV;
  // Apply text-input-specific fixed CSS
  div.className += ' fieldTextInput';
  // Create the input.
  var htmlInput = goog.dom.createDom('input', 'blocklyHtmlInput');
  htmlInput.setAttribute('spellcheck', this.spellcheck_);
  /** @type {!HTMLInputElement} */
  Blockly.FieldTextInput.htmlInput_ = htmlInput;
  div.appendChild(htmlInput);

  htmlInput.value = htmlInput.defaultValue = this.text_;
  htmlInput.oldValue_ = null;
  this.validate_();
  this.resizeEditor_();
  if (!quietInput) {
    htmlInput.focus();
    htmlInput.select();
  }

  // Bind to keydown -- trap Enter without IME and Esc to hide.
  htmlInput.onKeyDownWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keydown', this, this.onHtmlInputKeyDown_);
  // Bind to keyup -- trap Enter; resize after every keystroke.
  htmlInput.onKeyUpWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keyup', this, this.onHtmlInputChange_);
  // Bind to keyPress -- repeatedly resize when holding down a key.
  htmlInput.onKeyPressWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keypress', this, this.onHtmlInputChange_);
  htmlInput.onWorkspaceChangeWrapper_ = this.resizeEditor_.bind(this);
  this.workspace_.addChangeListener(htmlInput.onWorkspaceChangeWrapper_);

  // Add animation transition properties
  div.style.transition = 'padding ' + Blockly.FieldTextInput.ANIMATION_TIME + 's,' +
    'width ' + Blockly.FieldTextInput.ANIMATION_TIME + 's,' +
    'height ' + Blockly.FieldTextInput.ANIMATION_TIME + 's,' +
    'margin-left ' + Blockly.FieldTextInput.ANIMATION_TIME + 's,' +
    'box-shadow ' + Blockly.FieldTextInput.ANIMATION_TIME + 's';
  htmlInput.style.transition = 'font-size ' + Blockly.FieldTextInput.ANIMATION_TIME + 's';
  // The animated properties themselves
  htmlInput.style.fontSize = Blockly.FieldTextInput.FONTSIZE_FINAL + 'pt';
  div.style.boxShadow = '0px 0px 0px 4px ' + Blockly.Colours.fieldShadow;
};

/**
 * Handle key down to the editor.
 * @param {!Event} e Keyboard event.
 * @private
 */
Blockly.FieldTextInput.prototype.onHtmlInputKeyDown_ = function(e) {
  var htmlInput = Blockly.FieldTextInput.htmlInput_;
  var tabKey = 9, enterKey = 13, escKey = 27;
  if (e.keyCode == enterKey) {
    Blockly.WidgetDiv.hide();
  } else if (e.keyCode == escKey) {
    htmlInput.value = htmlInput.defaultValue;
    Blockly.WidgetDiv.hide();
  } else if (e.keyCode == tabKey) {
    Blockly.WidgetDiv.hide();
    this.sourceBlock_.tab(this, !e.shiftKey);
    e.preventDefault();
  }
};

/**
 * Handle a change to the editor.
 * @param {!Event} e Keyboard event.
 * @private
 */
Blockly.FieldTextInput.prototype.onHtmlInputChange_ = function(e) {
  var htmlInput = Blockly.FieldTextInput.htmlInput_;
  // Update source block.
  var text = htmlInput.value;
  if (text !== htmlInput.oldValue_) {
    htmlInput.oldValue_ = text;
    this.setValue(text);
    this.validate_();
  } else if (goog.userAgent.WEBKIT) {
    // Cursor key.  Render the source block to show the caret moving.
    // Chrome only (version 26, OS X).
    this.sourceBlock_.render();
  }
  this.resizeEditor_();
};

/**
 * Check to see if the contents of the editor validates.
 * Style the editor accordingly.
 * @private
 */
Blockly.FieldTextInput.prototype.validate_ = function() {
  var valid = true;
  goog.asserts.assertObject(Blockly.FieldTextInput.htmlInput_);
  var htmlInput = Blockly.FieldTextInput.htmlInput_;
  if (this.sourceBlock_ && this.validator_) {
    valid = this.validator_(htmlInput.value);
  }
  if (valid === null) {
    Blockly.addClass_(htmlInput, 'blocklyInvalidInput');
  } else {
    Blockly.removeClass_(htmlInput, 'blocklyInvalidInput');
  }
};

/**
 * Resize the editor and the underlying block to fit the text.
 * @private
 */
Blockly.FieldTextInput.prototype.resizeEditor_ = function() {
  var scale = this.sourceBlock_.workspace.scale;
  var div = Blockly.WidgetDiv.DIV;
  // Resize the box based on the measured width of the text, pre-truncation
  var textWidth = Blockly.measureText(
    Blockly.FieldTextInput.htmlInput_.style.fontSize,
    Blockly.FieldTextInput.htmlInput_.style.fontFamily,
    Blockly.FieldTextInput.htmlInput_.value
  );
  // Size drawn in the canvas needs padding and scaling
  textWidth += Blockly.FieldTextInput.TEXT_MEASURE_PADDING_MAGIC;
  textWidth *= scale;
  // The width must be at least FIELD_WIDTH and at most FIELD_WIDTH_MAX_EDIT
  var width = Math.max(textWidth, Blockly.BlockSvg.FIELD_WIDTH_MIN_EDIT * scale);
  width = Math.min(width, Blockly.BlockSvg.FIELD_WIDTH_MAX_EDIT * scale);
  // Add 1px to width and height to account for border (pre-scale)
  div.style.width = (width / scale + 1) + 'px';
  div.style.height = (Blockly.BlockSvg.FIELD_HEIGHT_MAX_EDIT + 1) + 'px';
  div.style.transform = 'scale(' + scale + ')';

  // Use margin-left to animate repositioning of the box (value is unscaled).
  // This is the difference between the default position and the positioning
  // after growing the box.
  var initialWidth = Blockly.BlockSvg.FIELD_WIDTH * scale;
  var finalWidth = width;
  div.style.marginLeft = -0.5 * (finalWidth - initialWidth) + 'px';

  // Add 0.5px to account for slight difference between SVG and CSS border
  var borderRadius = this.getBorderRadius() + 0.5;
  div.style.borderRadius = borderRadius + 'px';
  // Pull stroke colour from the existing shadow block
  var strokeColour = this.sourceBlock_.getColourTertiary();
  div.style.borderColor = strokeColour;

  var xy = this.getAbsoluteXY_();
  // Account for border width, post-scale
  xy.x -= scale / 2;
  xy.y -= scale / 2;
  // In RTL mode block fields and LTR input fields the left edge moves,
  // whereas the right edge is fixed.  Reposition the editor.
  if (this.sourceBlock_.RTL) {
    xy.x += width;
    xy.x -= div.offsetWidth;
  }
  // Shift by a few pixels to line up exactly.
  xy.y += 1 * scale;
  if (goog.userAgent.GECKO && Blockly.WidgetDiv.DIV.style.top) {
    // Firefox mis-reports the location of the border by a pixel
    // once the WidgetDiv is moved into position.
    xy.x += 2 * scale;
    xy.y += 1 * scale;
  }
  if (goog.userAgent.WEBKIT) {
    xy.x += 0.5;
    xy.y -= 1 * scale;
  }
  // Finally, set the actual style
  div.style.left = xy.x + 'px';
  div.style.top = xy.y + 'px';
};

/**
 * Determine border radius based on the type of the owning shadow block.
 * @return {Number} Border radius in px.
*/
Blockly.Field.prototype.getBorderRadius = function() {
  if (this.sourceBlock_.type === 'math_number') {
    return Blockly.BlockSvg.NUMBER_FIELD_CORNER_RADIUS;
  } else {
    return Blockly.BlockSvg.TEXT_FIELD_CORNER_RADIUS;
  }
};

/**
 * Close the editor, save the results, and start animating the disposal of elements.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldTextInput.prototype.widgetDispose_ = function() {
  var thisField = this;
  return function() {
    var div = Blockly.WidgetDiv.DIV;
    var htmlInput = Blockly.FieldTextInput.htmlInput_;
    // Save the edit (if it validates).
    var text = htmlInput.value;
    if (thisField.sourceBlock_ && thisField.validator_) {
      var text1 = thisField.validator_(text);
      if (text1 === null) {
        // Invalid edit.
        text = htmlInput.defaultValue;
      } else if (text1 !== undefined) {
        // Validation function has changed the text.
        text = text1;
      }
    }
    thisField.setValue(text);
    thisField.sourceBlock_.rendered && thisField.sourceBlock_.render();
    Blockly.unbindEvent_(htmlInput.onKeyDownWrapper_);
    Blockly.unbindEvent_(htmlInput.onKeyUpWrapper_);
    Blockly.unbindEvent_(htmlInput.onKeyPressWrapper_);
    thisField.workspace_.removeChangeListener(
        htmlInput.onWorkspaceChangeWrapper_);

    // Animation of disposal
    htmlInput.style.fontSize = Blockly.FieldTextInput.FONTSIZE_INITIAL + 'pt';
    div.style.boxShadow = '';
    div.style.width = Blockly.BlockSvg.FIELD_WIDTH + 'px';
    div.style.height = Blockly.BlockSvg.FIELD_HEIGHT + 'px';
    div.style.marginLeft = 0;
  };
};

/**
 * Final disposal of the text field's elements and properties.
 * @return {!Function} Closure to call on finish animation of the WidgetDiv.
 * @private
 */
Blockly.FieldTextInput.prototype.widgetDisposeAnimationFinished_ = function() {
  return function() {
    // Delete style properties.
    var style = Blockly.WidgetDiv.DIV.style;
    style.width = 'auto';
    style.height = 'auto';
    style.fontSize = '';
    // Reset class
    Blockly.WidgetDiv.DIV.className = 'blocklyWidgetDiv';
    // Reset transitions
    Blockly.WidgetDiv.DIV.style.transition = '';
    Blockly.FieldTextInput.htmlInput_.style.transition = '';
    Blockly.FieldTextInput.htmlInput_ = null;
  };
};

/**
 * Ensure that only a number may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid number, or null if invalid.
 */
Blockly.FieldTextInput.numberValidator = function(text) {
  if (text === null) {
    return null;
  }
  text = String(text);
  // TODO: Handle cases like 'ten', '1.203,14', etc.
  // 'O' is sometimes mistaken for '0' by inexperienced users.
  text = text.replace(/O/ig, '0');
  // Strip out thousands separators.
  text = text.replace(/,/g, '');
  var n = parseFloat(text || 0);
  return isNaN(n) ? null : String(n);
};

/**
 * Ensure that only a nonnegative integer may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid int, or null if invalid.
 */
Blockly.FieldTextInput.nonnegativeIntegerValidator = function(text) {
  var n = Blockly.FieldTextInput.numberValidator(text);
  if (n) {
    n = String(Math.max(0, Math.floor(n)));
  }
  return n;
};
