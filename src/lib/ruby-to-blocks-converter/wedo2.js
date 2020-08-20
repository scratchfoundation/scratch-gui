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
                if (args.length === 2 && this._isStringOrBlock(args[0]) && this._isNumberOrBlock(args[1])) {
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
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('wedo2_motorOn', 'statement');
                    this._addInput(
                        block,
                        'MOTOR_ID',
                        this._createFieldBlock('wedo2_menu_MOTOR_ID', 'MOTOR_ID', args[0])
                    );
                }
                break;
            case 'wedo2_trun_motor_off':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('wedo2_motorOff', 'statement');
                    this._addInput(
                        block,
                        'MOTOR_ID',
                        this._createFieldBlock('wedo2_menu_MOTOR_ID', 'MOTOR_ID', args[0])
                    );
                }
                break;
            case 'wedo2_set_motor_power':
                if (args.length === 2 && this._isStringOrBlock(args[0]) && this._isNumberOrBlock(args[1])) {
                    block = this._createBlock('wedo2_startMotorPower', 'statement');
                    this._addInput(
                        block,
                        'MOTOR_ID',
                        this._createFieldBlock('wedo2_menu_MOTOR_ID', 'MOTOR_ID', args[0])
                    );
                    this._addNumberInput(block, 'POWER', 'math_number', args[1], 100);
                }
                break;
            case 'wedo2_set_motor_direction':
                if (args.length === 2 && this._isStringOrBlock(args[0]) && this._isStringOrBlock(args[1])){
                    block = this._createBlock('wedo2_setMotorDirection', 'statement');
                    this._addInput(
                        block,
                        'MOTOR_ID',
                        this._createFieldBlock('wedo2_menu_MOTOR_ID', 'MOTOR_ID', args[0])
                    );
                    this._addInput(
                        block,
                        'MOTOR_DIRECTION',
                        this._createFieldBlock('wedo2_menu_MOTOR_DIRECTION', 'MOTOR_DIRECTION', args[1])
                    );
                }
                break;
            case 'wedo2_set_light_color':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('wedo2_setLightHue', 'statement');
                    this._addNumberInput(block, 'HUE', 'math_number', args[0], 50);
                }
                break;
            case 'wedo2_distance':
                if (args.length === 0) {
                    block = this._createBlock('wedo2_getDistance', 'value');
                }
                break;
            case 'wedo2_tilted':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('wedo2_isTilted', 'value');
                    this._addInput(
                        block,
                        'TILT_DIRECTION_ANY',
                        this._createFieldBlock('wedo2_menu_TILT_DIRECTION_ANY', 'TILT_DIRECTION_ANY', args[0])
                    );
                }
                break;
            case 'wedo2_tilt_angle':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('wedo2_getTiltAngle', 'value');
                    this._addInput(
                        block,
                        'TILT_DIRECTION',
                        this._createFieldBlock('wedo2_menu_TILT_DIRECTION', 'TILT_DIRECTION', args[0])
                    );
                }
                break;
            }
        } else if ((this._isSelf(receiver) || receiver === Opal.nil) &&
                    name === 'when' &&
                    args.length >= 1 && args[0].type === 'sym' &&
                    rubyBlockArgs && rubyBlockArgs.length === 0 &&
                    rubyBlock) {
            switch (name) {
            case 'wedo2_when_tilted':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('wedo2_whenTilted', 'hat');
                    this._addInput(
                        block,
                        'TILT_DIRECTION_ANY',
                        this._createFieldBlock('wedo2_menu_TILT_DIRECTION_ANY', 'TILT_DIRECTION_ANY', args[0])
                    );
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'wedo2_when_distance':
                if (args.length === 2 && this._isStringOrBlock(args[0]) && this._isNumberOrBlock(args[1])) {
                    block = this._createBlock('wedo2_whenDistance', 'hat');
                    this._addInput(
                        block,
                        'OP',
                        this._createFieldBlock('wedo2_menu_OP', 'OP', args[0])
                    );
                    this._addNumberInput(block, 'REFERENCE', 'math_number', args[1], 50);
                    this._setParent(rubyBlock, block);
                }
                break;
            }
        }
        return block;
    }
};

export default Wedo2Converter;
