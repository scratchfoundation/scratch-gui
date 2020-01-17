/**
 * Define Ruby code generator for WeDo 2.0 Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.wedo2_menu_MOTOR_ID = function (block) {
        const motor_id = Generator.quote_(Generator.getFieldValue(block, 'MOTOR_ID') || 'motor');
        return [motor_id, Generator.ORDER_ATOMIC]
    };
    Generator.wedo2_motorOnFor = function (block) {
        const motor_id = Generator.valueToCode(block, 'MOTOR_ID', Generator.ORDER_NONE) || null;
        const duration = Generator.valueToCode(block, 'DURATION', Generator.ORDER_NONE) || null;
        return `wedo2_turn_motor_on_for(${motor_id}, ${duration})\n`;
    };

    Generator.wedo2_motorOn = function (block) {
        const motor_id = Generator.valueToCode(block, 'MOTOR_ID', Generator.ORDER_NONE) || null;
        return `wedo2_trun_motor_on(${motor_id})\n`;
    };

    Generator.wedo2_motorOff = function (block) {
        const motor_id = Generator.valueToCode(block, 'MOTOR_ID', Generator.ORDER_NONE) || null;
        return `wedo2_trun_motor_off(${motor_id})\n`;
    };

    Generator.wedo2_startMotorPower = function (block) {
        const motor_id = Generator.valueToCode(block, 'MOTOR_ID', Generator.ORDER_NONE) || null;
        const power =Generator.valueToCode(block, 'POWER', Generator.ORDER_NONE) || null;
        return `wedo2_set_motor_power(${motor_id}, ${power})\n`;
    };

    Generator.wedo2_menu_MOTOR_DIRECTION = function (block) {
        const motor_direction = Generator.quote_(Generator.getFieldValue(block, 'MOTOR_DIRECTION') || 'this way');
        return [motor_direction, Generator.ORDER_ATOMIC];
    };

    Generator.wedo2_setMotorDirection = function (block) {
        const motor_id = Generator.valueToCode(block, 'MOTOR_ID', Generator.ORDER_NONE) || null;
        const motor_direction = Generator.valueToCode(block, 'MOTOR_DIRECTION', Generator.ORDER_NONE) || null;
        return `wedo2_set_motor_direction(${motor_id}, ${motor_direction})\n`;
    };

    Generator.wedo2_setLightHue = function (block) {
        const hue = Generator.valueToCode(block, 'HUE', Generator.ORDER_NONE) || null;
        return `wedo2_set_light_color(${hue})\n`;
    };

    Generator.wedo2_menu_OP = function (block) {
        const op = Generator.quote_(Generator.getFieldValue(block, 'OP') || '<');
        return [op, Generator.ORDER_ATOMIC];
    };

    Generator.wedo2_whenDistance = function (block) {
        block.isStatement = true;
        const op = Generator.valueToCode(block, 'OP', Generator.ORDER_NONE) || null;
        const reference = Generator.valueToCode(block, 'REFERENCE', Generator.ORDER_NONE) || null;
        return `wedo2_when_distance(${op}, ${reference}) do\n`;
    };

    Generator.wedo2_menu_TILT_DIRECTION_ANY = function (block) {
        const tilt_direction_any = Generator.quote_(Generator.getFieldValue(block, 'TILT_DIRECTION_ANY') || 'any');
        return [tilt_direction_any, Generator.ORDER_ATOMIC];
    };

    Generator.wedo2_whenTilted = function (block) {
        block.isStatement = true;
        const tilt_direction_any = Generator.valueToCode(block, 'TILT_DIRECTION_ANY', Generator.ORDER_NONE)  || null;
        return `wedo2_when_tilted(${tilt_direction_any}) do\n`;
    };

    Generator.wedo2_getDistance = function (block) {
        return [`wedo2_distance`, Generator.ORDER_ATOMIC];
    };

    Generator.wedo2_isTilted = function (block) {
        const tilt_direction_any = Generator.valueToCode(block, 'TILT_DIRECTION_ANY', Generator.ORDER_NONE) || null;
        return `wedo2_tilted(${tilt_direction_any})\n`;
    };

    Generator.wedo2_menu_TILT_DIRECTION = function (block) {
        const tilt_direction = Generator.quote_(Generator.getFieldValue(block, 'TILT_DIRECTION') || 'up');
        return [tilt_direction, Generator.ORDER_ATOMIC];
    };

    Generator.wedo2_getTiltAngle = function (block) {
        const tilt_direction = Generator.valueToCode(block, 'TILT_DIRECTION', Generator.ORDER_NONE) || null;
        return [`wedo2_tilt_angle(${tilt_direction})`, Generator.ORDER_ATOMIC];
    };    

    return Generator;
}
