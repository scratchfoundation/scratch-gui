/**
 * Define Ruby code generator for Ruby Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    const getUnquoteText = function (block, fieldName, order) {
        const input = block.inputs[fieldName];
        if (input) {
            const targetBlock = Generator.getBlock(input.block);
            if (targetBlock && targetBlock.opcode === 'text') {
                return Generator.getFieldValue(targetBlock, 'TEXT') || '';
            }
        }
        return Generator.valueToCode(block, fieldName, order);
    };

    Generator.ruby_statement = function (block) {
        const statement = getUnquoteText(block, 'STATEMENT', Generator.ORDER_NONE);
        return `${statement}\n`;
    };

    Generator.ruby_statement_with_block = function (block) {
        const statement = getUnquoteText(block, 'STATEMENT', Generator.ORDER_NONE);
        let args = getUnquoteText(block, 'ARGS', Generator.ORDER_NONE);
        if (args.length > 0) {
            args = ` ${args}`;
        }
        const branch = Generator.statementToCode(block, 'SUBSTACK') || '';
        return `${statement} do${args}\n${branch}end\n`;
    };

    Generator.ruby_expression = function (block) {
        const expression = getUnquoteText(block, 'EXPRESSION', Generator.ORDER_NONE);
        return [expression, Generator.ORDER_ATOMIC];
    };

    Generator.ruby_range = function (block) {
        const fromNum = Generator.valueToCode(block, 'FROM', Generator.ORDER_RANGE) || 1;
        const toNum = Generator.valueToCode(block, 'TO', Generator.ORDER_RANGE) || 10;
        return [`${fromNum}..${toNum}`, Generator.ORDER_FUNCTION_CALL];
    };

    Generator.ruby_exclude_range = function (block) {
        const fromNum = Generator.valueToCode(block, 'FROM', Generator.ORDER_RANGE) || 1;
        const toNum = Generator.valueToCode(block, 'TO', Generator.ORDER_RANGE) || 10;
        return [`${fromNum}...${toNum}`, Generator.ORDER_FUNCTION_CALL];
    };

    return Generator;
}
