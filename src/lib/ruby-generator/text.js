/**
 * Define Ruby code generator for Text Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.text = function (block) {
        const text = Generator.quote_(Generator.getFieldValue(block, 'TEXT'));
        return [text, Generator.ORDER_ATOMIC];
    };

    return Generator;
}
