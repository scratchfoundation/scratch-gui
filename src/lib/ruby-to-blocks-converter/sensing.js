/* global Opal */
import _ from 'lodash';

const ColorRegexp = /^#[0-9a-fA-F]{6}$/;

/**
 * Sensing converter
 */
const SensingConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'touching?':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('sensing_touchingobject', 'value_boolean');
                    this._addFieldInput(
                        block, 'TOUCHINGOBJECTMENU', 'sensing_touchingobjectmenu', 'TOUCHINGOBJECTMENU',
                        args[0], '_mouse_'
                    );
                }
                break;
            case 'touching_color?':
                if (args.length === 1 &&
                    (this._isBlock(args[0]) || (this._isString(args[0]) && ColorRegexp.test(args[0].toString())))) {
                    block = this._createBlock('sensing_touchingcolor', 'value_boolean');
                    this._addFieldInput(block, 'COLOR', 'colour_picker', 'COLOUR', args[0], '#43066f');
                }
                break;
            case 'color_is_touching_color?':
                if (args.length === 2 &&
                    (this._isBlock(args[0]) || (this._isString(args[0]) && ColorRegexp.test(args[0].toString()))) &&
                    (this._isBlock(args[1]) || (this._isString(args[1]) && ColorRegexp.test(args[1].toString())))) {
                    block = this._createBlock('sensing_coloristouchingcolor', 'value_boolean');
                    this._addFieldInput(block, 'COLOR', 'colour_picker', 'COLOUR', args[0], '#aad315');
                    this._addFieldInput(block, 'COLOR2', 'colour_picker', 'COLOUR', args[1], '#fca3bf');
                }
                break;
            case 'distance':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('sensing_distanceto', 'value');
                    this._addFieldInput(
                        block, 'DISTANCETOMENU', 'sensing_distancetomenu', 'DISTANCETOMENU', args[0], '_mouse_'
                    );
                }
                break;
            case 'answer':
            case 'loudness':
            case 'days_since_2000':
            case 'user_name':
                if (args.length === 0) {
                    let opcode;
                    switch (name) {
                    case 'answer':
                        opcode = 'sensing_answer';
                        break;
                    case 'loudness':
                        opcode = 'sensing_loudness';
                        break;
                    case 'days_since_2000':
                        opcode = 'sensing_dayssince2000';
                        break;
                    case 'user_name':
                        opcode = 'sensing_username';
                        break;
                    }
                    block = this._createBlock(opcode, 'value');
                    break;
                }
            }
        } else if (this._isConst(receiver)) {
            switch (receiver.toString()) {
            case '::Mouse':
                if (args.length === 0) {
                    let opcode;
                    let blockType;
                    switch (name) {
                    case 'down?':
                        opcode = 'sensing_mousedown';
                        blockType = 'value_boolean';
                        break;
                    case 'x':
                        opcode = 'sensing_mousex';
                        blockType = 'value';
                        break;
                    case 'y':
                        opcode = 'sensing_mousey';
                        blockType = 'value';
                        break;
                    }
                    block = this._createBlock(opcode, blockType);
                }
                break;
            case '::Timer':
                if (args.length === 0) {
                    let opcode;
                    let blockType;
                    switch (name) {
                    case 'value':
                        opcode = 'sensing_timer';
                        blockType = 'value';
                        break;
                    case 'reset':
                        opcode = 'sensing_resettimer';
                        blockType = 'statement';
                        break;
                    }
                    block = this._createBlock(opcode, blockType);
                }
                break;
            }
        }

        return block;
    }
};

export default SensingConverter;
