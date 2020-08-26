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
            }
        }
        return block;
    }
};

export default BoostConverter;
