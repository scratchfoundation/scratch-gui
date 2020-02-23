/* global Opal */
import _ from 'lodash';

/**
 * Pen converter
 */
const PenConverter = {
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'pen_clear':
                if (args.length === 0) {
                    block = this._createBlock('pen_clear', 'statement');
                }
                break;
            case 'pen_stamp':
                if (args.length === 0) {
                    block = this._createBlock('pen_stamp', 'statement');
                }
                break;
            case 'pen_down':
                if (args.length === 0) {
                    block = this._createBlock('pen_penDown', 'statement');
                }
                break;
            case 'pen_up':
                if (args.length === 0) {
                    block = this._createBlock('pen_penUp', 'statement');
                }
                break;
            case 'pen_color=':
                if (args.length === 1 && this._isColorOrBlock(args[0])) {
                    block = this._createBlock('pen_setPenColorToColor', 'statement');
                    this._addFieldInput(block, 'COLOR', 'colour_picker', 'COLOUR', args[0], '#43066f');
                }
                break;
            case 'color=':
            case 'saturation=':
            case 'brightness=':
            case 'transparency=':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('pen_setPenColorParamTo', 'statement');
                    this._addFieldInput(
                        block, 'COLOR_PARAM', 'pen_menu_colorParam', 'colorParam',
                        name.replace('=', ''), 'color'
                    );
                    this._addNumberInput(block, 'VALUE', 'math_number', args[0], 50);
                }
                break;
            case 'pen_size=':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('pen_setPenSizeTo', 'statement');
                    this._addNumberInput(block, 'SIZE', 'math_number', args[0], 1);
                }
                break;
            }
        }
        return block;
    },

    // eslint-disable-next-line no-unused-vars
    onOpAsgn: function (lh, operator, rh) {
        let block;
        if (this._isRubyStatement(lh) && operator === '+' && this._isNumberOrBlock(rh)) {
            const code = this._getRubyStatement(lh);
            switch (code) {
            case 'self.pen_size':
                block = this._changeBlock(lh, 'pen_changePenSizeBy', 'statement');
                this._addNumberInput(block, 'SIZE', 'math_number', rh, 1);
                break;
            case 'self.color':
            case 'self.saturation':
            case 'self.brightness':
            case 'self.transparency':
                block = this._changeBlock(lh, 'pen_changePenColorParamBy', 'statement');
                this._addFieldInput(
                    block, 'COLOR_PARAM', 'pen_menu_colorParam', 'colorParam',
                    code.replace('self.', ''), 'color'
                );
                this._addNumberInput(block, 'VALUE', 'math_number', rh, 10);
                break;
            }
        }
        return block;
    }
};

export default PenConverter;
