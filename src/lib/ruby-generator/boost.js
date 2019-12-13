/**
 * Define Ruby code generator for BOOST Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.boost_menu_MOTOR_ID = function (block) {
        const index = Generator.getFieldValue(block, 'MOTOR_ID') || 0;
        const motorid = Generator.quote_(index);
        return [motorid, Generator.ORDER_ATOMIC];
    };

    Generator.boost_motorOnFor = function (block) {
        const motorid = Generator.valueToCode(block, 'MOTOR_ID', Generator.ORDER_NONE) || null;
        const duration = Generator.valueToCode(block, 'DURATION', Generator.ORDER_NONE) || null;
        return `boost_motor_turn_on_for(${motorid}, ${duration})\n`;
    };

    Generator.boost_motorOnForRotation = function (block) {
        const motorid = Generator.valueToCode(block, 'MOTOR_ID', Generator.ORDER_NONE) || null;
        const rotation = Generator.valueToCode(block, 'ROTATION', Generator.ORDER_NONE) || null;
        return `boost_motor_turn_this_way_for(${motorid}, ${rotation})\n`;
    };

    Generator.boost_motorOn = function (block) {
        const motorid = Generator.valueToCode(block, 'MOTOR_ID', Generator.ORDER_NONE) || null;
        return `boost_motor_turn_on_for(${motorid})\n`;
    };

    Generator.boost_motorOff = function (block) {
        const motorid = Generator.valueToCode(block, 'MOTOR_ID', Generator.ORDER_NONE) || null;
        return `boost_motor_turn_off_for(${motorid})\n`;
    };

    Generator.boost_setMotorPower = function (block) {
        const motorid = Generator.valueToCode(block, 'MOTOR_ID', Generator.ORDER_NONE) || null;
        const power = Generator.valueToCode(block, 'POWER', Generator.ORDER_NONE) || null;
        return `boost_motor_set_power_for(${motorid}, ${power})\n`;
    };

    return Generator;
}
