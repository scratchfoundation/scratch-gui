/* global Opal */
import _ from 'lodash';

/**
 * Wedo2 converter
 */
const Wedo2Converter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'wedo2_turn_motor_on_for':
                if (args.length === 2 && this._isString(args[0]) && this._isNumberOrBlock(args[1])){
                    block = this._createBlock('wedo2_motorOnFor', 'statement');
                    this._addInput(
                        block,
                        'MOTOR_ID',
                        this._createFieldBlock('wedo2_menu_MOTOR_ID', 'MOTOR_ID', args[0])
                    );
                    this._addNumberInput(block, 'DURATION', 'math_number', args[1], 1);
                }
                break;
            case 'wedo2_trun_motor_on':
                block = this._createBlock('wedo2_motorOn', 'statement');
                this._addInput(block, 'MOTOR_ID', this._createFieldBlock('wedo2_menu_MOTOR_ID', 'MOTOR_ID', args[0]))
                break;
            case 'wedo2_trun_motor_off':
                block = this._createBlock('wedo2_motorOff', 'statement');
                this._addInput(block, 'MOTOR_ID', this._createFieldBlock('wedo2_menu_MOTOR_ID', 'MOTOR_ID', args[0]))
                break;
            case 'wedo2_set_light_color':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('wedo2_setLightHue', 'statement');
                    this._addNumberInput(block, 'HUE', 'math_number', args[0], 50);
                }
                break;
            }
        }
        return block;
    }
};

export default Wedo2Converter;
