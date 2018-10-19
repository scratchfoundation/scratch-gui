/**
 * Define Ruby with Operators Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.operator_add = function (block) {
        const order = Blockly.Ruby.ORDER_ADDITIVE;
        const num1 = Blockly.Ruby.valueToCode(block, 'NUM1', order) || '0';
        const num2 = Blockly.Ruby.valueToCode(block, 'NUM2', order) || '0';
        return [`${num1} + ${num2}`, order];
    };

    Blockly.Ruby.operator_subtract = function (block) {
        const order = Blockly.Ruby.ORDER_ADDITIVE;
        const num1 = Blockly.Ruby.valueToCode(block, 'NUM1', order) || '0';
        const num2 = Blockly.Ruby.valueToCode(block, 'NUM2', order) || '0';
        return [`${num1} - ${num2}`, Blockly.Ruby.ORDER_ADDITIVE];
    };

    Blockly.Ruby.operator_multiply = function (block) {
        const order = Blockly.Ruby.ORDER_MULTIPLICATIVE;
        const num1 = Blockly.Ruby.valueToCode(block, 'NUM1', order) || '0';
        const num2 = Blockly.Ruby.valueToCode(block, 'NUM2', order) || '0';
        return [`${num1} * ${num2}`, order];
    };

    Blockly.Ruby.operator_divide = function (block) {
        const order = Blockly.Ruby.ORDER_MULTIPLICATIVE;
        const num1 = Blockly.Ruby.valueToCode(block, 'NUM1', order) || '0';
        const num2 = Blockly.Ruby.valueToCode(block, 'NUM2', order) || '1';
        return [`${num1} / ${num2}`, order];
    };

    Blockly.Ruby.operator_random = function (block) {
        const fromNum = Blockly.Ruby.valueToCode(block, 'FROM', Blockly.Ruby.ORDER_RANGE) || '0';
        const toNum = Blockly.Ruby.valueToCode(block, 'TO', Blockly.Ruby.ORDER_RANGE) || '0';
        return [`rand(${fromNum}..${toNum})`, Blockly.Ruby.ORDER_FUNCTION_CALL];
    };

    Blockly.Ruby.operator_gt = function (block) {
        const order = Blockly.Ruby.ORDER_RELATIONAL;
        const operand1 = Blockly.Ruby.valueToCode(block, 'OPERAND1', order) || '0';
        const operand2 = Blockly.Ruby.valueToCode(block, 'OPERAND2', order) || '0';
        return [`Cast.compare(${operand1}, ${operand2}) > 0`, order];
    };

    Blockly.Ruby.operator_lt = function (block) {
        const order = Blockly.Ruby.ORDER_RELATIONAL;
        const operand1 = Blockly.Ruby.valueToCode(block, 'OPERAND1', order) || '0';
        const operand2 = Blockly.Ruby.valueToCode(block, 'OPERAND2', order) || '0';
        return [`Cast.compare(${operand1}, ${operand2}) < 0`, order];
    };

    Blockly.Ruby.operator_equals = function (block) {
        const order = Blockly.Ruby.ORDER_EQUALS;
        const operand1 = Blockly.Ruby.valueToCode(block, 'OPERAND1', order) || '0';
        const operand2 = Blockly.Ruby.valueToCode(block, 'OPERAND2', order) || '0';
        return [`Cast.compare(${operand1}, ${operand2}) == 0`, order];
    };

    Blockly.Ruby.operator_and = function (block) {
        const order = Blockly.Ruby.ORDER_LOGICAL_AND;
        const operand1 = Blockly.Ruby.valueToCode(block, 'OPERAND1', order) || 'false';
        const operand2 = Blockly.Ruby.valueToCode(block, 'OPERAND2', order) || 'false';
        return [`${operand1} && ${operand2}`, order];
    };

    Blockly.Ruby.operator_or = function (block) {
        const order = Blockly.Ruby.ORDER_LOGICAL_OR;
        const operand1 = Blockly.Ruby.valueToCode(block, 'OPERAND1', order) || 'false';
        const operand2 = Blockly.Ruby.valueToCode(block, 'OPERAND2', order) || 'false';
        return [`${operand1} || ${operand2}`, order];
    };

    Blockly.Ruby.operator_not = function (block) {
        const order = Blockly.Ruby.ORDER_UNARY_SIGN;
        const operand = Blockly.Ruby.valueToCode(block, 'OPERAND', order) || 'false';
        return [`!${operand}`, order];
    };

    Blockly.Ruby.operator_join = function (block) {
        const order = Blockly.Ruby.ORDER_ADDITIVE;
        const rightStr = Blockly.Ruby.valueToCode(block, 'STRING1', order) || Blockly.Ruby.quote_('');
        const leftStr = Blockly.Ruby.valueToCode(block, 'STRING2', order) || Blockly.Ruby.quote_('');
        return [`${rightStr} + ${leftStr}`, order];
    };

    Blockly.Ruby.operator_letter_of = function (block) {
        const order = Blockly.Ruby.ORDER_FUNCTION_CALL;
        const str = Blockly.Ruby.valueToCode(block, 'STRING', order) || Blockly.Ruby.quote_('');
        const letter = Blockly.Ruby.valueToCode(block, 'LETTER', Blockly.Ruby.ORDER_INDEX) || '0';
        return [`${str}[${letter}]`, order];
    };

    Blockly.Ruby.operator_length = function (block) {
        const order = Blockly.Ruby.ORDER_FUNCTION_CALL;
        const str = Blockly.Ruby.valueToCode(block, 'STRING', order) || Blockly.Ruby.quote_('');
        return [`${str}.length`, order];
    };

    Blockly.Ruby.operator_contains = function (block) {
        const str1 = Blockly.Ruby.valueToCode(block, 'STRING1', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        const str2 = Blockly.Ruby.valueToCode(block, 'STRING2', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        return [`${str1}.include?(${str2})`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_mod = function (block) {
        const order = Blockly.Ruby.ORDER_MULTIPLICATIVE;
        const num1 = Blockly.Ruby.valueToCode(block, 'NUM1', order) || '0';
        const num2 = Blockly.Ruby.valueToCode(block, 'NUM2', order) || '0';
        return [`${num1} % ${num2}`, order];
    };

    Blockly.Ruby.operator_round = function (block) {
        const order = Blockly.Ruby.ORDER_FUNCTION_CALL;
        const num = Blockly.Ruby.valueToCode(block, 'NUM', order) || '0';
        return [`${num}.round`, order];
    };

    Blockly.Ruby.operator_mathop = function (block) {
        const order = Blockly.Ruby.ORDER_FUNCTION_CALL;
        const num = Blockly.Ruby.valueToCode(block, 'NUM', Blockly.Ruby.ORDER_NONE) || '0';
        const operator = block.getFieldValue('OPERATOR') || null;
        switch (operator) {
        case 'abs':
            return [`${num}.abs`, order];
        case 'floor':
            return [`${num}.floor`, order];
        case 'ceiling':
            return [`${num}.ceil`, order];
        case 'sqrt':
            return [`Math.sqrt(${num})`, order];
        case 'sin':
            return [`Math.sin(${num})`, order];
        case 'cos':
            return [`Math.cos(${num})`, order];
        case 'tan':
            return [`Math.tan(${num})`, order];
        case 'asin':
            return [`Math.asin(${num})`, order];
        case 'acos':
            return [`Math.acos(${num})`, order];
        case 'atan':
            return [`Math.atan(${num})`, order];
        case 'ln':
            return [`Math.log(${num})`, order];
        case 'log':
            return [`Math.log10(${num})`, order];
        case 'e ^':
            return [`Math::E ** ${num}`, order];
        case '10 ^':
            return [`10 ** ${num}`, order];
        default:
            return [null, order];
        }
    };

    return Blockly;
}
