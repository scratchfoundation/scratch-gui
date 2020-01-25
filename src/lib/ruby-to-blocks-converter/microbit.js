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
        console.log(arguments);
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
                    )
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
            }
        }
        return block;
    }
};

export default MicroBitConverter;
