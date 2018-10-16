/**
 * Define Ruby with Looks Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.looks_sayforsecs = function (block) {
        const message = Blockly.Ruby.valueToCode(block, 'MESSAGE', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        const secs = Blockly.Ruby.valueToCode(block, 'SECS', Blockly.Ruby.ORDER_NONE) || '0';
        return `say(message: ${message}, second: ${secs})\n`;
    };

    Blockly.Ruby.looks_say = function (block) {
        const message = Blockly.Ruby.valueToCode(block, 'MESSAGE', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        return `say(message: ${message})\n`;
    };

    Blockly.Ruby.looks_thinkforsecs = function (block) {
        const message = Blockly.Ruby.valueToCode(block, 'MESSAGE', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        const secs = Blockly.Ruby.valueToCode(block, 'SECS', Blockly.Ruby.ORDER_NONE) || '0';
        return `think(message: ${message}, second: ${secs})\n`;
    };

    Blockly.Ruby.looks_think = function (block) {
        const message = Blockly.Ruby.valueToCode(block, 'MESSAGE', Blockly.Ruby.ORDER_NONE) || Blockly.Ruby.quote_('');
        return `think(message: ${message})\n`;
    };

    Blockly.Ruby.looks_switchcostumeto = function (block) {
        const costume = Blockly.Ruby.valueToCode(block, 'COSTUME', Blockly.Ruby.ORDER_NONE) || null;
        return `switch_costume("${costume}")\n`;
    };

    Blockly.Ruby.looks_costume = function (block) {
        const costume = block.getFieldValue('COSTUME') || null;
        return [costume, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.looks_nextcostume = function () {
        return 'next_costume\n';
    };

    Blockly.Ruby.looks_switchbackdropto = function (block) {
        const backdrop = Blockly.Ruby.valueToCode(block, 'BACKDROP', Blockly.Ruby.ORDER_NONE) || null;
        return `switch_backdrop("${backdrop}")\n`;
    };

    Blockly.Ruby.looks_backdrops = function (block) {
        const backdrop = block.getFieldValue('BACKDROP') || null;
        return [backdrop, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.looks_nextbackdrop = function () {
        return 'next_backdrop\n';
    };

    Blockly.Ruby.looks_changesizeby = function (block) {
        const change = Blockly.Ruby.valueToCode(block, 'CHANGE', Blockly.Ruby.ORDER_NONE) || '0';
        return `self.size += ${change}\n`;
    };

    Blockly.Ruby.looks_setsizeto = function (block) {
        const size = Blockly.Ruby.valueToCode(block, 'SIZE', Blockly.Ruby.ORDER_NONE) || '0';
        return `self.size = ${size}\n`;
    };

    Blockly.Ruby.looks_changeeffectby = function (block) {
        const effect = block.getFieldValue('EFFECT') || null;
        const change = Blockly.Ruby.valueToCode(block, 'CHANGE', Blockly.Ruby.ORDER_NONE) || '0';
        return `change_effect_by("${effect}", ${change})\n`;
    };

    Blockly.Ruby.looks_seteffectto = function (block) {
        const effect = block.getFieldValue('EFFECT') || null;
        const value = Blockly.Ruby.valueToCode(block, 'VALUE', Blockly.Ruby.ORDER_NONE) || '0';
        return `set_effect("${effect}", ${value})\n`;
    };

    Blockly.Ruby.looks_cleargraphiceffects = function () {
        return 'clear_graphic_effects\n';
    };

    Blockly.Ruby.looks_show = function () {
        return 'show\n';
    };

    Blockly.Ruby.looks_hide = function () {
        return 'hide\n';
    };

    Blockly.Ruby.looks_gotofrontback = function (block) {
        const frontBack = block.getFieldValue('FRONT_BACK') || null;
        return `go_to_layer(:${frontBack})\n`;
    };

    Blockly.Ruby.looks_goforwardbackwardlayers = function (block) {
        const layer = Blockly.Ruby.valueToCode(block, 'NUM', Blockly.Ruby.ORDER_NONE) || '0';
        const forwardBackward = block.getFieldValue('FORWARD_BACKWARD') || null;
        return `go_layers(${layer}, :${forwardBackward})\n`;
    };

    Blockly.Ruby.looks_costumenumbername = function (block) {
        const numberName = block.getFieldValue('NUMBER_NAME') || null;
        return [`costume_${numberName}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.looks_backdropnumbername = function (block) {
        const numberName = block.getFieldValue('NUMBER_NAME') || null;
        return [`backdrop_${numberName}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.looks_size = function () {
        return ['size', Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.looks_switchbackdroptoandwait = function (block) {
        const backdrop = Blockly.Ruby.valueToCode(block, 'BACKDROP', Blockly.Ruby.ORDER_NONE) || null;
        return `switch_backdrop_to_and_wait(${backdrop})\n`;
    };

    return Blockly;
}
