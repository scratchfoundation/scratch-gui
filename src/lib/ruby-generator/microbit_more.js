/**
 * Define Ruby code generator for micro:bit MORE Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.microbitMore_whenButtonPressed = function (block) {
        block.isStatement = true;
        const btn = Generator.valueToCode(block, 'BTN', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:microbit_more_button_pressed, ${btn}) do\n`;
    };

    Generator.microbitMore_isButtonPressed = function (block) {
        const btn = Generator.valueToCode(block, 'BTN', Generator.ORDER_NONE) || null;
        return `microbit_more.button_pressed?(${btn})\n`;
    };

    Generator.microbitMore_whenGesture = function (block) {
        block.isStatement = true;
        const gesture = Generator.valueToCode(block, 'GESTURE', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:microbit_more_gesture, ${gesture}) do\n`;
    };

    Generator.microbitMore_displaySymbol = function (block) {
        let matrix = Generator.valueToCode(block, 'MATRIX', Generator.ORDER_NONE) || null;
        matrix = Generator.prefixLines(matrix, Generator.INDENT);
        return `microbit_more.display(\n${matrix}\n)\n`;
    };

    Generator.microbitMore_displayText = function (block) {
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        return `microbit_more.display_text(${text})\n`;
    };

    Generator.microbitMore_displayClear = function () {
        return `microbit_more.clear_display\n`;
    };

    Generator.microbitMore_whenTilted = function (block) {
        block.isStatement = true;
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:microbit_more_tilted, ${direction}) do\n`;
    };

    Generator.microbitMore_isTilted = function (block) {
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return [`microbit_more.tilted?(${direction})`, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_getTiltAngle = function (block) {
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return [`microbit_more.tilt_angle(${direction})`, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_whenPinConnected = function (block) {
        block.isStatement = true;
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:microbit_more_pin_connected, ${pin}) do\n`;
    };

    Generator.microbitMore_isPinConnected = function (block) {
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        return `microbit_more.pin_connected?(${pin})\n`;
    };

    Generator.microbitMore_menu_buttons = function (block) {
        const buttons = Generator.quote_(Generator.getFieldValue(block, 'buttons') || 'A');
        return [buttons, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_gestures = function (block) {
        const gestures = Generator.quote_(Generator.getFieldValue(block, 'gestures') || 'moved');
        return [gestures, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_tiltDirectionAny = function (block) {
        const tiltDirectionAny = Generator.quote_(Generator.getFieldValue(block, 'tiltDirectionAny') || 'any');
        return [tiltDirectionAny, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_tiltDirection = function (block) {
        const tiltDirection = Generator.quote_(Generator.getFieldValue(block, 'tiltDirection') || 'front');
        return [tiltDirection, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_touchPins = function (block) {
        const touchPins = Generator.getFieldValue(block, 'touchPins') || '0';
        return [touchPins, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_gpio = function (block) {
        const gpio = Generator.getFieldValue(block, 'gpio') || '0';
        return [gpio, Generator.ORDER_ATOMIC];
    };

    Generator.matrix = function (block) {
        let matrix = Generator.getFieldValue(block, 'MATRIX') || '0000000000000000000000000';
        matrix = matrix.replace(/0/g, '.');
        matrix = matrix.match(/.{5}/g).map(s => Generator.quote_(s));
        return [matrix.join(',\n'), Generator.ORDER_ATOMIC];
    };

    return Generator;
}
