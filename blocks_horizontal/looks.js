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
 * @fileoverview Looks blocks for Scratch (Horizontal)
 * @author rschamp@media.mit.edu <Ray Schamp>
 */
'use strict';

goog.provide('Blockly.Blocks.looks');

goog.require('Blockly.Blocks');

Blockly.Blocks['looks_say'] = {
  /**
   * Block to say something.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "looks_say",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/looks_say.svg",
          "width": 40,
          "height": 40,
          "alt": "say"
        },
        {
          "type": "input_value",
          "name": "MESSAGE",
          "check": "String"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": '#6971E7',
      "tooltip": ""
    });

    this.setHelpUrl(function () {
        return 'halp me plz. k thx bye.';
    });
  }
};
