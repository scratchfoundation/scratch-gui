/**
 * Define Ruby with Motion Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.motion_movesteps = function (block) {
        const steps = Blockly.Ruby.valueToCode(block, 'STEPS', Blockly.Ruby.ORDER_NONE) || 0;
        return `move(${steps})\n`;
    };

    Blockly.Ruby.motion_turnright = function (block) {
        const degrees = Blockly.Ruby.valueToCode(block, 'DEGREES', Blockly.Ruby.ORDER_NONE) || 0;
        return `turn_right(${degrees})\n`;
    };

    Blockly.Ruby.motion_turnleft = function (block) {
        const degrees = Blockly.Ruby.valueToCode(block, 'DEGREES', Blockly.Ruby.ORDER_NONE) || 0;
        return `turn_left(${degrees})\n`;
    };

    Blockly.Ruby.motion_goto = function (block) {
        const place = Blockly.Ruby.valueToCode(block, 'TO', Blockly.Ruby.ORDER_NONE);
        return `go_to(${place})\n`;
    };

    Blockly.Ruby.motion_goto_menu = function (block) {
        const place = Blockly.Ruby.quote_(block.getFieldValue('TO') || null);
        return [place, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.motion_gotoxy = function (block) {
        const x = Blockly.Ruby.valueToCode(block, 'X', Blockly.Ruby.ORDER_NONE) || 0;
        const y = Blockly.Ruby.valueToCode(block, 'Y', Blockly.Ruby.ORDER_NONE) || 0;
        return `go_to([${x}, ${y}])\n`;
    };

    Blockly.Ruby.motion_glideto = function (block) {
        const secs = Blockly.Ruby.valueToCode(block, 'SECS', Blockly.Ruby.ORDER_NONE) || 0;
        const place = Blockly.Ruby.valueToCode(block, 'TO', Blockly.Ruby.ORDER_NONE);
        return `glide(${place}, secs: ${secs})\n`;
    };

    Blockly.Ruby.motion_glideto_menu = Blockly.Ruby.motion_goto_menu;

    Blockly.Ruby.motion_glidesecstoxy = function (block) {
        const secs = Blockly.Ruby.valueToCode(block, 'SECS', Blockly.Ruby.ORDER_NONE) || 0;
        const x = Blockly.Ruby.valueToCode(block, 'X', Blockly.Ruby.ORDER_NONE) || 0;
        const y = Blockly.Ruby.valueToCode(block, 'Y', Blockly.Ruby.ORDER_NONE) || 0;
        return `glide([${x}, ${y}], secs: ${secs})\n`;
    };

    Blockly.Ruby.motion_pointindirection = function (block) {
        const direction = Blockly.Ruby.valueToCode(block, 'DIRECTION', Blockly.Ruby.ORDER_NONE) || 90;
        return `self.direction = ${direction}\n`;
    };

    Blockly.Ruby.motion_pointtowards = function (block) {
        const towards = Blockly.Ruby.valueToCode(block, 'TOWARDS', Blockly.Ruby.ORDER_NONE);
        return `point_towards(${towards})\n`;
    };

    Blockly.Ruby.motion_pointtowards_menu = function (block) {
        const towards = Blockly.Ruby.quote_(block.getFieldValue('TOWARDS') || '_mouse_');
        return [towards, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.motion_changexby = function (block) {
        const dx = Blockly.Ruby.valueToCode(block, 'DX', Blockly.Ruby.ORDER_NONE) || 0;
        return `self.x += ${dx}\n`;
    };

    Blockly.Ruby.motion_setx = function (block) {
        const x = Blockly.Ruby.valueToCode(block, 'X', Blockly.Ruby.ORDER_NONE) || 0;
        return `self.x = ${x}\n`;
    };

    Blockly.Ruby.motion_changeyby = function (block) {
        const dy = Blockly.Ruby.valueToCode(block, 'DY', Blockly.Ruby.ORDER_NONE) || 0;
        return `self.y += ${dy}\n`;
    };

    Blockly.Ruby.motion_sety = function (block) {
        const y = Blockly.Ruby.valueToCode(block, 'Y', Blockly.Ruby.ORDER_NONE) || 0;
        return `self.y = ${y}\n`;
    };

    Blockly.Ruby.motion_ifonedgebounce = function () {
        return 'bounce_if_on_edge\n';
    };

    Blockly.Ruby.motion_setrotationstyle = function (block) {
        const style = Blockly.Ruby.quote_(block.getFieldValue('STYLE') || 'all around');
        return `self.rotation_style = ${style}\n`;
    };

    Blockly.Ruby.motion_xposition = function () {
        return ['x', Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.motion_yposition = function () {
        return ['y', Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.motion_direction = function () {
        return ['direction', Blockly.Ruby.ORDER_ATOMIC];
    };

    return Blockly;
}
