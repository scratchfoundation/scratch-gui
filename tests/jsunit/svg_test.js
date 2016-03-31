/**
 * @license
 * Blockly Tests
 *
 * Copyright 2016 Google Inc.
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
'use strict';

var svgTest_workspace;

function svgTest_setUp() {
  svgTest_workspace = Blockly.inject('blocklyDiv',
      {toolbox: document.getElementById('toolbox')});
}

function svgTest_tearDown() {
  svgTest_workspace.dispose();
  svgTest_workspace = null;
}

/**
 * Check that the clicking the block shows the editor when the block has one
 * field.
 */
function test_clickElementWithOneField() {
  svgTest_setUp();

  try {
    Blockly.Blocks['one_field_block'] = {
      init: function() {
        this.jsonInit({
          'message0': '%1',
          'args0': [
            {
              'type': 'field_input',
              'name': 'FIELD'
            }
          ]
        });
      }
    };

    var block = svgTest_workspace.newBlock('one_field_block');
    block.initSvg();
    block.render(false);

    var showEditorCalled = false;
    block.getField('FIELD').showEditor_ = function() {
      showEditorCalled = true;
    };

    block.getSvgRoot().dispatchEvent(new Event('mouseup'));
    assertTrue('showEditor_() not called', showEditorCalled);
  } finally {
    svgTest_tearDown();
  }
}

/**
 * Check that the clicking the field shows the editor when the block has more
 * than one field.
 */
function test_clickElementWithTwoFields() {
  svgTest_setUp();

  try {
    Blockly.Blocks['two_field_block'] = {
      init: function() {
        this.jsonInit({
          'message0': 'text_field %1',
          'args0': [
            {
              'type': 'field_input',
              'name': 'FIELD'
            }
          ]
        });
      }
    };

    var block = svgTest_workspace.newBlock('two_field_block');
    block.initSvg();
    block.render(false);

    var showEditorCalled = false;
    block.getField('FIELD').showEditor_ = function() {
      showEditorCalled = true;
    };

    block.getField('FIELD').getSvgRoot().dispatchEvent(new Event('mouseup'));
    assertTrue('showEditor_() not called', showEditorCalled);
  } finally {
    svgTest_tearDown();
  }
}
