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

Blockly.Blocks['event_whenbroadcastreceived'] = {
  /**
   * Block for when broadcast received.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "event_whenbroadcastreceived",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/event_whenbroadcastreceived.svg",
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
