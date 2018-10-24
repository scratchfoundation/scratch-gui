/**
 * Define Ruby with Procedure Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.procedures_definition = function (block) {
        block.isStatement = true;
        const customBlock = block.getInputTargetBlock('custom_block');
        return Blockly.Ruby.blockToCode(customBlock);
    };

    const blockToMethod = function (block, isCall) {
        const labels = [];
        const args = [];
        block.inputList.forEach(input => {
            switch (input.type) {
            case Blockly.DUMMY_INPUT:
                if (input.fieldRow[0]) {
                    labels.push(Blockly.Ruby.escapeMethodName(input.fieldRow[0].getValue()));
                }
                break;
            case Blockly.INPUT_VALUE:
                if (isCall) {
                    // if argument is boolean and does not specify, valueToCode return null.
                    // so, default value is false.
                    const value = Blockly.Ruby.valueToCode(block, input.name, Blockly.Ruby.ORDER_NONE) || false;
                    args.push(Blockly.Ruby.nosToCode(value));
                } else {
                    const b = input.connection.targetBlock();
                    args.push(Blockly.Ruby.escapeVariableName(b.getFieldValue('VALUE')));
                }
                break;
            }
        });
        let methodName = labels.join('_');
        if (methodName.length === 0) {
            methodName = 'procedure';
        }
        const argsString = args.length > 0 ? `(${args.join(', ')})` : '';
        return `${isCall ? '' : 'def self.'}${methodName}${argsString}\n`;
    };

    Blockly.Ruby.procedures_call = function (block) {
        return blockToMethod(block, true);
    };

    Blockly.Ruby.procedures_prototype = function (block) {
        return blockToMethod(block, false);
    };

    Blockly.Ruby.argument_reporter_boolean = function (block) {
        return [Blockly.Ruby.escapeVariableName(block.getFieldValue('VALUE')), Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.argument_reporter_string_number = function (block) {
        return [Blockly.Ruby.escapeVariableName(block.getFieldValue('VALUE')), Blockly.Ruby.ORDER_ATOMIC];
    };

    return Blockly;
}
