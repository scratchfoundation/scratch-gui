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

    return Generator;
}
