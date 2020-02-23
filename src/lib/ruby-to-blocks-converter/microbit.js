/* global Opal */
import _ from 'lodash';

const MicroBit = 'microbit';

/**
 * MicroBit converter
 */
const MicroBitConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) &&
            name === 'when' &&
            args.length >= 1 && args[0].type === 'sym' &&
            rubyBlockArgs && rubyBlockArgs.length === 0 &&
            rubyBlock) {
            switch (args[0].value) {
            case 'microbit_button_pressed':
                if (args.length === 2 && this._isString(args[1])) {
                    block = this._createBlock('microbit_whenButtonPressed', 'hat');
                    this._addFieldInput(
                        block, 'BTN', 'microbit_menu_buttons', 'buttons',
                        args[1], 'A'
                    );
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'microbit_gesture':
                if (args.length === 2 && this._isString(args[1])) {
                    block = this._createBlock('microbit_whenGesture', 'hat');
                    this._addFieldInput(
                        block, 'GESTURE', 'microbit_menu_gestures', 'gestures',
                        args[1], 'moved'
                    );
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'microbit_tilted':
                if (args.length === 2 && this._isString(args[1])) {
                    block = this._createBlock('microbit_whenTilted', 'hat');
                    this._addFieldInput(
                        block, 'DIRECTION', 'microbit_menu_tiltDirectionAny', 'tiltDirectionAny',
                        args[1], 'any'
                    );
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'microbit_pin_connected':
                if (args.length === 2 && this._isNumber(args[1])) {
                    block = this._createBlock('microbit_whenPinConnected', 'hat');
                    this._addFieldInput(
                        block, 'PIN', 'microbit_menu_touchPins', 'touchPins',
                        args[1], '0'
                    );
                    this._setParent(rubyBlock, block);
                }
                break;
            }
        } else if (this._isSelf(receiver) || receiver === Opal.nil) {
            switch (name) {
            case 'microbit':
                if (args.length === 0) {
                    block = this._createRubyExpressionBlock(MicroBit);
                }
                break;
            }
        } else if (this._equalRubyExpression(receiver, MicroBit)) {
            switch (name) {
            case 'button_pressed?':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._changeBlock(receiver, 'microbit_isButtonPressed', 'value_boolean');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    this._addFieldInput(
                        block, 'BTN', 'microbit_menu_buttons', 'buttons',
                        args[0], 'A'
                    );
                }
                break;
            case 'display':
                if (args.length === 5 && args.every(i => this._isString(i))) {
                    block = this._changeBlock(receiver, 'microbit_displaySymbol', 'statement');
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
                    block = this._changeBlock(receiver, 'microbit_displayText', 'statement');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    this._addTextInput(block, 'TEXT', args[0], 'Hello!');
                }
                break;
            case 'clear_display':
                if (args.length === 0) {
                    block = this._changeBlock(receiver, 'microbit_displayClear', 'statement');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;
                }
                break;
            case 'tilted?':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._changeBlock(receiver, 'microbit_isTilted', 'value_boolean');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    this._addFieldInput(
                        block, 'DIRECTION', 'microbit_menu_tiltDirectionAny', 'tiltDirectionAny',
                        args[0], 'any'
                    );
                }
                break;
            case 'tilt_angle':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._changeBlock(receiver, 'microbit_getTiltAngle', 'value');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    this._addFieldInput(
                        block, 'DIRECTION', 'microbit_menu_tiltDirection', 'tiltDirection',
                        args[0], 'front'
                    );
                }
                break;
            }
        }
        return block;
    }
};

export default MicroBitConverter;
