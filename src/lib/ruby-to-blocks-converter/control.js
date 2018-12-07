/* global Opal */
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
            }
        }
        return block;
    }
};

export default ControlConverter;
