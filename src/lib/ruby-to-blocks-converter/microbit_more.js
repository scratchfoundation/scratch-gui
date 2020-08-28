/* global Opal */
import _ from 'lodash';

const MicroBitMore = 'microbit_more';

/**
 * MicroBitMore converter
 */
const MicroBitMoreConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock, node) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) &&
            name === 'when' &&
            args.length >= 1 && args[0].type === 'sym' &&
            rubyBlockArgs && rubyBlockArgs.length === 0 &&
            rubyBlock) {
            switch (args[0].value) {
            case 'mbit_more_button_pressed':
                if (args.length === 2 && this._isString(args[1])) {
                    block = this._createBlock('microbitMore_whenButtonPressed', 'hat');
                    this._addFieldInput(
                        block, 'BTN', 'microbitMore_menu_buttons', 'buttons',
                        args[1], 'A'
                    );
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'mbit_more_gesture':
                if (args.length === 2 && this._isString(args[1])) {
                    block = this._createBlock('microbitMore_whenGesture', 'hat');
                    this._addFieldInput(
                        block, 'GESTURE', 'microbitMore_menu_gestures', 'gestures',
                        args[1], 'moved'
                    );
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'mbit_more_tilted':
                if (args.length === 2 && this._isString(args[1])) {
                    block = this._createBlock('microbitMore_whenTilted', 'hat');
                    this._addFieldInput(
                        block, 'DIRECTION', 'microbitMore_menu_tiltDirectionAny', 'tiltDirectionAny',
                        args[1], 'any'
                    );
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'mbit_more_pin_connected':
                if (args.length === 2 && this._isNumber(args[1])) {
                    block = this._createBlock('microbitMore_whenPinConnected', 'hat');
                    this._addFieldInput(
                        block, 'PIN', 'microbitMore_menu_gpio', 'gpio',
                        args[1], '0'
                    );
                    this._setParent(rubyBlock, block);
                }
                break;
            }
        } else if (this._isSelf(receiver) || receiver === Opal.nil) {
            switch (name) {
            case 'mbit_more':
                if (args.length === 0) {
                    block = this._createRubyExpressionBlock(MicroBitMore, node);
                }
                break;
            }
        } else if (this._equalRubyExpression(receiver, MicroBitMore)) {
            switch (name) {
            case 'button_pressed?':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._changeBlock(receiver, 'microbitMore_isButtonPressed', 'value_boolean');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    this._addFieldInput(
                        block, 'BTN', 'microbitMore_menu_buttons', 'buttons',
                        args[0], 'A'
                    );
                }
                break;
            case 'display':
                if (args.length === 5 && args.every(i => this._isString(i))) {
                    block = this._changeBlock(receiver, 'microbitMore_displaySymbol', 'statement');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    let matrix = '';
                    for (const arg of args) {
                        matrix += arg;
                    }
                    matrix = matrix.replace(/[1-9]/g, '1').replace(/[^1-9]/g, '0');
                    this._addFieldInput(
                        block, 'MATRIX', 'matrix', 'MATRIX',
                        matrix, null
                    );
                }
                break;
            case 'display_text':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._changeBlock(receiver, 'microbitMore_displayText', 'statement');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    this._addTextInput(block, 'TEXT', args[0], 'Hello!');
                }
                break;
            case 'clear_display':
                if (args.length === 0) {
                    block = this._changeBlock(receiver, 'microbitMore_displayClear', 'statement');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;
                }
                break;
            case 'tilted?':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._changeBlock(receiver, 'microbitMore_isTilted', 'value_boolean');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    this._addFieldInput(
                        block, 'DIRECTION', 'microbitMore_menu_tiltDirectionAny', 'tiltDirectionAny',
                        args[0], 'any'
                    );
                }
                break;
            case 'tilt_angle':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._changeBlock(receiver, 'microbitMore_getTiltAngle', 'value');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    this._addFieldInput(
                        block, 'DIRECTION', 'microbitMore_menu_tiltDirection', 'tiltDirection',
                        args[0], 'front'
                    );
                }
                break;
            case 'pin_connected?':
                if (args.length === 1 && this._isNumber(args[0])) {
                    block = this._changeBlock(receiver, 'microbitMore_isPinConnected', 'value_boolean');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    this._addFieldInput(
                        block, 'PIN', 'microbitMore_menu_gpio', 'gpio',
                        args[0], '0'
                    );
                }
                break;
            case 'light_level':
                if (args.length === 0){
                    block = this._changeBlock(receiver, 'microbitMore_getLightLevel', 'value');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;
                }
                break;
            case 'temperature':
                if (args.length === 0){
                    block = this._changeBlock(receiver, 'microbitMore_getTemperature', 'value');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;
                }
                break;
            case 'compass_heading':
                if (args.length === 0){
                    block = this._changeBlock(receiver, 'microbitMore_getCompassHeading', 'value');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;
                }
                break;
            case 'pitch':
                if (args.length === 0){
                    block = this._changeBlock(receiver, 'microbitMore_getPitch', 'value');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;
                }
                break;
            case 'roll':
                if (args.length === 0){
                    block = this._changeBlock(receiver, 'microbitMore_getRoll', 'value');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;
                }
                break;
            case 'get_magnetic_force':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._changeBlock(receiver, 'microbitMore_getMagneticForce', 'value');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    this._addFieldInput(
                        block, 'AXIS', 'microbitMore_menu_axis', 'axis',
                        args[0], 'absolute'
                    );
                }
                break;
            case 'get_acceleration':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._changeBlock(receiver, 'microbitMore_getAcceleration', 'value');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    this._addFieldInput(
                        block, 'AXIS', 'microbitMore_menu_axis', 'axis',
                        args[0], 'x'
                    );
                }
                break;
            }
        }
        return block;
    }
};

export default MicroBitMoreConverter;
