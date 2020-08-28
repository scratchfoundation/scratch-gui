/**
 * Define Ruby code generator for micro:bit MORE Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.microbitMore_whenButtonPressed = function (block) {
        block.isStatement = true;
        const btn = Generator.valueToCode(block, 'BTN', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:mbit_more_button_pressed, ${btn}) do\n`;
    };

    Generator.microbitMore_isButtonPressed = function (block) {
        const btn = Generator.valueToCode(block, 'BTN', Generator.ORDER_NONE) || null;
        return `mbit_more.button_pressed?(${btn})\n`;
    };

    Generator.microbitMore_whenGesture = function (block) {
        block.isStatement = true;
        const gesture = Generator.valueToCode(block, 'GESTURE', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:mbit_more_gesture, ${gesture}) do\n`;
    };

    Generator.microbitMore_displaySymbol = function (block) {
        let matrix = Generator.valueToCode(block, 'MATRIX', Generator.ORDER_NONE) || null;
        matrix = Generator.prefixLines(matrix, Generator.INDENT);
        return `mbit_more.display(\n${matrix}\n)\n`;
    };

    Generator.microbitMore_displayText = function (block) {
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        return `mbit_more.display_text(${text})\n`;
    };

    Generator.microbitMore_displayClear = function () {
        return `mbit_more.clear_display\n`;
    };

    Generator.microbitMore_whenTilted = function (block) {
        block.isStatement = true;
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:mbit_more_tilted, ${direction}) do\n`;
    };

    Generator.microbitMore_isTilted = function (block) {
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return [`mbit_more.tilted?(${direction})`, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_getTiltAngle = function (block) {
        const direction = Generator.valueToCode(block, 'DIRECTION', Generator.ORDER_NONE) || null;
        return [`mbit_more.tilt_angle(${direction})`, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_whenPinConnected = function (block) {
        block.isStatement = true;
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        return `${Generator.spriteName()}.when(:mbit_more_pin_connected, ${pin}) do\n`;
    };

    Generator.microbitMore_isPinConnected = function (block) {
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        return `mbit_more.pin_connected?(${pin})\n`;
    };

    Generator.microbitMore_getLightLevel = function () {
        return `mbit_more.light_level\n`;
    };

    Generator.microbitMore_getTemperature = function () {
        return `mbit_more.temperature\n`;
    };

    Generator.microbitMore_getCompassHeading = function () {
        return `mbit_more.compass_heading\n`;
    };

    Generator.microbitMore_getPitch = function () {
        return `mbit_more.pitch\n`;
    };

    Generator.microbitMore_getRoll = function () {
        return `mbit_more.roll\n`;
    };

    Generator.microbitMore_getMagneticForce = function (block) {
        const axis = Generator.valueToCode(block, 'AXIS', Generator.ORDER_NONE) || null;
        return `mbit_more.get_magnetic_force(${axis})\n`;
    };

    Generator.microbitMore_getAcceleration = function (block) {
        const axis = Generator.valueToCode(block, 'AXIS', Generator.ORDER_NONE) || null;
        return `mbit_more.get_acceleration(${axis})\n`;
    };

    Generator.microbitMore_getAnalogValue = function (block) {
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        return `mbit_more.get_analog_value(${pin})\n`;
    };

    Generator.microbitMore_getDigitalValue = function (block) {
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        return `mbit_more.get_digital_value(${pin})\n`;
    };

    Generator.microbitMore_setPinMode = function (block) {
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        const mode = Generator.quote_(Generator.getFieldValue(block, 'MODE')) || null;
        return `mbit_more.set_pin_mode(${pin}, ${mode})\n`;
    };

    Generator.microbitMore_setOutput = function (block) {
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        const level = Generator.valueToCode(block, 'LEVEL', Generator.ORDER_NONE) || null;
        return `mbit_more.set_output(${pin}, ${level})\n`;
    };

    Generator.microbitMore_setPWM = function (block) {
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        const level = Generator.valueToCode(block, 'LEVEL', Generator.ORDER_NONE) || null;
        return `mbit_more.set_pwm(${pin}, ${level})\n`;
    };

    Generator.microbitMore_setServo = function (block) {
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        const angle = Generator.valueToCode(block, 'ANGLE', Generator.ORDER_NONE) || null;
        const range = Generator.valueToCode(block, 'RANGE', Generator.ORDER_NONE) || 2000;
        const center = Generator.valueToCode(block, 'CENTER', Generator.ORDER_NONE) || 1500;
        return `mbit_more.set_servo(${pin}, ${angle}, ${range}, ${center})\n`;
    };

    Generator.microbitMore_setPinEventType = function (block) {
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        const eventType = Generator.getFieldValue(block, 'EVENT_TYPE') || null;
        return `mbit_more.set_pin_event_type(${pin}, ${eventType})\n`;
    };

    Generator.microbitMore_whenPinEvent = function (block) {
        block.isStatement = true;
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        const event = Generator.getFieldValue(block, 'EVENT') || null;
        return `${Generator.spriteName()}.when(:mbit_more_pin_event, ${pin}, ${event}) do\n`;
    };

    Generator.microbitMore_getPinEventTimestamp = function (block) {
        const pin = Generator.valueToCode(block, 'PIN', Generator.ORDER_NONE) || null;
        const event = Generator.getFieldValue(block, 'EVENT') || null;
        return `mbit_more.get_pin_event_timestamp(${pin}, ${event})\n`;
    };

    Generator.microbitMore_getSharedData = function (block) {
        const index = Generator.valueToCode(block, 'INDEX', Generator.ORDER_NONE) || null;
        return `mbit_more.get_shared_data(${index})\n`;
    };

    Generator.microbitMore_setSharedData = function (block) {
        const index = Generator.valueToCode(block, 'INDEX', Generator.ORDER_NONE) || null;
        const value = Generator.valueToCode(block, 'VALUE', Generator.ORDER_NONE) || null;
        return `mbit_more.set_shared_data(${index}, ${value})\n`;
    };

    Generator.microbitMore_whenConnectionChanged = function (block) {
        block.isStatement = true;
        const state = Generator.getFieldValue(block, 'STATE') || null;
        return `${Generator.spriteName()}.when(:mbit_more_connection_changed, ${state}) do\n`;
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
        const touchPins = Generator.getFieldValue(block, 'touchPins') || 0;
        return [touchPins, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_gpio = function (block) {
        const gpio = Generator.getFieldValue(block, 'gpio') || 0;
        return [gpio, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_axis = function (block) {
        const axis = Generator.quote_(Generator.getFieldValue(block, 'axis') || 'absolute');
        return [axis, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_analogIn = function (block) {
        const analogIn = Generator.getFieldValue(block, 'analogIn') || 0;
        return [analogIn, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_pinMode = function (block) {
        const pinMode = Generator.quote_(Generator.getFieldValue(block, 'pinMode') || 'pullUp');
        return [pinMode, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_digitalValue = function (block) {
        const digitalValue = Generator.getFieldValue(block, 'digitalValue') || 0;
        return [digitalValue, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_pinEventTypeMenu = function (block) {
        const pinEventTypeMenu = Generator.getFieldValue(block, 'pinEventTypeMenu') || 0;
        return [pinEventTypeMenu, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_pinEventTimestampMenu = function (block) {
        const pinEventTimestampMenu = Generator.getFieldValue(block, 'pinEventTimestampMenu') || 5;
        return [pinEventTimestampMenu, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_sharedDataIndex = function (block) {
        const sharedDataIndex = Generator.quote_(Generator.getFieldValue(block, 'sharedDataIndex') || 'absolute');
        return [sharedDataIndex, Generator.ORDER_ATOMIC];
    };

    Generator.microbitMore_menu_connectionStateMenu = function (block) {
        const connectionStateMenu =
              Generator.quote_(Generator.getFieldValue(block, 'connectionStateMenu') || 'connected');
        return [connectionStateMenu, Generator.ORDER_ATOMIC];
    };

    Generator.matrix = function (block) {
        let matrix = Generator.getFieldValue(block, 'MATRIX') || '0000000000000000000000000';
        matrix = matrix.replace(/0/g, '.');
        matrix = matrix.match(/.{5}/g).map(s => Generator.quote_(s));
        return [matrix.join(',\n'), Generator.ORDER_ATOMIC];
    };

    return Generator;
}
