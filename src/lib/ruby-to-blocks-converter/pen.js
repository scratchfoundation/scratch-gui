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
            case 'pen_saturation=':
            case 'pen_brightness=':
            case 'pen_transparency=':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('pen_setPenColorParamTo', 'statement');
                    this._addFieldInput(
                        block, 'COLOR_PARAM', 'pen_menu_colorParam', 'colorParam',
                        name.replace('pen_', '').replace('=', ''), 'color'
                    );
                    this._addNumberInput(block, 'VALUE', 'math_number', args[0], 50);
                } else if (name == 'pen_color=' && args.length === 1 && this._isColorOrBlock(args[0])) {
                    block = this._createBlock('pen_setPenColorToColor', 'statement');
                    this._addFieldInput(block, 'COLOR', 'colour_picker', 'COLOUR', args[0], '#43066f');
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
                delete this._context.blocks[block.inputs.STATEMENT.block];
                delete block.inputs.STATEMENT;

                this._addNumberInput(block, 'SIZE', 'math_number', rh, 1);
                break;
            case 'self.pen_color':
            case 'self.pen_saturation':
            case 'self.pen_brightness':
            case 'self.pen_transparency':
                block = this._changeBlock(lh, 'pen_changePenColorParamBy', 'statement');
                delete this._context.blocks[block.inputs.STATEMENT.block];
                delete block.inputs.STATEMENT;

                this._addFieldInput(
                    block, 'COLOR_PARAM', 'pen_menu_colorParam', 'colorParam',
                    code.replace('self.pen_', ''), 'color'
                );
                this._addNumberInput(block, 'VALUE', 'math_number', rh, 10);
                break;
            }
        }
        return block;
    }
};

export default PenConverter;
