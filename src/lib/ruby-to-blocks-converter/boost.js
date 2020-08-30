/* global Opal */
import _ from 'lodash';

/**
 * Boost converter
 */
const BoostConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'boost_motor_turn_on_for':
                if (args.length === 2 && this._isStringOrBlock(args[0]) && this._isNumberOrBlock(args[1])) {
                    block = this._createBlock('boost_motorOnFor', 'statement');
                    this._addInput(
                        block,
                        'MOTOR_ID',
                        this._createFieldBlock('boost_menu_MOTOR_ID', 'MOTOR_ID', args[0])
                    );
                    this._addNumberInput(block, 'DURATION', 'math_number', args[1], 1);
                } else if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('boost_motorOn', 'statement');
                    this._addInput(
                        block,
                        'MOTOR_ID',
                        this._createFieldBlock('boost_menu_MOTOR_ID', 'MOTOR_ID', args[0])
                    );
                }
                break;
            case 'boost_motor_turn_this_way_for':
                if (args.length === 2 && this._isStringOrBlock(args[0]) && this._isNumberOrBlock(args[1])) {
                    block = this._createBlock('boost_motorOnForRotation', 'statement');
                    this._addInput(
                        block,
                        'MOTOR_ID',
                        this._createFieldBlock('boost_menu_MOTOR_ID', 'MOTOR_ID', args[0])
                    );
                    this._addNumberInput(block, 'ROTATION', 'math_number', args[1], 1);
                }
                break;
            case 'boost_motor_turn_off_for':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('boost_motorOff', 'statement');
                    this._addInput(
                        block,
                        'MOTOR_ID',
                        this._createFieldBlock('boost_menu_MOTOR_ID', 'MOTOR_ID', args[0])
                    );
                }
                break;
            case 'boost_motor_set_power_for':
                if (args.length === 2 && this._isStringOrBlock(args[0]) && this._isNumberOrBlock(args[1])) {
                    block = this._createBlock('boost_setMotorPower', 'statement');
                    this._addInput(
                        block,
                        'MOTOR_ID',
                        this._createFieldBlock('boost_menu_MOTOR_ID', 'MOTOR_ID', args[0])
                    );
                    this._addNumberInput(block, 'POWER', 'math_number', args[1], 100);
                }
                break;
            case 'boost_motor_set_direction_for':
                if (args.length === 2 && this._isStringOrBlock(args[0]) && this._isStringOrBlock(args[1])) {
                    block = this._createBlock('boost_setMotorDirection', 'statement');
                    this._addInput(
                        block,
                        'MOTOR_ID',
                        this._createFieldBlock('boost_menu_MOTOR_ID', 'MOTOR_ID', args[0])
                    );
                    this._addInput(
                        block,
                        'MOTOR_DIRECTION',
                        this._createFieldBlock('boost_menu_MOTOR_DIRECTION', 'MOTOR_DIRECTION', args[1])
                    );
                }
                break;
            case 'boost_motor_get_position':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('boost_getMotorPosition', 'value');
                    this._addInput(
                        block,
                        'MOTOR_REPORTER_ID',
                        this._createFieldBlock('boost_menu_MOTOR_REPORTER_ID', 'MOTOR_REPORTER_ID', args[0])
                    );
                }
                break;
            case 'boost_seeing_color?':
                if (args.length === 1 && this._isStringOrBlock(args[0])) {
                    block = this._createBlock('boost_seeingColor', 'boolean');
                    this._addInput(
                        block,
                        'COLOR',
                        this._createFieldBlock('boost_menu_COLOR', 'COLOR', args[0])
                    );
                }
                break;
            }
        }
        return block;
    }
};

export default BoostConverter;
