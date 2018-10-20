/**
 * Define Ruby with Data Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.data_variable = function (block) {
        const variable = Blockly.Ruby.variableName(block.getFieldValue('VARIABLE'));
        return [`${variable}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.data_setvariableto = function (block) {
        const variable = Blockly.Ruby.variableName(block.getFieldValue('VARIABLE'));
        const value = Blockly.Ruby.valueToCode(block, 'VALUE', Blockly.Ruby.ORDER_NONE) || '0';
        return `${variable} = ${value}\n`;
    };

    Blockly.Ruby.data_changevariableby = function (block) {
        const variable = Blockly.Ruby.variableName(block.getFieldValue('VARIABLE'));
        const value = Blockly.Ruby.valueToCode(block, 'VALUE', Blockly.Ruby.ORDER_NONE) || 0;
        return `${variable} += ${value}\n`;
    };

    Blockly.Ruby.data_showvariable = function (block) {
        const variable = Blockly.Ruby.variableName(block.getFieldValue('VARIABLE'));
        return `show_variable(${variable})\n`;
    };

    Blockly.Ruby.data_hidevariable = function (block) {
        const variable = Blockly.Ruby.variableName(block.getFieldValue('VARIABLE'));
        return `hide_variable(${variable})\n`;
    };

    Blockly.Ruby.data_listcontents = function (block) {
        const list = Blockly.Ruby.listName(block.getFieldValue('LIST'));
        return [`${list}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.data_addtolist = function (block) {
        const item = Blockly.Ruby.valueToCode(block, 'ITEM', Blockly.Ruby.ORDER_NONE) || '0';
        const list = Blockly.Ruby.listName(block.getFieldValue('LIST'));
        return `${list}.push(${item})\n`;
    };

    Blockly.Ruby.data_deleteoflist = function (block) {
        const index = Blockly.Ruby.valueToCode(block, 'INDEX', Blockly.Ruby.ORDER_NONE) - 1 || 0;
        const list = Blockly.Ruby.listName(block.getFieldValue('LIST'));
        return `${list}.delete_at(${index})\n`;
    };

    Blockly.Ruby.data_deletealloflist = function (block) {
        const list = Blockly.Ruby.listName(block.getFieldValue('LIST'));
        return `${list}.clear\n`;
    };

    Blockly.Ruby.data_insertatlist = function (block) {
        const index = Blockly.Ruby.valueToCode(block, 'INDEX', Blockly.Ruby.ORDER_NONE) - 1 || 0;
        const item = Blockly.Ruby.valueToCode(block, 'ITEM', Blockly.Ruby.ORDER_NONE) || '0';
        const list = Blockly.Ruby.listName(block.getFieldValue('LIST'));
        return `${list}.insert(${index}, ${item})\n`;
    };

    Blockly.Ruby.data_replaceitemoflist = function (block) {
        const index = Blockly.Ruby.valueToCode(block, 'INDEX', Blockly.Ruby.ORDER_INDEX) - 1 || 0;
        const item = Blockly.Ruby.valueToCode(block, 'ITEM', Blockly.Ruby.ORDER_NONE) || '0';
        const list = Blockly.Ruby.listName(block.getFieldValue('LIST'));
        return `${list}[${index}] = ${item}\n`;
    };

    Blockly.Ruby.data_itemoflist = function (block) {
        const index = Blockly.Ruby.valueToCode(block, 'INDEX', Blockly.Ruby.ORDER_INDEX) - 1 || 0;
        const list = Blockly.Ruby.listName(block.getFieldValue('LIST'));
        return [`${list}[${index}]`, Blockly.Ruby.ORDER_FUNCTION_CAL];
    };

    Blockly.Ruby.data_itemnumoflist = function (block) {
        const item = Blockly.Ruby.valueToCode(block, 'ITEM', Blockly.Ruby.ORDER_NONE) || '0';
        const list = Blockly.Ruby.listName(block.getFieldValue('LIST'));
        return [`${list}.index(${item})`, Blockly.Ruby.ORDER_FUNCTION_CAL];
    };

    Blockly.Ruby.data_lengthoflist = function (block) {
        const list = Blockly.Ruby.listName(block.getFieldValue('LIST'));
        return [`${list}.length`, Blockly.Ruby.ORDER_FUNCTION_CAL];
    };

    Blockly.Ruby.data_listcontainsitem = function (block) {
        const order = Blockly.Ruby.ORDER_FUNCTION_CALL;
        const item = Blockly.Ruby.valueToCode(block, 'ITEM', order) || '0';
        const list = Blockly.Ruby.listName(block.getFieldValue('LIST'));
        return [`${list}.include?(${item})`, order];
    };

    Blockly.Ruby.data_showlist = function (block) {
        const list = Blockly.Ruby.listName(block.getFieldValue('LIST'));
        return `show_list(${list})\n`;
    };

    Blockly.Ruby.data_hidelist = function (block) {
        const list = Blockly.Ruby.listName(block.getFieldValue('LIST'));
        return `hide_list(${list})\n`;
    };

    return Blockly;
}
