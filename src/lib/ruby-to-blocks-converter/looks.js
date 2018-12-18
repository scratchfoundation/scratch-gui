/* global Opal */
import _ from 'lodash';

/* eslint-disable no-invalid-this */
const createBlockWithMessage = function (opcode, message, defaultMessage) {
    const block = this._createBlock(opcode, 'statement');
    this._addTextInput(block, 'MESSAGE', this._isNumber(message) ? message.toString() : message, defaultMessage);
    return block;
};

const Effects = [
    'COLOR',
    'FISHEYE',
    'WHIRL',
    'PIXELATE',
    'MOSAIC',
    'BRIGHTNESS',
    'GHOST'
];

const FrontBack = [
    'front',
    'back'
];

const ForwardBackward = [
    'forward',
    'backward'
];
/* eslint-enable no-invalid-this */

/**
 * Looks converter
 */
const LooksConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'say':
            case 'think':
                if ((args.length === 1 && this._isNumberOrStringOrBlock(args[0])) ||
                    (args.length === 2 &&
                     this._isNumberOrStringOrBlock(args[0]) &&
                     this._isNumberOrBlock(args[1]))) {
                    let opcode;
                    let defaultMessage;
                    if (name === 'say') {
                        opcode = 'looks_say';
                        defaultMessage = 'Hello!';
                    } else {
                        opcode = 'looks_think';
                        defaultMessage = 'Hmm...';
                    }
                    block = createBlockWithMessage.call(this, opcode, args[0], defaultMessage);
                    if (args.length === 2) {
                        block.opcode += 'forsecs';
                        this._addNumberInput(block, 'SECS', 'math_number', args[1], 2);
                    }
                }
                break;
            case 'switch_costume':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._createBlock('looks_switchcostumeto', 'statement');
                    this._addInput(block, 'COSTUME', this._createFieldBlock('looks_costume', 'COSTUME', args[0]));
                }
                break;
            case 'switch_backdrop':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._createBlock('looks_switchbackdropto', 'statement');
                    this._addInput(block, 'BACKDROP', this._createFieldBlock('looks_backdrops', 'BACKDROP', args[0]));
                }
                break;
            case 'switch_backdrop_and_wait':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._createBlock('looks_switchbackdroptoandwait', 'statement');
                    this._addInput(block, 'BACKDROP', this._createFieldBlock('looks_backdrops', 'BACKDROP', args[0]));
                }
                break;
            case 'size=':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('looks_setsizeto', 'statement');
                    this._addNumberInput(block, 'SIZE', 'math_number', args[0], 100);
                }
                break;
            case 'change_effect_by':
            case 'set_effect':
                if (args.length === 2 &&
                    this._isString(args[0]) && Effects.indexOf(args[0].toString().toUpperCase()) >= 0 &&
                    this._isNumberOrBlock(args[1])) {
                    let opcode;
                    let inputName;
                    if (name === 'change_effect_by') {
                        opcode = 'looks_changeeffectby';
                        inputName = 'CHANGE';
                    } else {
                        opcode = 'looks_seteffectto';
                        inputName = 'VALUE';
                    }
                    block = this._createBlock(opcode, 'statement');
                    this._addField(block, 'EFFECT', args[0].toString().toUpperCase());
                    this._addNumberInput(block, inputName, 'math_number', args[1], 25);
                }
                break;
            case 'go_to_layer':
                if (args.length === 1 &&
                    this._isString(args[0]) && FrontBack.indexOf(args[0].toString()) >= 0) {
                    block = this._createBlock('looks_gotofrontback', 'statement');
                    this._addField(block, 'FRONT_BACK', args[0]);
                }
                break;
            case 'go_layers':
                if (args.length === 2 &&
                    this._isNumberOrBlock(args[0]) && ForwardBackward.indexOf(args[1].toString()) >= 0) {
                    block = this._createBlock('looks_goforwardbackwardlayers', 'statement');
                    this._addNumberInput(block, 'NUM', 'math_integer', args[0], 1);
                    this._addField(block, 'FORWARD_BACKWARD', args[1]);
                }
                break;
            case 'costume_number':
            case 'costume_name':
            case 'backdrop_number':
            case 'backdrop_name':
                if (args.length === 0) {
                    const a = name.split('_');
                    block = this._createBlock(`looks_${a[0]}numbername`, 'value');
                    this._addField(block, 'NUMBER_NAME', a[1]);
                }
                break;
            }
            if (!block && args.length === 0) {
                let opcode;
                let blockType = 'statement';
                switch (name) {
                case 'next_costume':
                    opcode = 'looks_nextcostume';
                    break;
                case 'next_backdrop':
                    opcode = 'looks_nextbackdrop';
                    break;
                case 'clear_graphic_effects':
                    opcode = 'looks_cleargraphiceffects';
                    break;
                case 'show':
                    opcode = 'looks_show';
                    break;
                case 'hide':
                    opcode = 'looks_hide';
                    break;
                case 'size':
                    opcode = 'looks_size';
                    blockType = 'value';
                    break;
                }
                if (opcode) {
                    block = this._createBlock(opcode, blockType);
                }
            }
        }
        return block;
    },

    // eslint-disable-next-line no-unused-vars
    onOpAsgn: function (lh, operator, rh) {
        let block;
        if (this._isBlock(lh) && lh.opcode === 'looks_size' && operator === '+' && this._isNumberOrBlock(rh)) {
            block = this._changeBlock(lh, 'looks_changesizeby', 'statement');
            this._addNumberInput(block, 'CHANGE', 'math_number', rh, 10);
        }
        return block;
    }
};

export default LooksConverter;
