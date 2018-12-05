/**
 * Define Ruby code generator for Variables Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.data_variable = function (block) {
        const variable = Generator.variableName(Generator.getFieldId(block, 'VARIABLE'));
        return [variable, Generator.ORDER_ATOMIC];
    };

    Generator.data_setvariableto = function (block) {
        const variable = Generator.variableName(Generator.getFieldId(block, 'VARIABLE'));
        const value = Generator.valueToCode(block, 'VALUE', Generator.ORDER_NONE) || '0';
        return `${variable} = ${Generator.nosToCode(value)}\n`;
    };

    Generator.data_changevariableby = function (block) {
        const variable = Generator.variableName(Generator.getFieldId(block, 'VARIABLE'));
        const value = Generator.valueToCode(block, 'VALUE', Generator.ORDER_NONE) || 0;
        return `${variable} += ${Generator.nosToCode(value)}\n`;
    };

    Generator.data_showvariable = function (block) {
        const variable = Generator.variableName(Generator.getFieldId(block, 'VARIABLE'));
        return `show_variable(${Generator.quote_(variable)})\n`;
    };

    Generator.data_hidevariable = function (block) {
        const variable = Generator.variableName(Generator.getFieldId(block, 'VARIABLE'));
        return `hide_variable(${Generator.quote_(variable)})\n`;
    };

    const getListName = function (block) {
        const list = Generator.listName(Generator.getFieldId(block, 'LIST'));
        return `list(${Generator.quote_(list)})`;
    };

    Generator.data_listcontents = function (block) {
        const list = getListName(block);
        return [list, Generator.ORDER_COLLECTION];
    };

    Generator.data_addtolist = function (block) {
        const item = Generator.valueToCode(block, 'ITEM', Generator.ORDER_NONE) || '0';
        const list = getListName(block);
        return `${list}.push(${Generator.nosToCode(item)})\n`;
    };

    Generator.data_deleteoflist = function (block) {
        const index = Generator.valueToCode(block, 'INDEX', Generator.ORDER_NONE) - 1 || 0;
        const list = getListName(block);
        return `${list}.delete_at(${Generator.nosToCode(index)})\n`;
    };

    Generator.data_deletealloflist = function (block) {
        const list = getListName(block);
        return `${list}.clear\n`;
    };

    Generator.data_insertatlist = function (block) {
        const index = Generator.valueToCode(block, 'INDEX', Generator.ORDER_NONE) - 1 || 0;
        const item = Generator.valueToCode(block, 'ITEM', Generator.ORDER_NONE) || '0';
        const list = getListName(block);
        return `${list}.insert(${index}, ${Generator.nosToCode(item)})\n`;
    };

    Generator.data_replaceitemoflist = function (block) {
        const index = Generator.valueToCode(block, 'INDEX', Generator.ORDER_INDEX) - 1 || 0;
        const item = Generator.valueToCode(block, 'ITEM', Generator.ORDER_NONE) || '0';
        const list = getListName(block);
        return `${list}[${index}] = ${Generator.nosToCode(item)}\n`;
    };

    Generator.data_itemoflist = function (block) {
        const index = Generator.valueToCode(block, 'INDEX', Generator.ORDER_INDEX) - 1 || 0;
        const list = getListName(block);
        return [`${list}[${index}]`, Generator.ORDER_FUNCTION_CAL];
    };

    Generator.data_itemnumoflist = function (block) {
        const item = Generator.valueToCode(block, 'ITEM', Generator.ORDER_NONE) || '0';
        const list = getListName(block);
        return [`${list}.index(${Generator.nosToCode(item)})`, Generator.ORDER_FUNCTION_CAL];
    };

    Generator.data_lengthoflist = function (block) {
        const list = getListName(block);
        return [`${list}.length`, Generator.ORDER_FUNCTION_CAL];
    };

    Generator.data_listcontainsitem = function (block) {
        const order = Generator.ORDER_FUNCTION_CALL;
        const item = Generator.valueToCode(block, 'ITEM', order) || '0';
        const list = getListName(block);
        return [`${list}.include?(${Generator.nosToCode(item)})`, order];
    };

    Generator.data_showlist = function (block) {
        const list = Generator.listName(Generator.getFieldId(block, 'LIST'));
        return `show_list(${Generator.quote_(list)})\n`;
    };

    Generator.data_hidelist = function (block) {
        const list = Generator.listName(Generator.getFieldId(block, 'LIST'));
        return `hide_list(${Generator.quote_(list)})\n`;
    };

    return Generator;
}
