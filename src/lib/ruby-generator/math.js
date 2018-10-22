/**
 * Define Ruby with Math Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.math_number = function (block) {
        let n = Number(block.getFieldValue('NUM'));
        if (isNaN(n)) {
            n = 0;
        }
        const order = n < 0 ? Blockly.Ruby.ORDER_UNARY_SIGN : Blockly.Ruby.ORDER_ATOMIC;
        return [n, order];
    };

    ['math_integer', 'math_whole_number', 'math_positive_number', 'math_angle'].forEach(name => {
        Blockly.Ruby[name] = Blockly.Ruby.math_number;
    });

    return Blockly;
}
