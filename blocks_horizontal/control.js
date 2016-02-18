/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 MIT
 * https://github.com/lkjashdflkjahsdf
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

goog.provide('Blockly.Blocks.control');

goog.require('Blockly.Blocks');

Blockly.Blocks['control_repeat'] = {
  /**
   * Block for repeat n times (external number).
   * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#so57n9
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_repeat",
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_statement",
          "name": "DO"
        },
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/control_forever.svg",
          "width": 40,
          "height": 40,
          "alt": "*"
        },
        {
          "type": "input_value",
          "name": "TIMES",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#F2B827',
      "tooltip": "",
      "helpUrl": "http://www.example.com/"
    });

    this.setHelpUrl(function () {
        return 'halp me plz. k thx bye.';
    });
  }
};

Blockly.Blocks['control_forever'] = {
  /**
   * Block for repeat n times (external number).
   * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5eke39
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_forever",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "input_statement",
          "name": "NAME"
        },
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/control_forever.svg",
          "width": 40,
          "height": 40,
          "alt": "*"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "colour": '#F2B827',
      "tooltip": ""
    });

    this.setHelpUrl(function () {
        return 'halp me plz. k thx bye.';
    });
  }
};
