/**
 * Define Ruby code generator for LEGO_EV3 Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    const Ev3SensorMenu = ['1', '2', '3', '4'];

    Generator.ev3_menu_sensorPorts = function (block) {
        const index = Generator.getFieldValue(block, 'sensorPorts') || 0;
        const port = Generator.quote_(Ev3SensorMenu[index]);
        return [port, Generator.ORDER_ATOMIC];
    };

    Generator.ev3_whenButtonPressed = function (block) {
        block.isStatement = true;
        const port = Generator.valueToCode(block, 'PORT', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:ev3_button_pressed, ${port}) do\n`;
    };

    return Generator;
}