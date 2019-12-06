/**
 * Define Ruby code generator for LEGO_EV3 Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    const Ev3SensorMenu = ['1', '2', '3', '4'];
    const Ev3MotorMenu = ['A', 'B', 'C', 'D'];

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

    Generator.ev3_menu_motorPorts = function (block) {
        const index = Generator.getFieldValue(block, 'motorPorts') || 0;
        const port = Generator.quote_(Ev3MotorMenu[index]);
        return [port, Generator.ORDER_ATOMIC];
    };

    Generator.ev3_motorSetPower = function (block) {
        const port = Generator.valueToCode(block, 'PORT', Generator.ORDER_NONE) || null;
        const power = Generator.valueToCode(block, 'POWER', Generator.ORDER_NONE) || null;
        return `ev3_motor_set_power(${port}, ${power})\n`;
    };

    Generator.ev3_motorTurnClockwise = function (block) {
        const port = Generator.valueToCode(block, 'PORT', Generator.ORDER_NONE) || null;
        const time = Generator.valueToCode(block, 'TIME', Generator.ORDER_NONE) || null;
        return `ev3_motor_turn_this_way_for(${port}, ${time})\n`;
    };

    Generator.ev3_motorTurnCounterClockwise = function (block) {
        const port = Generator.valueToCode(block, 'PORT', Generator.ORDER_NONE) || null;
        const time = Generator.valueToCode(block, 'TIME', Generator.ORDER_NONE) || null;
        return `ev3_motor_turn_that_way_for(${port}, ${time})\n`;
    };

    Generator.ev3_getMotorPosition = function (block) {
        const port = Generator.valueToCode(block, 'PORT', Generator.ORDER_NONE) || null;
        return `ev3_motor_position(${port})\n`;
    };

    Generator.ev3_whenDistanceLessThan = function (block) {
        block.isStatement = true;
        const distance = Generator.valueToCode(block, 'DISTANCE', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:ev3_distance_<, ${distance}) do\n`;
    };

    Generator.ev3_whenBrightnessLessThan = function (block) {
        block.isStatement = true;
        const distance = Generator.valueToCode(block, 'DISTANCE', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:ev3_brightness_<, ${distance}) do\n`;
    };

    Generator.ev3_buttonPressed = function (block) {
        const port = Generator.valueToCode(block, 'PORT', Generator.ORDER_NONE) || null;
        return `ev3_button_pressed(${port})\n`;
    };

    Generator.ev3_getDistance = function () {
        return ['ev3_distance', Generator.ORDER_ATOMIC];
    };

    Generator.ev3_getBrightness = function () {
        return ['ev3_brightness', Generator.ORDER_ATOMIC];
    };

    Generator.ev3_beep = function (block) {
        const note = Generator.valueToCode(block, 'NOTE', Generator.ORDER_NONE) || null;
        const time = Generator.valueToCode(block, 'TIME', Generator.ORDER_NONE) || null;
        return `ev3_beep_note(${note}, ${time})\n`;
    };

    return Generator;
}