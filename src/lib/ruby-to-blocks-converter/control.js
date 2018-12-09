/* global Opal */

/* eslint-disable no-invalid-this */
const createControlRepeatBlock = function (times, body) {
    const block = this._createBlock('control_repeat', 'statement');
    this._addNumberInput(block, 'TIMES', 'math_whole_number', times, 10);
    this._addSubstack(block, body);
    return block;
};
/* eslint-enable no-invalid-this */

/**
 * Control converter
 */
const ControlConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if (this._isSelf(receiver) || receiver === Opal.nil) {
            switch (name) {
            case 'sleep':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('control_wait', 'statement');
                    this._addNumberInput(block, 'DURATION', 'math_positive_number', args[0], 1);
                }
                break;
            case 'repeat':
                if (args.length === 1 && this._isNumberOrBlock(args[0]) &&
                    rubyBlockArgs && rubyBlockArgs.length === 0) {
                    block = createControlRepeatBlock.call(this, args[0], rubyBlock);
                }
                break;
            case 'loop':
            case 'forever':
                if (args.length === 0 &&
                    rubyBlockArgs && rubyBlockArgs.length === 0 &&
                    rubyBlock && (name !== 'loop' || this._popWaitBlock(rubyBlock))) {
                    block = this._createBlock('control_forever', 'statement');
                    this._addSubstack(block, rubyBlock);
                }
                break;
            }
        } else if (this._isNumberOrBlock(receiver)) {
            switch (name) {
            case 'times':
                if (args.length === 0 &&
                    rubyBlockArgs && rubyBlockArgs.length === 0 &&
                    rubyBlock && rubyBlock.length >= 1) {
                    const waitBlock = this._popWaitBlock(rubyBlock);
                    if (waitBlock) {
                        block = createControlRepeatBlock.call(this, receiver, rubyBlock);
                    }
                }
                break;
            }
        }
        return block;
    }
};

export default ControlConverter;
