/* global Opal */
import _ from 'lodash';

/**
 * Event converter
 */
const EventConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if (this._isSelf(receiver) || receiver === Opal.nil) {
            switch (name) {
            case 'when':
                if (args.length === 1) {
                    if (args[0].type === 'sym' && args[0].value === 'flag_clicked' &&
                        rubyBlockArgs && rubyBlockArgs.length === 0) {
                        block = this._createBlock('event_whenflagclicked', 'hat');
                        if (this._isBlock(rubyBlock)) {
                            rubyBlock.parent = block.id;
                            block.next = rubyBlock.id;
                        }
                    }
                }
                break;
            }
        }
        return block;
    }
};

export default EventConverter;
