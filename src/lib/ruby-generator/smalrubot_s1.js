/**
 * Define Ruby code generator for Smalrubot S1 Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.smalrubotS1_action = function (block) {
        const action = Generator.quote_(
            Generator.getFieldValue(block, 'ACTION', Generator.ORDER_NONE) || 'forward'
        );
        return `smalrubot_s1.action(${action})\n`;
    };

    Generator.smalrubotS1_actionAndStopAfter = function (block) {
        const action = Generator.quote_(
            Generator.getFieldValue(block, 'ACTION', Generator.ORDER_NONE) || 'forward'
        );
        const secs = Generator.valueToCode(block, 'SECS', Generator.ORDER_NONE) || 1;
        return `smalrubot_s1.action(${action}, ${secs})\n`;
    };

    Generator.smalrubotS1_bendArm = function (block) {
        const degree = Generator.valueToCode(block, 'DEGREE', Generator.ORDER_NONE) || 90;
        const secs = Generator.valueToCode(block, 'SECS', Generator.ORDER_NONE) || 1;
        return `smalrubot_s1.bend_arm(${degree}, ${secs})\n`;
    };

    Generator.smalrubotS1_getSensorValue = function (block) {
        const position = Generator.quote_(
            Generator.getFieldValue(block, 'POSITION', Generator.ORDER_NONE) || 'left'
        );
        return [`smalrubot_s1.sensor_value(${position})`, Generator.ORDER_ATOMIC];
    };

    Generator.smalrubotS1_turnLedOn = function (block) {
        const position = Generator.quote_(
            Generator.getFieldValue(block, 'POSITION', Generator.ORDER_NONE) || 'left'
        );
        return `smalrubot_s1.led(${position}, true)\n`;
    };

    Generator.smalrubotS1_turnLedOff = function (block) {
        const position = Generator.quote_(
            Generator.getFieldValue(block, 'POSITION', Generator.ORDER_NONE) || 'left'
        );
        return `smalrubot_s1.led(${position}, false)\n`;
    };

    Generator.smalrubotS1_getMotorSpeed = function (block) {
        const position = Generator.quote_(
            Generator.getFieldValue(block, 'POSITION', Generator.ORDER_NONE) || 'left'
        );
        return [`smalrubot_s1.get_motor_speed(${position})`, Generator.ORDER_ATOMIC];
    };

    Generator.smalrubotS1_setMotorSpeed = function (block) {
        const position = Generator.quote_(
            Generator.getFieldValue(block, 'POSITION', Generator.ORDER_NONE) || 'left'
        );
        const speed = Generator.valueToCode(block, 'SPEED', Generator.ORDER_NONE) || 1;
        return `smalrubot_s1.set_motor_speed(${position}, ${speed})\n`;
    };

    return Generator;
}
