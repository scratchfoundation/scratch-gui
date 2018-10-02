/**
 * Define Ruby with Event Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.event_whenflagclicked = function (block) {
        // TODO: インデントを上げること
        return `${this.spriteName}.when(:flag_clicked) do\n`;
    };

    return Blockly;
}
