/**
 * Define Ruby code generator for micro:bit Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.microbit_whenButtonPressed = function (block) {
        block.isStatement = true;
        const btn = Generator.valueToCode(block, 'BTN', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:microbit_button_pressed, ${btn}) do\n`;
    };

    Generator.microbit_isButtonPressed = function (block) {
        const btn = Generator.valueToCode(block, 'BTN', Generator.ORDER_NONE) || null;
        return `microbit.button_pressed?(${btn})\n`;
    };

    Generator.microbit_whenGesture = function (block) {
        block.isStatement = true;
        const gesture = Generator.valueToCode(block, 'GESTURE', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:microbit_gesture, ${gesture}) do\n`;
    };

    Generator.microbit_displaySymbol = function (block) {
        let matrix = Generator.valueToCode(block, 'MATRIX', Generator.ORDER_NONE) || null;
        matrix = Generator.prefixLines(matrix, Generator.INDENT);
        return `microbit.display(\n${matrix}\n)\n`;
    };

    Generator.microbit_displayText = function (block) {
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        return `microbit.display_text(${text})\n`;
    };

    Generator.microbit_displayClear = function () {
        return `microbit.clear_display\n`;
    };

    Generator.microbit_whenTilted = function (block) {
        block.isStatement = true;
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:microbit_tilted, ${direction}) do\n`;
    };

    Generator.microbit_isTilted = function (block) {
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return [`microbit.tilted?(${direction})`, Generator.ORDER_ATOMIC];
    };

    Generator.microbit_getTiltAngle = function (block) {
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return [`microbit.tilt_angle(${direction})`, Generator.ORDER_ATOMIC];
    };

    Generator.microbit_whenPinConnected = function (block) {
        block.isStatement = true;
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:microbit_pin_connected, ${pin}) do\n`;
    };

    Generator.microbit_menu_buttons = function (block) {
        const buttons = Generator.quote_(Generator.getFieldValue(block, 'buttons') || 'A');
        return [buttons, Generator.ORDER_ATOMIC];
    };

    Generator.microbit_menu_gestures = function (block) {
        const gestures = Generator.quote_(Generator.getFieldValue(block, 'gestures') || 'moved');
        return [gestures, Generator.ORDER_ATOMIC];
    };

    Generator.microbit_menu_tiltDirectionAny = function (block) {
        const tiltDirectionAny = Generator.quote_(Generator.getFieldValue(block, 'tiltDirectionAny') || 'any');
        return [tiltDirectionAny, Generator.ORDER_ATOMIC];
    };

    Generator.microbit_menu_tiltDirection = function (block) {
        const tiltDirection = Generator.quote_(Generator.getFieldValue(block, 'tiltDirection') || 'front');
        return [tiltDirection, Generator.ORDER_ATOMIC];
    };

    Generator.microbit_menu_touchPins = function (block) {
        const touchPins = Generator.getFieldValue(block, 'touchPins') || '0';
        return [touchPins, Generator.ORDER_ATOMIC];
    };

    Generator.matrix = function (block) {
        let matrix = Generator.getFieldValue(block, 'MATRIX') || '0000000000000000000000000';
        matrix = matrix.replace(/0/g, '.');
        matrix = matrix.match(/.{5}/g).map(s => Generator.quote_(s));
        return [matrix.join(',\n'), Generator.ORDER_ATOMIC];
    };

    return Generator;
}
