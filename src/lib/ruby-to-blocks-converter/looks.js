/* global Opal */
import _ from 'lodash';

/* eslint-disable no-invalid-this */
const createBlockWithMessage = function (opcode, message) {
    const block = this._createBlock(opcode, 'statement');
    this._addTextInput(block, 'MESSAGE', _.isNumber(message) ? message.toString() : message, 'Hello!');
    return block;
};
/* eslint-enable no-invalid-this */

/**
 * Looks converter
 */
const LooksConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if (this._isSelf(receiver) || receiver === Opal.nil) {
            switch (name) {
            case 'say':
                if (args.length === 1 && this._isNumberOrStringOrBlock(args[0])) {
                    block = createBlockWithMessage.call(this, 'looks_say', args[0]);
                } else if (args.length === 2 &&
                           this._isNumberOrStringOrBlock(args[0]) &&
                           this._isNumberOrBlock(args[1])) {
                    block = createBlockWithMessage.call(this, 'looks_sayforsecs', args[0]);
                    this._addNumberInput(block, 'SECS', 'math_number', args[1], 2);
                }
                break;
            }
        }
        return block;
    }
};

export default LooksConverter;
