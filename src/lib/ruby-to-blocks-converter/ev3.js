/* global Opal */
import _ from 'lodash';

/**
 * EV3 converter
 */
const EV3Converter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'ev3_beep_note':
                if (args.length === 2 && this._isNumberOrBlock(args[0]) && this._isNumberOrBlock(args[1])) {
                    block = this._createBlock('ev3_beep', 'statement');
                    this._addNoteInput(block, 'NOTE', args[0], 60);
                    this._addNumberInput(block, 'TIME', 'math_number', args[1], 0.5);
                }
                break;
            }
        }
        return block;
    }
};

export default EV3Converter;
