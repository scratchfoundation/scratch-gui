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

    Generator.gdxfor_whenGesture = function(block){
        block.isStatement = true;
        const gesture = Generator.valueToCode(block, 'GESTURE', Generator.ORDER_NONE) || null;
        return  `${Generator.spriteName()}.when(:gdx_for_gesture, ${gesture}) do\n`;
    };

    Generator.gdxfor_menu_pushPullOptions = function (block) {
        const push_pull = Generator.quote_(Generator.getFieldValue(block, 'pushPullOptions') || 'pushed');
        return [push_pull, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_whenForcePushedOrPulled = function(block){
        block.isStatement = true;
        const push_pull = Generator.valueToCode(block, 'PUSH_PULL', Generator.ORDER_NONE) || null;
        return  `${Generator.spriteName()}.when(:gdx_for_push_pull, ${push_pull}) do\n`;
    };

    Generator.gdxfor_getForce = function(){
        return  [`gdx_for_force`, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_menu_tiltAnyOptions = function (block) {
        const tilt_any = Generator.quote_(Generator.getFieldValue(block, 'tiltAnyOptions') || 'any');
        return [tilt_any, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_whenTilted = function(block){
        block.isStatement = true;
        const tilt = Generator.valueToCode(block, 'TILT', Generator.ORDER_NONE) || null;
        return  `${Generator.spriteName()}.when(:gdx_for_titld, ${tilt}) do\n`;
    };

 
    Generator.gdxfor_isTilted = function(block){
        const tilt = Generator.valueToCode(block, 'TILT', Generator.ORDER_NONE) || null;
        return  [`gdx_for_tiled ${tilt}?`, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_menu_tiltOptions = function (block) {
        const tilt = Generator.quote_(Generator.getFieldValue(block, 'tiltOptions') || 'front');
        return [tilt, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_getTilt = function(block) {
        const tilt = Generator.valueToCode(block, 'TILT', Generator.ORDER_NONE) || null;
        return  [`gdx_for_tile_angle ${tilt}?`, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_menu_axisOptions = function (block) {
        const push_pull = Generator.quote_(Generator.getFieldValue(block, 'axisOptions') || 'z');
        return [push_pull, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_getSpinSpeed = function(block) {
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return  [`gdx_for_spein_speed ${direction}?`, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_getAcceleration = function(block) {
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return  [`gdx_for_acceleration ${direction}?`, Generator.ORDER_ATOMIC];
    };

    Generator.gdxfor_isFreeFalling = function() {
        return  [`gdx_for_falling?`, Generator.ORDER_ATOMIC];
    };
    return Generator;
}
