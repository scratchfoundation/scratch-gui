/* global Opal */
import _ from 'lodash';

/**
 * Operators converter
 */
const OperatorsConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if (this._isSelf(receiver) || receiver === Opal.nil) {
            switch (name) {
            case 'rand':
                if (args.length === 1 && this._isBlock(args[0]) && args[0].opcode === 'ruby_range') {
                    return this._changeBlock(args[0], 'operator_random', 'value');
                }
                break;
            }
        }

        if (!this._isVariableBlock(receiver)) {
            switch (name) {
            case '[]':
                if (this._isStringOrBlock(receiver) &&
                    args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('operator_letter_of', 'value');
                    this._addTextInput(block, 'STRING', receiver, 'apple');
                    this._addNumberInput(block, 'LETTER', 'math_number', args[0], 1);
                    return block;
                }
                break;
            case 'length':
                if (args.length === 0 && this._isStringOrBlock(receiver)) {
                    block = this._createBlock('operator_length', 'value');
                    this._addTextInput(block, 'STRING', receiver, 'apple');
                    return block;
                }
                break;
            case 'include?':
                if (args.length === 1 &&
                    this._isStringOrBlock(receiver) && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('operator_contains', 'value');
                    this._addTextInput(block, 'STRING1', receiver, 'apple');
                    this._addTextInput(block, 'STRING2', args[0], 'a');
                    return block;
                }
                break;
            }
        }

        let rh;
        if (args.length === 1) {
            if (_.isArray(args[0]) && args[0].length === 1) {
                rh = args[0][0];
            } else {
                rh = args[0];
            }
        }

        switch (name) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            if (rh) {
                if (this._isNumberOrBlock(receiver) && this._isNumberOrBlock(rh)) {
                    let opcode;
                    if (name === '+') {
                        opcode = 'operator_add';
                    } else if (name === '-') {
                        opcode = 'operator_subtract';
                    } else if (name === '*') {
                        opcode = 'operator_multiply';
                    } else if (name === '/') {
                        opcode = 'operator_divide';
                    } else {
                        opcode = 'operator_mod';
                    }
                    block = this._createBlock(opcode, 'value');
                    this._addNumberInput(block, 'NUM1', 'math_number', receiver, '');
                    this._addNumberInput(block, 'NUM2', 'math_number', rh, '');
                    return block;
                } else if (name === '+' &&
                           (this._isStringOrBlock(receiver) || this._isStringOrBlock(rh))) {
                    block = this._createBlock('operator_join', 'value');
                    this._addTextInput(
                        block, 'STRING1',
                        this._isNumber(receiver) ? receiver.toString() : receiver, 'apple'
                    );
                    this._addTextInput(block, 'STRING2', this._isNumber(rh) ? rh.toString() : rh, 'banana');
                    return block;
                }
            }
            break;
        case '>':
        case '<':
        case '==':
            if (rh) {
                let opcode;
                if (name === '>') {
                    opcode = 'operator_gt';
                } else if (name === '<') {
                    opcode = 'operator_lt';
                } else {
                    opcode = 'operator_equals';
                }
                block = this._createBlock(opcode, 'value_boolean');
                this._addTextInput(block, 'OPERAND1', this._isNumber(receiver) ? receiver.toString() : receiver, '');
                this._addTextInput(block, 'OPERAND2', this._isNumber(rh) ? rh.toString() : rh, '50');
                return block;
            }
            break;
        case '!':
            if (args.length === 0 && this._isFalseOrBooleanBlock(receiver)) {
                block = this._createBlock('operator_not', 'value_boolean');
                if (!this._isFalse(receiver)) {
                    this._addInput(
                        block,
                        'OPERAND',
                        this._createTextBlock(this._isNumber(receiver) ? receiver.toString() : receiver)
                    );
                }
                return block;
            }
            break;
        case 'round':
            if (args.length === 0 && this._isNumberOrBlock(receiver)) {
                block = this._createBlock('operator_round', 'value');
                this._addNumberInput(block, 'NUM', 'math_number', receiver, '');
                return block;
            }
            break;
        case 'abs':
        case 'floor':
        case 'ceil':
            if (args.length === 0 && this._isNumberOrBlock(receiver)) {
                let operator = name;
                if (name === 'ceil') {
                    operator = 'ceiling';
                }
                block = this._createBlock('operator_mathop', 'value');
                this._addField(block, 'OPERATOR', operator);
                this._addNumberInput(block, 'NUM', 'math_number', receiver, '');
                return block;
            }
            break;
        case 'sqrt':
        case 'sin':
        case 'cos':
        case 'tan':
        case 'asin':
        case 'acos':
        case 'atan':
        case 'log':
        case 'log10':
            if (rh &&
                this._isConst(receiver) && receiver.toString() === '::Math' &&
                this._isNumberOrBlock(rh)) {
                let operator;
                switch (name) {
                case 'log':
                    operator = 'ln';
                    break;
                case 'log10':
                    operator = 'log';
                    break;
                default:
                    operator = name;
                }
                block = this._createBlock('operator_mathop', 'value');
                this._addField(block, 'OPERATOR', operator);
                this._addNumberInput(block, 'NUM', 'math_number', rh, '');
                return block;
            }
            break;
        case '**':
            if (rh && this._isNumberOrBlock(rh)) {
                let operator;
                if (this._isConst(receiver) && receiver.toString() === '::Math::E') {
                    operator = 'e ^';
                } else if (receiver.type === 'int' && receiver.value === 10) {
                    operator = '10 ^';
                }
                if (operator) {
                    block = this._createBlock('operator_mathop', 'value');
                    this._addField(block, 'OPERATOR', operator);
                    this._addNumberInput(block, 'NUM', 'math_number', rh, '');
                    return block;
                }
            }
            break;
        }

        return null;
    },

    // eslint-disable-next-line no-unused-vars
    onAnd: function (operands) {
        const block = this._createBlock('operator_and', 'value_boolean');
        operands.forEach(o => {
            if (o) {
                o.parent = block.id;
            }
        });
        if (!this._isFalse(operands[0])) {
            this._addInput(block, 'OPERAND1', this._createTextBlock(operands[0]));
        }
        if (!this._isFalse(operands[1])) {
            this._addInput(block, 'OPERAND2', this._createTextBlock(operands[1]));
        }
        return block;
    },

    // eslint-disable-next-line no-unused-vars
    onOr: function (operands) {
        const block = this._createBlock('operator_or', 'value_boolean');
        operands.forEach(o => {
            if (o) {
                o.parent = block.id;
            }
        });
        if (!this._isFalse(operands[0])) {
            this._addInput(block, 'OPERAND1', this._createTextBlock(operands[0]));
        }
        if (!this._isFalse(operands[1])) {
            this._addInput(block, 'OPERAND2', this._createTextBlock(operands[1]));
        }
        return block;
    }
};

export default OperatorsConverter;
