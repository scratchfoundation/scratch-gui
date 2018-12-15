/* global Opal */
import _ from 'lodash';

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
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._createBlock('sensing_touchingobject', 'value_boolean');
                    this._addInput(
                        block,
                        'TOUCHINGOBJECTMENU',
                        this._createFieldBlock('sensing_touchingobjectmenu', 'TOUCHINGOBJECTMENU', args[0])
                    );
                }
                break;
            case 'touching_color?':
                if (args.length === 1 && this._isString(args[0]) && /^#[0-9a-fA-F]{6}$/.test(args[0].toString())) {
                    block = this._createBlock('sensing_touchingcolor', 'value_boolean');
                    this._addInput(block, 'COLOR', this._createFieldBlock('colour_picker', 'COLOUR', args[0]));
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
