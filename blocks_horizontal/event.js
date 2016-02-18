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

goog.provide('Blockly.Blocks.event');

goog.require('Blockly.Blocks');

Blockly.Blocks['event_whenflagclicked'] = {
  /**
   * Block for repeat n times (external number).
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
          "alt": "flag"
        }
      ],
      "inputsInline": true,
      "nextStatement": null,
      "colour": '#F2EC27',
      "tooltip": "Do stuff!"
    });

    this.setHelpUrl(function () {
        return 'halp me plz. k thx bye.';
    });
  }
};
