/* global Opal */
import _ from 'lodash';

/**
 * Mesh extension converter
 */
const MeshConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'mesh_sensor_value':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('mesh_getSensorValue', 'statement');
                    this._addFieldInput(
                        block, 'NAME', 'mesh_menu_variableNames', 'variableNames',
                        args[0], ' '
                    );
                }
                break;
            }
        }
        return block;
    }
};

export default MeshConverter;
