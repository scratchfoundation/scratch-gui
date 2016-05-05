/**
 * @fileoverview Wedo blocks for Scratch (Horizontal)
 * @author ascii@media.mit.edu <Andrew Sliwinski>
 */
'use strict';

goog.provide('Blockly.Blocks.wedo');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

Blockly.Blocks['wedo_setcolor'] = {
  /**
   * Block to set color of LED
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "wedo_setcolor",
      "message0": "set color to ...",
      "args0": [
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Colours.looks.primary,
      "colourSecondary": Blockly.Colours.looks.secondary,
      "colourTertiary": Blockly.Colours.looks.tertiary
    });
  }
};

Blockly.Blocks['wedo_motorclockwise'] = {
  /**
   * Block to spin motor clockwise.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "wedo_motorclockwise",
      "message0": "turn motor clockwise for %1 secs",
      "args0": [
        {
          "type": "input_value",
          "name": "DURATION",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['wedo_motorcounterclockwise'] = {
  /**
   * Block to spin motor counter-clockwise.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "wedo_motorcounterclockwise",
      "message0": "turn motor counterclockwise for %1 secs",
      "args0": [
        {
          "type": "input_value",
          "name": "DURATION",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['wedo_motorspeed'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "wedo_motorspeed",
      "message0": "set motor speed to ...",
      "args0": [
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['wedo_whentilt'] = {
  /**
   * Block for when tilted.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "wedo_whentilt",
      "message0": "when tilted ...",
      "args0": [
      ],
      "inputsInline": true,
      "nextStatement": null,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};

Blockly.Blocks['wedo_whendistanceclose'] = {
  /**
   * Block for when distance sensor is close.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "wedo_whendistanceclose",
      "message0": "when distance is near",
      "args0": [
      ],
      "inputsInline": true,
      "nextStatement": null,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};
