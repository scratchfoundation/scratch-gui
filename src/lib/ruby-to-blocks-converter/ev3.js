/* global Opal */
import _ from 'lodash';

const Ev3MotorMenu = ['A', 'B', 'C', 'D'];
const Ev3SensorMenu = ['1', '2', '3', '4'];

/**
 * EV3 converter
 */
const EV3Converter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'ev3_motor_turn_this_way_for':
                if (args.length === 2 && this._isString(args[0]) && this._isNumberOrBlock(args[1])) {
                    block = this._createBlock('ev3_motorTurnClockwise', 'statement');
                    const motor = Ev3MotorMenu.indexOf(args[0].toString());
                    this._addInput(
                        block,
                        'PORT',
                        this._createFieldBlock('ev3_menu_motorPorts', 'motorPorts', motor.toString())
                    );
                    this._addNumberInput(block, 'TIME', 'math_number', args[1], 1);
                }
                break;
            case 'ev3_motor_turn_that_way_for':
                if (args.length === 2 && this._isString(args[0]) && this._isNumberOrBlock(args[1])) {
                    block = this._createBlock('ev3_motorTurnCounterClockwise', 'statement');
                    const motor = Ev3MotorMenu.indexOf(args[0].toString());
                    this._addInput(
                        block,
                        'PORT',
                        this._createFieldBlock('ev3_menu_motorPorts', 'motorPorts', motor.toString())
                    );
                    this._addNumberInput(block, 'TIME', 'math_number', args[1], 1);
                }
                break;
            case 'ev3_motor_set_power':
                if (args.length === 2 && this._isString(args[0]) && this._isNumberOrBlock(args[1])) {
                    block = this._createBlock('ev3_motorSetPower', 'statement');
                    const motor = Ev3MotorMenu.indexOf(args[0].toString());
                    this._addInput(
                        block,
                        'PORT',
                        this._createFieldBlock('ev3_menu_motorPorts', 'motorPorts', motor.toString())
                    );
                    this._addNumberInput(block, 'POWER', 'math_number', args[1], 100);
                }
                break;
            case 'ev3_motor_position':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._createBlock('ev3_getMotorPosition', 'value');
                    const motor = Ev3MotorMenu.indexOf(args[0].toString());
                    this._addInput(
                        block,
                        'PORT',
                        this._createFieldBlock('ev3_menu_motorPorts', 'motorPorts', motor.toString())
                    );
                }
                break;
            case 'ev3_button_pressed?':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._createBlock('ev3_buttonPressed', 'value_boolean');
                    const sensor = Ev3SensorMenu.indexOf(args[0].toString());
                    this._addInput(
                        block,
                        'PORT',
                        this._createFieldBlock('ev3_menu_sensorPorts', 'sensorPorts', sensor.toString())
                    );
                }
                break;
            case 'ev3_distance':
                if (args.length === 0) {
                    block = this._createBlock('ev3_getDistance', 'value');
                }
                break;
            case 'ev3_brightness':
                if (args.length === 0) {
                    block = this._createBlock('ev3_getBrightness', 'value');
                }
                break;
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
