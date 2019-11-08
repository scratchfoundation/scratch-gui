/**
 * Define Ruby code generator for WeDo 2.0 Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.wedo2_getDistance = function (block) {
        return [`wedo2_distance`, Generator.ORDER_ATOMIC];
    };

    return Generator;
}
