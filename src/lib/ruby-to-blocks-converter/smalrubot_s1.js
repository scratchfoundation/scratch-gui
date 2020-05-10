/* global Opal */
import _ from 'lodash';

const SmalrubotS1 = 'smalrubot_s1';

const ACTIONS = [
    'forward',
    'backward',
    'left',
    'right',
    'stop'
];

const POSITIONS = [
    'left',
    'right'
];

const SENSOR_POSITIONS = [
    'left',
    'right',
    'touch'
];

/**
 * Smalrubot S1 extension converter
 */
const SmalrubotS1Converter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock, node) {
        let block;
        if (this._isSelf(receiver) || receiver === Opal.nil) {
            if (name === SmalrubotS1 && args.length === 0) {
                block = this._createRubyExpressionBlock(SmalrubotS1, node);
            }
        } else if (this._equalRubyExpression(receiver, SmalrubotS1)) {
            switch (name) {
            case 'action':
                if (args.length === 1 && this._isString(args[0]) && ACTIONS.includes(args[0].toString())) {
                    block = this._changeRubyExpressionBlock(
                        receiver, 'smalrubotS1_action', 'statement'
                    );
                    this._addField(block, 'ACTION', args[0]);
                } else if (args.length === 2 &&
                           this._isString(args[0]) && ACTIONS.includes(args[0].toString()) &&
                           this._isNumberOrBlock(args[1])) {
                    block = this._changeRubyExpressionBlock(
                        receiver, 'smalrubotS1_actionAndStopAfter', 'statement'
                    );
                    this._addField(block, 'ACTION', args[0]);
                    this._addNumberInput(block, 'SECS', 'math_number', args[1], 0.5);
                }
                break;
            case 'bend_arm':
                if (args.length === 2 &&
                    this._isNumberOrBlock(args[0]) &&
                    this._isNumberOrBlock(args[1])) {
                    block = this._changeRubyExpressionBlock(
                        receiver, 'smalrubotS1_bendArm', 'statement'
                    );
                    this._addNumberInput(block, 'DEGREE', 'math_number', args[0], 90);
                    this._addNumberInput(block, 'SECS', 'math_number', args[1], 1);
                }
                break;
            case 'sensor_value':
                if (args.length === 1 &&
                    this._isString(args[0]) && SENSOR_POSITIONS.includes(args[0].toString())) {
                    block = this._changeRubyExpressionBlock(
                        receiver, 'smalrubotS1_getSensorValue', 'value'
                    );
                    this._addField(block, 'POSITION', args[0]);
                }
                break;
            case 'led':
                if (args.length === 2 &&
                    this._isString(args[0]) && POSITIONS.includes(args[0].toString()) &&
                    (this._isTrue(args[1]) || this._isFalse(args[1]))) {
                    let opcode = 'smalrubotS1_turnLedOn';
                    if (this._isFalse(args[1])) {
                        opcode = 'smalrubotS1_turnLedOff';
                    }
                    block = this._changeRubyExpressionBlock(
                        receiver, opcode, 'statement'
                    );
                    this._addField(block, 'POSITION', args[0]);
                }
                break;
            case 'get_motor_speed':
                if (args.length === 1 &&
                    this._isString(args[0]) && POSITIONS.includes(args[0].toString())) {
                    block = this._changeRubyExpressionBlock(
                        receiver, 'smalrubotS1_getMotorSpeed', 'value'
                    );
                    this._addField(block, 'POSITION', args[0]);
                }
                break;
            case 'set_motor_speed':
                if (args.length === 2 &&
                    this._isString(args[0]) && POSITIONS.includes(args[0].toString()) &&
                    this._isNumberOrBlock(args[1])) {
                    block = this._changeRubyExpressionBlock(
                        receiver, 'smalrubotS1_setMotorSpeed', 'statement'
                    );
                    this._addField(block, 'POSITION', args[0]);
                    this._addNumberInput(block, 'SPEED', 'math_number', args[1], 100);
                }
                break;
            }
        }
        return block;
    }
};

export default SmalrubotS1Converter;
