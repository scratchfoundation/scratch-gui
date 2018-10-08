/**
 * Define Ruby with Motion Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {

    Blockly.Ruby.motion_movesteps = function (block) {
        const arg = Blockly.Ruby.valueToCode(block, 'STEPS', Blockly.Ruby.ORDER_NONE) || '0';
        return `move(${arg})\n`;
    };

    return Blockly;
}
