/**
 * Define Ruby with Colour Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.colour_picker = function (block) {
        const c = Blockly.Ruby.quote_(block.getFieldValue('COLOUR') || null);
        return [c, Blockly.Ruby.ORDER_ATOMIC];
    };

    return Blockly;
}
