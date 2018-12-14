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
            }
        }
        return block;
    }
};

export default SensingConverter;
