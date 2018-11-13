/**
 * Define Ruby code generator for Colour Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.colour_picker = function (block) {
        const c = Generator.quote_(Generator.getFieldValue(block, 'COLOUR') || null);
        return [c, Generator.ORDER_ATOMIC];
    };

    return Generator;
}
