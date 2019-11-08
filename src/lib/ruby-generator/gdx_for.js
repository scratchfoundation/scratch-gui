/**
 * Define Ruby code generator for Go Direct Force & Acceleration Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {

    Generator.gdxfor_getForce = function(){
        return  [`gdx_for_force`, Generator.ORDER_ATOMIC];
    };

    return Generator;
}
