/* global Opal */
import _ from 'lodash';

/**
 * GdxFor converter
 */
const GdxForConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'gdx_for_acceleration':
                if (args.length === 1) {
                    block = this._createBlock('gdxfor_getAcceleration', 'value');
                    this._addInput(
                        block,
                        'DIRECTION',
                        this._createFieldBlock('gdxfor_menu_axisOptions', 'axisOptions', args[0])
                    );
                }
                break;
            }
        }
        return block;
    }
};

export default GdxForConverter;
