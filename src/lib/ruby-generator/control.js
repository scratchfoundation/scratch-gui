/**
 * Define Ruby code generator for Control Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.control_wait = function (block) {
        const secs = Generator.valueToCode(block, 'DURATION', Generator.ORDER_NONE) || 0;
        return `sleep(${secs})\n`;
    };

    Generator.control_repeat = function (block) {
        const times = Generator.valueToCode(block, 'TIMES', Generator.ORDER_ATOMIC) || 0;
        const branch = Generator.statementToCode(block, 'SUBSTACK') || '';
        return `${times}.times do\n${branch}end\n`;
    };

    Generator.control_forever = function (block) {
        const branch = Generator.statementToCode(block, 'SUBSTACK') || '';
        return `loop do\n${branch}end\n`;
    };

    Generator.control_if = function (block) {
        const operator = Generator.valueToCode(block, 'CONDITION', Generator.ORDER_NONE) || false;
        const branch = Generator.statementToCode(block, 'SUBSTACK') || '';
        return `if ${operator}\n${branch}end\n`;
    };

    Generator.control_if_else = function (block) {
        const operator = Generator.valueToCode(block, 'CONDITION', Generator.ORDER_NONE) || false;
        const branch = Generator.statementToCode(block, 'SUBSTACK') || '';
        const branch2 = Generator.statementToCode(block, 'SUBSTACK2') || '';
        return `if ${operator}\n${branch}else\n${branch2}end\n`;
    };

    Generator.control_wait_until = function (block) {
        const operator = Generator.valueToCode(block, 'CONDITION', Generator.ORDER_NONE) || false;
        return `wait until ${operator}\n`;
    };

    Generator.control_repeat_until = function (block) {
        const operator = Generator.valueToCode(block, 'CONDITION', Generator.ORDER_NONE) || false;
        const branch = Generator.statementToCode(block, 'SUBSTACK') || '';
        return `until ${operator}\n${branch}end\n`;
    };

    Generator.control_stop = function (block) {
        const target = Generator.quote_(Generator.getFieldValue(block, 'STOP_OPTION') || 'all');
        return `stop(${target})\n`;
    };

    Generator.control_start_as_clone = function (block) {
        block.isStatement = true;
        return `${Generator.spriteName()}.when(:start_as_a_clone) do\n`;
    };

    Generator.control_create_clone_of = function (block) {
        const target = Generator.valueToCode(block, 'CLONE_OPTION', Generator.ORDER_NONE);
        return `create_clone(${target})\n`;
    };

    Generator.control_create_clone_of_menu = function (block) {
        const target = Generator.quote_(Generator.getFieldValue(block, 'CLONE_OPTION') || '_myself_');
        return [target, Generator.ORDER_ATOMIC];
    };

    Generator.control_delete_this_clone = function () {
        return 'delete_this_clone\n';
    };

    return Generator;
}
