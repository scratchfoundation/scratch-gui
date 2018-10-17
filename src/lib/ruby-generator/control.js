/**
 * Define Ruby with Control Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.control_wait = function (block) {
        const secs = Blockly.Ruby.valueToCode(block, 'DURATION', Blockly.Ruby.ORDER_NONE) || '0';
        return `sleep(${secs})\n`;
    };

    Blockly.Ruby.control_repeat = function (block) {
        const times = Blockly.Ruby.valueToCode(block, 'TIMES', Blockly.Ruby.ORDER_NONE) || '0';
        const branch = Blockly.Ruby.statementToCode(block, 'SUBSTACK') || '\n';

        return `${times}.times do\n${branch}end\n`;
    };

    Blockly.Ruby.control_forever = function (block) {
        const branch = Blockly.Ruby.statementToCode(block, 'SUBSTACK') || '\n';
        return `forever do\n${branch}end\n`;
    };

    Blockly.Ruby.control_if = function (block) {
        const operator = Blockly.Ruby.valueToCode(block, 'CONDITION', Blockly.Ruby.ORDER_NONE) || 'false';
        const branch = Blockly.Ruby.statementToCode(block, 'SUBSTACK') || '\n';
        return `if ${operator}\n${branch}end\n`;
    };

    Blockly.Ruby.control_if_else = function (block) {
        const operator = Blockly.Ruby.valueToCode(block, 'CONDITION', Blockly.Ruby.ORDER_NONE) || 'false';
        const branch = Blockly.Ruby.statementToCode(block, 'SUBSTACK') || '\n';
        const branch2 = Blockly.Ruby.statementToCode(block, 'SUBSTACK2') || '\n';
        return `if ${operator}\n${branch}else\n${branch2}end\n`;
    };

    Blockly.Ruby.control_wait_until = function (block) {
        const operator = Blockly.Ruby.valueToCode(block, 'CONDITION', Blockly.Ruby.ORDER_NONE) || 'false';
        return `wait until ${operator}\n`;
    };

    Blockly.Ruby.control_repeat_until = function (block) {
        const operator = Blockly.Ruby.valueToCode(block, 'CONDITION', Blockly.Ruby.ORDER_NONE) || 'false';
        const branch = Blockly.Ruby.statementToCode(block, 'SUBSTACK') || '\n';
        return `until ${operator}\n${branch}end\n`;
    };

    // TODO 値を取得方法がわからない
    Blockly.Ruby.control_stop = function () {
        return '# wip: control_stop\n';
    };

    Blockly.Ruby.control_start_as_clone = function (block) {
        Blockly.Ruby.targetEventBlock = block;
        return `${Blockly.Ruby.spriteName()}.when(:cloned) do\n`;
    };

    Blockly.Ruby.control_create_clone_of = function (block) {
        const target = Blockly.Ruby.valueToCode(block, 'CLONE_OPTION', Blockly.Ruby.ORDER_NONE) || null;
        return `create_clone("${target}")\n`;
    };

    Blockly.Ruby.control_create_clone_of_menu = function (block) {
        const target = block.getFieldValue('CLONE_OPTION') || null;
        return [target, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.control_delete_this_clone = function () {
        return 'delete_this_clone\n';
    };

    return Blockly;
}
