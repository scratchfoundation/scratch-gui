/**
 * Define Ruby with Text Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.text = function (block) {
        const code = Blockly.Ruby.quote_(block.getFieldValue('TEXT'));
        return [code, Blockly.Ruby.ORDER_ATOMIC];
    };

    return Blockly;
}
