/**
 * Define Ruby with Event Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.event_whenflagclicked = function (block) {
        Blockly.Ruby.targetEventBlock = block;
        return `${Blockly.Ruby.spriteName()}.when(:flag_clicked) do\n`;
    };

    return Blockly;
}
