/**
 * Define Ruby code generator for Operators Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.operator_add = function (block) {
        const order = Generator.ORDER_ADDITIVE;
        const num1 = Generator.valueToCode(block, 'NUM1', order) || 0;
        const num2 = Generator.valueToCode(block, 'NUM2', order) || 0;
        return [`${num1} + ${num2}`, order];
    };

    Generator.operator_subtract = function (block) {
        const order = Generator.ORDER_ADDITIVE;
        const num1 = Generator.valueToCode(block, 'NUM1', order) || 0;
        const num2 = Generator.valueToCode(block, 'NUM2', order) || 0;
        return [`${num1} - ${num2}`, Generator.ORDER_ADDITIVE];
    };

    Generator.operator_multiply = function (block) {
        const order = Generator.ORDER_MULTIPLICATIVE;
        const num1 = Generator.valueToCode(block, 'NUM1', order) || 0;
        const num2 = Generator.valueToCode(block, 'NUM2', order) || 0;
        return [`${num1} * ${num2}`, order];
    };

    Generator.operator_divide = function (block) {
        const order = Generator.ORDER_MULTIPLICATIVE;
        const num1 = Generator.valueToCode(block, 'NUM1', order) || 0;
        let num2 = Generator.valueToCode(block, 'NUM2', order) || 0.0;
        // guard 0 deviding.
        if (Number(num2) === 0) {
            num2 = '0.0';
        }
        return [`${num1} / ${num2}`, order];
    };

    Generator.operator_random = function (block) {
        const fromNum = Generator.valueToCode(block, 'FROM', Generator.ORDER_RANGE) || 1;
        const toNum = Generator.valueToCode(block, 'TO', Generator.ORDER_RANGE) || 10;
        return [`rand(${fromNum}..${toNum})`, Generator.ORDER_FUNCTION_CALL];
    };

    Generator.operator_gt = function (block) {
        const order = Generator.ORDER_RELATIONAL;
        const operand1 = Generator.valueToCode(block, 'OPERAND1', order) || 0;
        const operand2 = Generator.valueToCode(block, 'OPERAND2', order) || 0;
        return [`${Generator.nosToCode(operand1)} > ${Generator.nosToCode(operand2)}`, order];
    };

    Generator.operator_lt = function (block) {
        const order = Generator.ORDER_RELATIONAL;
        const operand1 = Generator.valueToCode(block, 'OPERAND1', order) || 0;
        const operand2 = Generator.valueToCode(block, 'OPERAND2', order) || 0;
        return [`${Generator.nosToCode(operand1)} < ${Generator.nosToCode(operand2)}`, order];
    };

    Generator.operator_equals = function (block) {
        const order = Generator.ORDER_EQUALS;
        const operand1 = Generator.valueToCode(block, 'OPERAND1', order) || 0;
        const operand2 = Generator.valueToCode(block, 'OPERAND2', order) || 0;
        return [`${Generator.nosToCode(operand1)} == ${Generator.nosToCode(operand2)}`, order];
    };

    Generator.operator_and = function (block) {
        const order = Generator.ORDER_LOGICAL_AND;
        const operand1 = Generator.valueToCode(block, 'OPERAND1', order) || 'false';
        const operand2 = Generator.valueToCode(block, 'OPERAND2', order) || 'false';
        return [`${operand1} && ${operand2}`, order];
    };

    Generator.operator_or = function (block) {
        const order = Generator.ORDER_LOGICAL_OR;
        const operand1 = Generator.valueToCode(block, 'OPERAND1', order) || 'false';
        const operand2 = Generator.valueToCode(block, 'OPERAND2', order) || 'false';
        return [`${operand1} || ${operand2}`, order];
    };

    Generator.operator_not = function (block) {
        const order = Generator.ORDER_UNARY_SIGN;
        const operand = Generator.valueToCode(block, 'OPERAND', order) || 'false';
        return [`!${operand}`, order];
    };

    Generator.operator_join = function (block) {
        const order = Generator.ORDER_ADDITIVE;
        const rightStr = Generator.valueToCode(block, 'STRING1', order) || Generator.quote_('');
        const leftStr = Generator.valueToCode(block, 'STRING2', order) || Generator.quote_('');
        return [`${rightStr} + ${leftStr}`, order];
    };

    Generator.operator_letter_of = function (block) {
        const order = Generator.ORDER_FUNCTION_CALL;
        const str = Generator.valueToCode(block, 'STRING', order) || Generator.quote_('');
        const letter = Generator.valueToCode(block, 'LETTER', Generator.ORDER_INDEX) - 1 || '0';
        return [`${str}[${letter}]`, order];
    };

    Generator.operator_length = function (block) {
        const order = Generator.ORDER_FUNCTION_CALL;
        const str = Generator.valueToCode(block, 'STRING', order) || Generator.quote_('');
        return [`${str}.length`, order];
    };

    Generator.operator_contains = function (block) {
        const str1 = Generator.valueToCode(block, 'STRING1', Generator.ORDER_NONE) || Generator.quote_('');
        const str2 = Generator.valueToCode(block, 'STRING2', Generator.ORDER_NONE) || Generator.quote_('');
        return [`${str1}.include?(${str2})`, Generator.ORDER_ATOMIC];
    };

    Generator.operator_mod = function (block) {
        const order = Generator.ORDER_MULTIPLICATIVE;
        const num1 = Generator.valueToCode(block, 'NUM1', order) || '0';
        const num2 = Generator.valueToCode(block, 'NUM2', order) || '0';
        return [`${num1} % ${num2}`, order];
    };

    Generator.operator_round = function (block) {
        const order = Generator.ORDER_FUNCTION_CALL;
        const num = Generator.valueToCode(block, 'NUM', order) || '0';
        return [`${num}.round`, order];
    };

    Generator.operator_mathop = function (block) {
        const order = Generator.ORDER_FUNCTION_CALL;
        const num = Generator.valueToCode(block, 'NUM', Generator.ORDER_NONE) || '0';
        const operator = Generator.getFieldValue(block, 'OPERATOR') || null;
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

    return Generator;
}
