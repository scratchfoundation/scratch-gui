/* global Opal */
import _ from 'lodash';

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
                    block = this._createBlock('looks_say', 'statement');
                    this._addTextInput(block, 'MESSAGE', _.isNumber(args[0]) ? args[0].toString() : args[0], 'Hello!');
                }
                break;
            }
        }
        return block;
    }
};

export default LooksConverter;
