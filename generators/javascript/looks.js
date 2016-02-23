/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating JavaScript for looks blocks.
 * @author rschamp@media.mit.edu (Ray Schamp)
 */
'use strict';

goog.provide('Blockly.JavaScript.looks');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['looks_say'] = function(block) {
  // Say something.
  var message = Blockly.JavaScript.valueToCode(block, 'MESSAGE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

  var code = '';
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'message', Blockly.Variables.NAME_TYPE);
  code += 'console.log(' + message + ');\n';
  return code;
};
