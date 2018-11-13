/**
 * Define Ruby code generator for Motion Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.motion_movesteps = function (block) {
        const steps = Generator.valueToCode(block, 'STEPS', Generator.ORDER_NONE) || 0;
        return `move(${steps})\n`;
    };

    Generator.motion_turnright = function (block) {
        const degrees = Generator.valueToCode(block, 'DEGREES', Generator.ORDER_NONE) || 0;
        return `turn_right(${degrees})\n`;
    };

    Generator.motion_turnleft = function (block) {
        const degrees = Generator.valueToCode(block, 'DEGREES', Generator.ORDER_NONE) || 0;
        return `turn_left(${degrees})\n`;
    };

    Generator.motion_goto = function (block) {
        const place = Generator.valueToCode(block, 'TO', Generator.ORDER_NONE);
        return `go_to(${place})\n`;
    };

    Generator.motion_goto_menu = function (block) {
        const place = Generator.quote_(Generator.getFieldValue(block, 'TO') || null);
        return [place, Generator.ORDER_ATOMIC];
    };

    Generator.motion_gotoxy = function (block) {
        const x = Generator.valueToCode(block, 'X', Generator.ORDER_NONE) || 0;
        const y = Generator.valueToCode(block, 'Y', Generator.ORDER_NONE) || 0;
        return `go_to([${x}, ${y}])\n`;
    };

    Generator.motion_glideto = function (block) {
        const secs = Generator.valueToCode(block, 'SECS', Generator.ORDER_NONE) || 0;
        const place = Generator.valueToCode(block, 'TO', Generator.ORDER_NONE);
        return `glide(${place}, secs: ${secs})\n`;
    };

    Generator.motion_glideto_menu = Generator.motion_goto_menu;

    Generator.motion_glidesecstoxy = function (block) {
        const secs = Generator.valueToCode(block, 'SECS', Generator.ORDER_NONE) || 0;
        const x = Generator.valueToCode(block, 'X', Generator.ORDER_NONE) || 0;
        const y = Generator.valueToCode(block, 'Y', Generator.ORDER_NONE) || 0;
        return `glide([${x}, ${y}], secs: ${secs})\n`;
    };

    Generator.motion_pointindirection = function (block) {
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || 90;
        return `self.direction = ${direction}\n`;
    };

    Generator.motion_pointtowards = function (block) {
        const towards = Generator.valueToCode(block, 'TOWARDS', Generator.ORDER_NONE);
        return `point_towards(${towards})\n`;
    };

    Generator.motion_pointtowards_menu = function (block) {
        const towards = Generator.quote_(Generator.getFieldValue(block, 'TOWARDS') || '_mouse_');
        return [towards, Generator.ORDER_ATOMIC];
    };

    Generator.motion_changexby = function (block) {
        const dx = Generator.valueToCode(block, 'DX', Generator.ORDER_NONE) || 0;
        return `self.x += ${dx}\n`;
    };

    Generator.motion_setx = function (block) {
        const x = Generator.valueToCode(block, 'X', Generator.ORDER_NONE) || 0;
        return `self.x = ${x}\n`;
    };

    Generator.motion_changeyby = function (block) {
        const dy = Generator.valueToCode(block, 'DY', Generator.ORDER_NONE) || 0;
        return `self.y += ${dy}\n`;
    };

    Generator.motion_sety = function (block) {
        const y = Generator.valueToCode(block, 'Y', Generator.ORDER_NONE) || 0;
        return `self.y = ${y}\n`;
    };

    Generator.motion_ifonedgebounce = function () {
        return 'bounce_if_on_edge\n';
    };

    Generator.motion_setrotationstyle = function (block) {
        const style = Generator.quote_(Generator.getFieldValue(block, 'STYLE') || 'all around');
        return `self.rotation_style = ${style}\n`;
    };

    Generator.motion_xposition = function () {
        return ['x', Generator.ORDER_ATOMIC];
    };

    Generator.motion_yposition = function () {
        return ['y', Generator.ORDER_ATOMIC];
    };

    Generator.motion_direction = function () {
        return ['direction', Generator.ORDER_ATOMIC];
    };

    return Generator;
}
