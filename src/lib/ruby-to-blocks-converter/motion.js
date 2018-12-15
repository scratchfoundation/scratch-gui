/* global Opal */
import _ from 'lodash';

const RotationStyle = [
    'left-right',
    'don\'t rotate',
    'all around'
];

/**
 * Motion converter
 */
const MotionConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'move':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('motion_movesteps', 'statement');
                    this._addNumberInput(block, 'STEPS', 'math_number', args[0], 10);
                }
                break;
            case 'turn_right':
            case 'turn_left':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock(
                        name === 'turn_right' ? 'motion_turnright' : 'motion_turnleft', 'statement'
                    );
                    this._addNumberInput(block, 'DEGREES', 'math_number', args[0], 15);
                }
                break;
            case 'go_to':
                if (args.length === 1) {
                    if (this._isString(args[0])) {
                        block = this._createBlock('motion_goto', 'statement');
                        this._addInput(block, 'TO', this._createFieldBlock('motion_goto_menu', 'TO', args[0]));
                    } else if (this._isArray(args[0]) && args[0].length === 2 &&
                               this._isNumberOrBlock(args[0].value[0]) && this._isNumberOrBlock(args[0].value[1])) {
                        block = this._createBlock('motion_gotoxy', 'statement');
                        this._addNumberInput(block, 'X', 'math_number', args[0].value[0], 0);
                        this._addNumberInput(block, 'Y', 'math_number', args[0].value[1], 0);
                    }
                }
                break;
            case 'glide':
                if (args.length === 2 && this._isHash(args[1]) && args[1].size === 1) {
                    const secs = args[1].get('sym:secs');
                    if (this._isNumberOrBlock(secs)) {
                        if (this._isString(args[0])) {
                            block = this._createBlock('motion_glideto', 'statement');
                            this._addInput(block, 'TO', this._createFieldBlock('motion_glideto_menu', 'TO', args[0]));
                        } else if (this._isArray(args[0]) && args[0].length === 2 &&
                                   this._isNumberOrBlock(args[0].value[0]) && this._isNumberOrBlock(args[0].value[1])) {
                            block = this._createBlock('motion_glidesecstoxy', 'statement');
                            this._addNumberInput(block, 'X', 'math_number', args[0].value[0], 0);
                            this._addNumberInput(block, 'Y', 'math_number', args[0].value[1], 0);
                        }
                        if (block) {
                            this._addNumberInput(block, 'SECS', 'math_number', secs, 1);
                        }
                    }
                }
                break;
            case 'direction=':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('motion_pointindirection', 'statement');
                    this._addNumberInput(block, 'DIRECTION', 'math_angle', args[0], 90);
                }
                break;
            case 'point_towards':
                if (args.length === 1 && this._isString(args[0])) {
                    block = this._createBlock('motion_pointtowards', 'statement');
                    this._addInput(
                        block,
                        'TOWARDS',
                        this._createFieldBlock('motion_pointtowards_menu', 'TOWARDS', args[0])
                    );
                }
                break;
            case 'bounce_if_on_edge':
                if (args.length === 0) {
                    block = this._createBlock('motion_ifonedgebounce', 'statement');
                }
                break;
            case 'rotation_style=': {
                if (args.length === 1 && this._isString(args[0]) && RotationStyle.indexOf(args[0].toString()) >= 0) {
                    block = this._createBlock('motion_setrotationstyle', 'statement');
                    this._addField(block, 'STYLE', args[0]);
                }
                break;
            }
            case 'x=':
            case 'y=':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    let xy;
                    if (name === 'x=') {
                        xy = 'x';
                    } else {
                        xy = 'y';
                    }
                    block = this._createBlock(`motion_set${xy}`, 'statement');
                    this._addNumberInput(block, _.toUpper(xy), 'math_number', args[0], 0);
                }
                break;
            case 'x':
            case 'y':
                if (args.length === 0) {
                    let xy;
                    if (name === 'x') {
                        xy = 'x';
                    } else {
                        xy = 'y';
                    }
                    block = this._createBlock(`motion_${xy}position`, 'value');
                }
                break;
            case 'direction':
                if (args.length === 0) {
                    block = this._createBlock('motion_direction', 'value');
                }
                break;
            }
        }
        return block;
    },

    // eslint-disable-next-line no-unused-vars
    onOpAsgn: function (lh, operator, rh) {
        let block;
        if (this._isBlock(lh) && operator === '+' && this._isNumberOrBlock(rh)) {
            let xy;
            switch (lh.opcode) {
            case 'motion_xposition':
            case 'motion_yposition':
                if (lh.opcode === 'motion_xposition') {
                    xy = 'x';
                } else {
                    xy = 'y';
                }
                block = this._changeBlock(lh, `motion_change${xy}by`, 'statement');
                this._addNumberInput(block, `D${_.toUpper(xy)}`, 'math_number', rh, 10);
                break;
            }
        }
        return block;
    }
};

export default MotionConverter;
