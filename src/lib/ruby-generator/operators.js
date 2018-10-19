/**
 * Define Ruby with Operators Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.operator_add = function (block) {
        const num1 = Blockly.Ruby.valueToCode(block, 'NUM1', Blockly.Ruby.ORDER_NONE) || '0';
        const num2 = Blockly.Ruby.valueToCode(block, 'NUM2', Blockly.Ruby.ORDER_NONE) || '0';
        return [`${num1} + ${num2}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_subtract = function (block) {
        const num1 = Blockly.Ruby.valueToCode(block, 'NUM1', Blockly.Ruby.ORDER_NONE) || '0';
        const num2 = Blockly.Ruby.valueToCode(block, 'NUM2', Blockly.Ruby.ORDER_NONE) || '0';
        return [`${num1} - ${num2}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_multiply = function (block) {
        const num1 = Blockly.Ruby.valueToCode(block, 'NUM1', Blockly.Ruby.ORDER_NONE) || '0';
        const num2 = Blockly.Ruby.valueToCode(block, 'NUM2', Blockly.Ruby.ORDER_NONE) || '0';
        return [`${num1} * ${num2}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_divide = function (block) {
        const num1 = Blockly.Ruby.valueToCode(block, 'NUM1', Blockly.Ruby.ORDER_NONE) || '0';
        const num2 = Blockly.Ruby.valueToCode(block, 'NUM2', Blockly.Ruby.ORDER_NONE) || '1';
        return [`${num1} / ${num2}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_random = function (block) {
        const fromNum = Blockly.Ruby.valueToCode(block, 'FROM', Blockly.Ruby.ORDER_NONE) || '0';
        const toNum = Blockly.Ruby.valueToCode(block, 'TO', Blockly.Ruby.ORDER_NONE) || '0';
        return [`rand(${fromNum}..${toNum})`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_gt = function (block) {
        const operand1 = Blockly.Ruby.valueToCode(block, 'OPERAND1', Blockly.Ruby.ORDER_NONE) || '0';
        const operand2 = Blockly.Ruby.valueToCode(block, 'OPERAND2', Blockly.Ruby.ORDER_NONE) || '0';
        return [`Cast.compare(${operand1}, ${operand2}) > 0`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_lt = function (block) {
        const operand1 = Blockly.Ruby.valueToCode(block, 'OPERAND1', Blockly.Ruby.ORDER_NONE) || '0';
        const operand2 = Blockly.Ruby.valueToCode(block, 'OPERAND2', Blockly.Ruby.ORDER_NONE) || '0';
        return [`Cast.compare(${operand1}, ${operand2}) < 0`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_equals = function (block) {
        const operand1 = Blockly.Ruby.valueToCode(block, 'OPERAND1', Blockly.Ruby.ORDER_NONE) || '0';
        const operand2 = Blockly.Ruby.valueToCode(block, 'OPERAND2', Blockly.Ruby.ORDER_NONE) || '0';
        return [`Cast.compare(${operand1}, ${operand2}) == 0`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_and = function (block) {
        const operand1 = Blockly.Ruby.valueToCode(block, 'OPERAND1', Blockly.Ruby.ORDER_NONE) || 'false';
        const operand2 = Blockly.Ruby.valueToCode(block, 'OPERAND2', Blockly.Ruby.ORDER_NONE) || 'false';
        return [`${operand1} && ${operand2}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_or = function (block) {
        const operand1 = Blockly.Ruby.valueToCode(block, 'OPERAND1', Blockly.Ruby.ORDER_NONE) || 'false';
        const operand2 = Blockly.Ruby.valueToCode(block, 'OPERAND2', Blockly.Ruby.ORDER_NONE) || 'false';
        return [`${operand1} || ${operand2}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_not = function (block) {
        const operand = Blockly.Ruby.valueToCode(block, 'OPERAND', Blockly.Ruby.ORDER_NONE) || 'false';
        return [`!${operand}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_join = function (block) {
        const rightStr = Blockly.Ruby.valueToCode(block, 'STRING1', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        const leftStr = Blockly.Ruby.valueToCode(block, 'STRING2', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        return [`${rightStr} + ${leftStr}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_letter_of = function (block) {
        const str = Blockly.Ruby.valueToCode(block, 'STRING', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        const letter = Blockly.Ruby.valueToCode(block, 'LETTER', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        return [`${str}[${letter}]`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_length = function (block) {
        const str = Blockly.Ruby.valueToCode(block, 'STRING', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        return [`${str}.length`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_contains = function (block) {
        const str1 = Blockly.Ruby.valueToCode(block, 'STRING1', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        const str2 = Blockly.Ruby.valueToCode(block, 'STRING2', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        return [`${str1}.include?(${str2})`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_mod = function (block) {
        const num1 = Blockly.Ruby.valueToCode(block, 'NUM1', Blockly.Ruby.ORDER_NONE) || '0';
        const num2 = Blockly.Ruby.valueToCode(block, 'NUM2', Blockly.Ruby.ORDER_NONE) || '0';
        return [`${num1} % ${num2}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_round = function (block) {
        const num = Blockly.Ruby.valueToCode(block, 'NUM', Blockly.Ruby.ORDER_NONE) || '0';
        return [`${num}.round`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.operator_mathop = function (block) {
        const num = Blockly.Ruby.valueToCode(block, 'NUM', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        const operator = block.getFieldValue('OPERATOR') || null;
        switch (operator) {
        case 'abs':
            return [`${num}.abs`, Blockly.Ruby.ORDER_ATOMIC];
        case 'floor':
            return [`${num}.floor`, Blockly.Ruby.ORDER_ATOMIC];
        case 'ceiling':
            return [`${num}.ceil`, Blockly.Ruby.ORDER_ATOMIC];
        case 'sqrt':
            return [`Math.sqrt(${num})`, Blockly.Ruby.ORDER_ATOMIC];
        case 'sin':
            return [`Math.sin(${num})`, Blockly.Ruby.ORDER_ATOMIC];
        case 'cos':
            return [`Math.cos(${num})`, Blockly.Ruby.ORDER_ATOMIC];
        case 'tan':
            return [`Math.tan(${num})`, Blockly.Ruby.ORDER_ATOMIC];
        case 'asin':
            return [`Math.asin(${num})`, Blockly.Ruby.ORDER_ATOMIC];
        case 'acos':
            return [`Math.acos(${num})`, Blockly.Ruby.ORDER_ATOMIC];
        case 'atan':
            return [`Math.atan(${num})`, Blockly.Ruby.ORDER_ATOMIC];
        case 'ln':
            return [`Math.log(${num})`, Blockly.Ruby.ORDER_ATOMIC];
        case 'log':
            return [`Math.log10(${num})`, Blockly.Ruby.ORDER_ATOMIC];
        case 'e ^':
            return [`Math::E**${num}`, Blockly.Ruby.ORDER_ATOMIC];
        case '10 ^':
            return [`10**${num}`, Blockly.Ruby.ORDER_ATOMIC];
        default:
            return [null, Blockly.Ruby.ORDER_ATOMIC];
        }
    };

    return Blockly;
}
