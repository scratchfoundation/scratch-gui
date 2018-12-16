/**
 * Define Ruby code generator for Sensing Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.sensing_touchingobject = function (block) {
        const order = Generator.ORDER_FUNCTION_CALL;
        const object = Generator.valueToCode(block, 'TOUCHINGOBJECTMENU', order) || null;
        return [`touching?(${object})`, order];
    };

    Generator.sensing_touchingobjectmenu = function (block) {
        const object = Generator.quote_(Generator.getFieldValue(block, 'TOUCHINGOBJECTMENU') || null);
        return [object, Generator.ORDER_ATOMIC];
    };

    Generator.sensing_touchingcolor = function (block) {
        const order = Generator.ORDER_FUNCTION_CALL;
        const color = Generator.valueToCode(block, 'COLOR', order) || null;
        return [`touching_color?(${color})`, order];
    };

    Generator.sensing_coloristouchingcolor = function (block) {
        const order = Generator.ORDER_FUNCTION_CALL;
        const color = Generator.valueToCode(block, 'COLOR', order) || null;
        const color2 = Generator.valueToCode(block, 'COLOR2', order) || null;
        return [`color_is_touching_color?(${color}, ${color2})`, order];
    };

    Generator.sensing_distanceto = function (block) {
        const order = Generator.ORDER_FUNCTION_CALL;
        const object = Generator.valueToCode(block, 'DISTANCETOMENU', order) || null;
        return [`distance(${object})`, order];
    };

    Generator.sensing_distancetomenu = function (block) {
        const object = Generator.quote_(Generator.getFieldValue(block, 'DISTANCETOMENU') || null);
        return [object, Generator.ORDER_ATOMIC];
    };

    Generator.sensing_askandwait = function (block) {
        const question = Generator.valueToCode(block, 'QUESTION', Generator.ORDER_NONE) || null;
        return `ask(${question})\n`;
    };

    Generator.sensing_answer = function () {
        return ['answer', Generator.ORDER_ATOMIC];
    };

    Generator.sensing_keypressed = function (block) {
        const order = Generator.ORDER_FUNCTION_CALL;
        const key = Generator.valueToCode(block, 'KEY_OPTION', order) || null;
        return [`Keyboard.pressed?(${key})`, order];
    };

    Generator.sensing_keyoptions = function (block) {
        const key = Generator.quote_(Generator.getFieldValue(block, 'KEY_OPTION') || '');
        return [key, Generator.ORDER_ATOMIC];
    };

    Generator.sensing_mousedown = function () {
        return ['Mouse.down?', Generator.ORDER_ATOMIC];
    };

    Generator.sensing_mousex = function () {
        return ['Mouse.x', Generator.ORDER_ATOMIC];
    };

    Generator.sensing_mousey = function () {
        return ['Mouse.y', Generator.ORDER_ATOMIC];
    };

    Generator.sensing_setdragmode = function (block) {
        const mode = Generator.quote_(Generator.getFieldValue(block, 'DRAG_MODE') || '');
        return `self.drag_mode = ${mode}\n`;
    };

    Generator.sensing_loudness = function () {
        return ['loudness', Generator.ORDER_ATOMIC];
    };

    Generator.sensing_timer = function () {
        return ['Timer.value', Generator.ORDER_ATOMIC];
    };

    Generator.sensing_resettimer = function () {
        return 'Timer.reset\n';
    };

    Generator.sensing_of_object_menu = function (block) {
        const object = Generator.getFieldValue(block, 'OBJECT') || null;
        if (object === '_stage_') {
            return ['stage', Generator.ORDER_ATOMIC];
        }
        return [`sprite(${Generator.quote_(object)})`, Generator.ORDER_ATOMIC];
    };

    const propertyToMethod = {
        'x position': 'x',
        'y position': 'y',
        'direction': 'direction',
        'costume #': 'costume_number',
        'costume name': 'costume_name',
        'size': 'size',
        'volume': 'volume',
        'backdrop #': 'backdrop_number',
        'backdrop name': 'backdrop_name'
    };
    Generator.sensing_of = function (block) {
        const property = Generator.getFieldValue(block, 'PROPERTY') || null;
        const object = Generator.valueToCode(block, 'OBJECT', Generator.ORDER_ATOMIC) || null;
        let method = propertyToMethod[property];
        if (!method) {
            method = `variable(${Generator.quote_(property)})`;
        }
        return [`${object}.${method}`, Generator.ORDER_ATOMIC];
    };

    const currentMenuToMethod = {
        YEAR: 'year',
        MONTH: 'month',
        DATE: 'day',
        DAYOFWEEK: 'wday + 1',
        HOUR: 'hour',
        MINUTE: 'min',
        SECOND: 'sec'
    };
    Generator.sensing_current = function (block) {
        const menu = Generator.getFieldValue(block, 'CURRENTMENU');
        return [`Time.now.${currentMenuToMethod[menu]}`, Generator.ORDER_FUNCTION_CALL];
    };

    Generator.sensing_dayssince2000 = function () {
        return ['days_since_2000', Generator.ORDER_ATOMIC];
    };

    Generator.sensing_username = function () {
        return ['user_name', Generator.ORDER_ATOMIC];
    };

    return Generator;
}
