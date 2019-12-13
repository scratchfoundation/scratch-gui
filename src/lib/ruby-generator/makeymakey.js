/**
 * Define Ruby code generator for MakeyMakey Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.makeymakey_menu_KEY = function (block) {
        const key = Generator.quote_(Generator.getFieldValue(block, 'KEY') || 'SPACE');
        return [key, Generator.ORDER_ATOMIC];
    };

    Generator.makeymakey_whenMakeyKeyPressed = function (block) {
        block.isStatement = true;
        const key = Generator.valueToCode(block, 'KEY', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:makey_key_pressed, ${key}) do\n`;
    };

    Generator.makeymakey_menu_SEQUENCE = function (block) {
        const sequence = Generator.quote_(Generator.getFieldValue(block, 'SEQUENCE') || 'LEFT UP RIGHT');
        return [sequence, Generator.ORDER_ATOMIC];
    };

    Generator.makeymakey_whenCodePressed = function (block) {
        block.isStatement = true;
        const sequence = Generator.valueToCode(block, 'SEQUENCE', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:makey_pressed_in_oder, ${sequence}) do\n`;
    };

    return Generator;
}
