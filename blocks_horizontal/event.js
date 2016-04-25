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
 * @fileoverview Control blocks for Scratch (Horizontal)
 * @author ascii@media.mit.edu <Andrew Sliwinski>
 */
'use strict';

goog.provide('Blockly.Blocks.event');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

Blockly.Blocks['event_whenflagclicked'] = {
  /**
   * Block for when flag clicked.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "event_whenflagclicked",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/event_whenflagclicked.svg",
          "width": 40,
          "height": 40,
          "alt": "flag",
          "flip_rtl": true
        }
      ],
      "inputsInline": true,
      "nextStatement": null,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};

Blockly.Blocks['dropdown_whenbroadcast'] = {
  /**
   * Block for broadcast dropdown (used for shadow).
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu([
            {type: 'placeholder', width: 50, height: 50},
            {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/LetterGet_Blue.svg',
              value: 'blue', width: 50, height: 50, alt: 'Blue'},
            {type: 'placeholder', width: 50, height: 50},
            {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/LetterGet_Green.svg',
              value: 'green', width: 50, height: 50, alt: 'Green'},
            {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/LetterGet_Orange.svg',
              value: 'orange', width: 50, height: 50, alt: 'Orange'},
            {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/LetterGet_Purple.svg',
              value: 'purple', width: 50, height: 50, alt: 'Purple'},
            {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/LetterGet_Red.svg',
              value: 'red', width: 50, height: 50, alt: 'Red'},
            {type: 'placeholder', width: 50, height: 50},
            {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/LetterGet_Yellow.svg',
              value: 'yellow', width: 50, height: 50, alt: 'Yellow'}
        ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.event.primary,
      Blockly.Colours.event.secondary,
      Blockly.Colours.event.tertiary
    );
  }
};

Blockly.Blocks['event_whenbroadcastreceived'] = {
  /**
   * Block for when broadcast received.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "event_whenbroadcastreceived",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/event_whenbroadcastreceived.svg",
          "width": 40,
          "height": 40,
          "alt": "flag",
          "flip_rtl": true
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "nextStatement": null,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};

Blockly.Blocks['event_broadcast'] = {
  /**
   * Block to send a broadcast.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "event_broadcast",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/event_broadcast.svg",
          "width": 40,
          "height": 40,
          "alt": "Broadcast"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};

Blockly.Blocks['event_broadcast_text'] = {
  /**
   * Block to send a broadcast, with a text-box for testing fields.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "event_broadcast",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/event_broadcast.svg",
          "width": 40,
          "height": 40,
          "alt": "Broadcast"
        },
        {
          "type": "input_value",
          "name": "STRING"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};
