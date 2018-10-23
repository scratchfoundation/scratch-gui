/**
 * Define Ruby with Sensing Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly) {
    Blockly.Ruby.sensing_touchingobject = function (block) {
        const order = Blockly.Ruby.ORDER_FUNCTION_CALL;
        const object = Blockly.Ruby.valueToCode(block, 'TOUCHINGOBJECTMENU', order) || null;
        return [`touching?(${object})`, order];
    };

    Blockly.Ruby.sensing_touchingobjectmenu = function (block) {
        const object = Blockly.Ruby.quote_(block.getFieldValue('TOUCHINGOBJECTMENU') || null);
        return [object, Blockly.Ruby.ORDER_FUNCTION_CALL];
    };

    Blockly.Ruby.sensing_touchingcolor = function (block) {
        const order = Blockly.Ruby.ORDER_FUNCTION_CALL;
        const color = Blockly.Ruby.valueToCode(block, 'COLOR', order) || null;
        return [`touching_color?(${color})`, order];
    };

    Blockly.Ruby.sensing_coloristouchingcolor = function (block) {
        const order = Blockly.Ruby.ORDER_FUNCTION_CALL;
        const color = Blockly.Ruby.valueToCode(block, 'COLOR', order) || null;
        const color2 = Blockly.Ruby.valueToCode(block, 'COLOR2', order) || null;
        return [`color_is_touching_color?(${color}, ${color2})`, order];
    };

    Blockly.Ruby.sensing_distanceto = function (block) {
        const order = Blockly.Ruby.ORDER_FUNCTION_CALL;
        const object = Blockly.Ruby.valueToCode(block, 'DISTANCETOMENU', order) || null;
        return [`distance(${object})`, order];
    };

    Blockly.Ruby.sensing_distancetomenu = function (block) {
        const object = Blockly.Ruby.quote_(block.getFieldValue('DISTANCETOMENU') || null);
        return [object, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sensing_askandwait = function (block) {
        const question = Blockly.Ruby.valueToCode(block, 'QUESTION', Blockly.Ruby.ORDER_NONE) || null;
        return `ask_and_wait(${question})\n`;
    };

    Blockly.Ruby.sensing_answer = function () {
        return ['answer', Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sensing_keypressed = function (block) {
        const order = Blockly.Ruby.ORDER_FUNCTION_CALL;
        const key = Blockly.Ruby.valueToCode(block, 'KEY_OPTION', order) || null;
        return [`Key.pressed?(${key})`, order];
    };

    Blockly.Ruby.sensing_keyoptions = function (block) {
        const key = Blockly.Ruby.quote_(block.getFieldValue('KEY_OPTION') || null);
        return [key, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sensing_mousedown = function () {
        return ['Mouse.down?', Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sensing_mousex = function () {
        return ['Mouse.x', Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sensing_mousey = function () {
        return ['Mouse.y', Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sensing_setdragmode = function (block) {
        const mode = Blockly.Ruby.quote_(block.getFieldValue('DRAG_MODE') || null);
        return `set_drag_mode(${mode})\n`;
    };

    Blockly.Ruby.sensing_loudness = function () {
        return ['loudness', Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sensing_timer = function () {
        return ['Timer.value', Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sensing_resettimer = function () {
        return 'Timer.reset\n';
    };

    Blockly.Ruby.sensing_of_object_menu = function (block) {
        const object = block.getFieldValue('OBJECT') || null;
        if (object === '_stage_') {
            return [Blockly.Ruby.quote_(object), Blockly.Ruby.ORDER_ATOMIC];
        }
        return [`sprite(${Blockly.Ruby.quote_(object)})`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sensing_of = function (block) {
        const property = block.getFieldValue('PROPERTY') || null;
        const object = Blockly.Ruby.valueToCode(block, 'OBJECT', Blockly.Ruby.ORDER_NONE) || null;
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
        return [`${object}.${propertyToMethod[property]}`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sensing_current = function (block) {
        const menu = Blockly.Ruby.quote_(block.getFieldValue('CURRENTMENU') || null);
        return [`Time.now(${menu})`, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sensing_dayssince2000 = function () {
        return ['days_since_2000', Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sensing_username = function () {
        return ['user_name', Blockly.Ruby.ORDER_ATOMIC];
    };

    return Blockly;
}
