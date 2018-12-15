/* global Opal */
import _ from 'lodash';

const Effect = [
    'PITCH',
    'PAN'
];

/**
 * Sound converter
 */
const SoundConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'play_until_done':
            case 'play':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    let opcode;
                    if (name === 'play_until_done') {
                        opcode = 'sound_playuntildone';
                    } else {
                        opcode = 'sound_play';
                    }
                    block = this._createBlock(opcode, 'statement');
                    this._addFieldInput(block, 'SOUND_MENU', 'sound_sounds_menu', 'SOUND_MENU', args[0], '');
                }
                break;
            case 'stop_all_sounds':
            case 'clear_sound_effects':
            case 'volume':
                if (args.length === 0) {
                    let opcode;
                    let blockType;
                    switch (name) {
                    case 'stop_all_sounds':
                        opcode = 'sound_stopallsounds';
                        blockType = 'statement';
                        break;
                    case 'clear_sound_effects':
                        opcode = 'sound_cleareffects';
                        blockType = 'statement';
                        break;
                    case 'volume':
                        opcode = 'sound_volume';
                        blockType = 'value';
                        break;
                    }
                    block = this._createBlock(opcode, blockType);
                }
                break;
            case 'change_sound_effect_by':
            case 'set_sound_effect':
                if (args.length === 2 && this._isString(args[0]) && Effect.indexOf(args[0].toString()) >= 0 &&
                    this._isNumberOrBlock(args[1])) {
                    let opcode;
                    let value;
                    if (name === 'change_sound_effect_by') {
                        opcode = 'sound_changeeffectby';
                        value = 10;
                    } else {
                        opcode = 'sound_seteffectto';
                        value = 100;
                    }
                    block = this._createBlock(opcode, 'statement');
                    this._addField(block, 'EFFECT', args[0]);
                    this._addNumberInput(block, 'VALUE', 'math_number', args[1], value);
                }
                break;
            case 'volume=':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('sound_setvolumeto', 'statement');
                    this._addNumberInput(block, 'VOLUME', 'math_number', args[0], 100);
                }
                break;
            }
        }
        return block;
    },

    // eslint-disable-next-line no-unused-vars
    onOpAsgn: function (lh, operator, rh) {
        let block;
        if (this._isBlock(lh) && lh.opcode === 'sound_volume' && operator === '+' && this._isNumberOrBlock(rh)) {
            block = this._changeBlock(lh, 'sound_changevolumeby', 'statement');
            this._addNumberInput(block, 'VOLUME', 'math_number', rh, -10);
        }
        return block;
    }
};

export default SoundConverter;
