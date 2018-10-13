/**
 * Define Ruby with Control Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.control_repeat = function (block) {
        const times = Blockly.Ruby.valueToCode(block, 'TIMES', Blockly.Ruby.ORDER_NONE) || '0';
        const branch = Blockly.Ruby.statementToCode(block, 'SUBSTACK') || '\n';

        return `${times}.times do\n${branch}end\n`;
    };

    return Blockly;
}
