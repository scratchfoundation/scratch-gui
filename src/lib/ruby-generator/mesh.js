/**
 * Define Ruby code generator for Mesh Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.mesh_menu_variableNames = function (block) {
        const name = Generator.quote_(Generator.getFieldValue(block, 'variableNames') || ' ');
        return [name, Generator.ORDER_ATOMIC];
    };

    Generator.mesh_getSensorValue = function (block) {
        const name = Generator.valueToCode(block, 'NAME', Generator.ORDER_NONE) || '" "';
        return [`mesh_sensor_value(${name})`, Generator.ORDER_ATOMIC];
    };

    return Generator;
}
