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

    Generator.boost_menu_MOTOR_DIRECTION = function (block) {
        const index = Generator.getFieldValue(block, 'MOTOR_DIRECTION') || 0;
        const motordirection = Generator.quote_(index);
        return [motordirection, Generator.ORDER_ATOMIC];
    };

    Generator.boost_setMotorDirection = function (block) {
        const motorid = Generator.valueToCode(block, 'MOTOR_ID', Generator.ORDER_NONE) || null;
        const motordirection = Generator.valueToCode(block, 'MOTOR_DIRECTION') || null;
        return `boost_motor_set_direction_for(${motorid}, ${motordirection})\n`;
    };

    Generator.boost_menu_MOTOR_REPORTER_ID = function (block) {
        const index = Generator.getFieldValue(block, 'MOTOR_REPORTER_ID') || 0;
        const motorreporterid = Generator.quote_(index);
        return [motorreporterid, Generator.ORDER_ATOMIC];
    };

    Generator.boost_getMotorPosition = function (block) {
        const motorreporterid = Generator.valueToCode(block, 'MOTOR_REPORTER_ID', Generator.ORDER_NONE) || null;
        return `boost_motor_get_position(${motorreporterid})\n`;
    };

    Generator.boost_menu_COLOR = function (block) {
        const index = Generator.getFieldValue(block, 'COLOR') || 0;
        const color = Generator.quote_(index);
        return [color, Generator.ORDER_ATOMIC];
    };

    Generator.boost_whenColor = function (block) {
        block.isStatement = true;
        const color = Generator.valueToCode(block, 'COLOR', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:boost_color, ${color}) do\n`;
    };

    Generator.boost_seeingColor = function (block) {
        const color = Generator.valueToCode(block, 'COLOR', Generator.ORDER_NONE) || null;
        return `boost_seeing_color?(${color})\n`;
    };

    Generator.boost_menu_TILT_DIRECTION_ANY = function (block) {
        const index = Generator.getFieldValue(block, 'TILT_DIRECTION_ANY') || 0;
        const tiltdirectionany = Generator.quote_(index);
        return [tiltdirectionany, Generator.ORDER_ATOMIC];
    };

    Generator.boost_whenTilted = function (block) {
        block.isStatement = true;
        const tiltdirectionany = Generator.valueToCode(block, 'TILT_DIRECTION_ANY', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:boost_tilted, ${tiltdirectionany}) do\n`;
    };

    Generator.boost_menu_TILT_DIRECTION = function (block) {
        const index = Generator.getFieldValue(block, 'TILT_DIRECTION') || 0;
        const tiltdirection = Generator.quote_(index);
        return [tiltdirection, Generator.ORDER_ATOMIC];
    };

    Generator.boost_getTiltAngle = function (block) {
        const tiltdirection = Generator.valueToCode(block, 'TILT_DIRECTION', Generator.ORDER_NONE) || null;
        return `boost_get_tilt_angle(${tiltdirection})\n`;
    };

    Generator.boost_setLightHue = function (block) {
        const hue = Generator.valueToCode(block, 'HUE', Generator.ORDER_NONE) || null;
        return `boost_set_light_color(${hue})\n`;
    };

    return Generator;
}
