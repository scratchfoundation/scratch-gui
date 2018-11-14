/**
 * Define Ruby code generator for Math Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.math_number = function (block) {
        let n = Number(Generator.getFieldValue(block, 'NUM'));
        if (isNaN(n)) {
            n = 0;
        }
        const order = n < 0 ? Generator.ORDER_UNARY_SIGN : Generator.ORDER_ATOMIC;
        return [n, order];
    };

    ['math_integer', 'math_whole_number', 'math_positive_number', 'math_angle'].forEach(name => {
        Generator[name] = Generator.math_number;
    });

    return Generator;
}
