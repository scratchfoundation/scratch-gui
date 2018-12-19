/**
 * Define Ruby code generator for Event Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.event_whenflagclicked = function (block) {
        block.isStatement = true;
        return `${Generator.spriteName()}.when(:flag_clicked) do\n`;
    };

    Generator.event_whenkeypressed = function (block) {
        block.isStatement = true;
        const key = Generator.quote_(Generator.getFieldValue(block, 'KEY_OPTION') || null);
        return `${Generator.spriteName()}.when(:key_pressed, ${key}) do\n`;
    };

    Generator.event_whenthisspriteclicked = function (block) {
        block.isStatement = true;
        return `${Generator.spriteName()}.when(:clicked) do\n`;
    };

    Generator.event_whenbackdropswitchesto = function (block) {
        block.isStatement = true;
        const backdrop = Generator.quote_(Generator.getFieldValue(block, 'BACKDROP') || '');
        return `${Generator.spriteName()}.when(:backdrop_switches, ${backdrop}) do\n`;
    };

    Generator.event_whengreaterthan = function (block) {
        block.isStatement = true;
        const lh = Generator.quote_(Generator.getFieldValue(block, 'WHENGREATERTHANMENU').toLowerCase() || '');
        const rh = Generator.valueToCode(block, 'VALUE', Generator.ORDER_NONE) || '0';
        return `${Generator.spriteName()}.when(:greater_than, ${lh}, ${rh}) do\n`;
    };

    Generator.event_whenbroadcastreceived = function (block) {
        block.isStatement = true;
        const message = Generator.getFieldValue(block, 'BROADCAST_OPTION');
        return `${Generator.spriteName()}.when(:receive, ${Generator.quote_(message)}) do\n`;
    };

    Generator.event_broadcast = function (block) {
        const message = Generator.valueToCode(block, 'BROADCAST_INPUT', Generator.ORDER_NONE) || null;
        return `broadcast(${message})\n`;
    };

    Generator.event_broadcastandwait = function (block) {
        const message = Generator.valueToCode(block, 'BROADCAST_INPUT', Generator.ORDER_NONE) || null;
        return `broadcast_and_wait(${message})\n`;
    };

    Generator.event_broadcast_menu = function (block) {
        const message = Generator.getFieldValue(block, 'BROADCAST_OPTION');
        return [Generator.quote_(message), Generator.ORDER_ATOMIC];
    };

    Generator.event_whenstageclicked = function (block) {
        block.isStatement = true;
        return `Stage.when(:clicked) do\n`;
    };

    return Generator;
}
