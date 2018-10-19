/**
 * Define Ruby with Event Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.event_whenflagclicked = function (block) {
        Blockly.Ruby.targetEventBlock = block;
        return `${Blockly.Ruby.spriteName()}.when(:flag_clicked) do\n`;
    };

    Blockly.Ruby.event_whenthisspriteclicked = function (block) {
        Blockly.Ruby.targetEventBlock = block;
        return `${Blockly.Ruby.spriteName()}.when(:click) do\n`;
    };

    Blockly.Ruby.event_whenkeypressed = function (block) {
        Blockly.Ruby.targetEventBlock = block;
        const key = Blockly.Ruby.quote_(block.getFieldValue('KEY_OPTION')) || null;
        return `${Blockly.Ruby.spriteName()}.when(:key_pressed, ${key}) do\n`;
    };

    Blockly.Ruby.event_whenbackdropswitchesto = function (block) {
        Blockly.Ruby.targetEventBlock = block;
        const backdrop = Blockly.Ruby.quote_(block.getFieldValue('BACKDROP')) || null;
        return `${Blockly.Ruby.spriteName()}.when(:backdrop_switches, ${backdrop}) do\n`;
    };

    Blockly.Ruby.event_whengreaterthan = function (block) {
        Blockly.Ruby.targetEventBlock = block;
        const lh = Blockly.Ruby.quote_(block.getFieldValue('WHENGREATERTHANMENU')) || null;
        const rh = Blockly.Ruby.valueToCode(block, 'VALUE', Blockly.Ruby.ORDER_NONE) || '0';
        return `${Blockly.Ruby.spriteName()}.when(:greater_than, ${lh}, ${rh})  do\n`;
    };

    Blockly.Ruby.event_whenbroadcastreceived = function (block) {
        Blockly.Ruby.targetEventBlock = block;
        const message = Blockly.Ruby.broadcastMessageName(block.getFieldValue('BROADCAST_OPTION'));
        return `${Blockly.Ruby.spriteName()}.when(receive:, ${message}) do\n`;
    };

    Blockly.Ruby.event_broadcast = function (block) {
        const message = Blockly.Ruby.valueToCode(block, 'BROADCAST_INPUT', Blockly.Ruby.ORDER_NONE) || null;
        return `broadcast(${message})\n`;
    };

    Blockly.Ruby.event_broadcastandwait = function (block) {
        const message = Blockly.Ruby.valueToCode(block, 'BROADCAST_INPUT', Blockly.Ruby.ORDER_NONE) || null;
        return `broadcast_and_wait(${message})\n`;
    };

    Blockly.Ruby.event_broadcast_menu = function (block) {
        const message = Blockly.Ruby.broadcastMessageName(block.getFieldValue('BROADCAST_OPTION'));
        return [message, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.event_whenstageclicked = function (block) {
        Blockly.Ruby.targetEventBlock = block;
        return `Stage.when(:stage_clicked) do\n`;
    };

    return Blockly;
}
