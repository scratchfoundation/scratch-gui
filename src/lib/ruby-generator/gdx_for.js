/**
 * Define Ruby code generator for Go Direct Force & Acceleration Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.gdxfor_menu_gestureOptions = function (block) {
        const gesture = Generator.quote_(Generator.getFieldValue(block, 'gestureOptions') || 'shaken');
        return [gesture, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_whenGesture = function (block) {
        block.isStatement = true;
        const gesture = Generator.valueToCode(block, 'GESTURE', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:gdx_for_gesture, ${gesture}) do\n`;
    };

    Generator.gdxfor_menu_pushPullOptions = function (block) {
        const pushPull = Generator.quote_(Generator.getFieldValue(block, 'pushPullOptions') || 'pushed');
        return [pushPull, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_whenForcePushedOrPulled = function (block) {
        block.isStatement = true;
        const pushPull = Generator.valueToCode(block, 'PUSH_PULL', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:gdx_force_sensor, ${pushPull}) do\n`;
    };

    Generator.gdxfor_getForce = function () {
        return [`gdx_for_force`, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_menu_tiltAnyOptions = function (block) {
        const tiltAny = Generator.quote_(Generator.getFieldValue(block, 'tiltAnyOptions') || 'any');
        return [tiltAny, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_whenTilted = function (block) {
        block.isStatement = true;
        const tilt = Generator.valueToCode(block, 'TILT', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:gdx_for_tilted, ${tilt}) do\n`;
    };

    Generator.gdxfor_isTilted = function (block) {
        const tilt = Generator.valueToCode(block, 'TILT', Generator.ORDER_NONE) || null;
        return [`gdx_for_tilted?(${tilt})`, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_menu_tiltOptions = function (block) {
        const tilt = Generator.quote_(Generator.getFieldValue(block, 'tiltOptions') || 'front');
        return [tilt, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_getTilt = function (block) {
        const tilt = Generator.valueToCode(block, 'TILT', Generator.ORDER_NONE) || null;
        return [`gdx_for_tilt_angle(${tilt})`, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_menu_axisOptions = function (block) {
        const pushPull = Generator.quote_(Generator.getFieldValue(block, 'axisOptions') || 'z');
        return [pushPull, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_getSpinSpeed = function (block) {
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return [`gdx_for_spin_speed(${direction})`, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_getAcceleration = function (block) {
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return [`gdx_for_acceleration(${direction})`, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_isFreeFalling = function () {
        return [`gdx_for_falling?`, Generator.ORDER_ATOMIC];
    };
    return Generator;
}
