/**
 * Define Ruby with Math Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {

    Blockly.Ruby.math_number = function (block) {
        let code = parseFloat(block.getFieldValue('NUM'));
        let order;
        if (code === Infinity) {
            code = 'float("inf")'; order = Blockly.Ruby.ORDER_FUNCTION_CALL;
        } else if (code === -Infinity) {
            code = '-float("inf")'; order = Blockly.Ruby.ORDER_UNARY_SIGN;
        } else {
            order = code < 0 ? Blockly.Ruby.ORDER_UNARY_SIGN : Blockly.Ruby.ORDER_ATOMIC;
        }
        return [code, order];
    };

    return Blockly;
}
