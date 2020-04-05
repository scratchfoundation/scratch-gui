/**
 * Define Ruby code generator for Pen Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.pen_clear = function () {
        return 'pen_clear\n';
    };

    Generator.pen_stamp = function () {
        return 'pen_stamp\n';
    };

    Generator.pen_penDown = function () {
        return 'pen_down\n';
    };

    Generator.pen_penUp = function () {
        return 'pen_up\n';
    };

    Generator.pen_setPenColorToColor = function (block) {
        const color = Generator.valueToCode(block, 'COLOR', Generator.ORDER_NONE) || null;
        return `self.pen_color = ${color}\n`;
    };

    Generator.pen_changePenColorParamBy = function (block) {
        const colorParam = Generator.valueToCode(block, 'COLOR_PARAM', Generator.ORDER_NONE) || null;
        const value = Generator.valueToCode(block, 'VALUE', Generator.ORDER_NONE) || 0;
        return `self.pen_${colorParam} += ${value}\n`;
    };

    Generator.pen_setPenColorParamTo = function (block) {
        const colorParam = Generator.valueToCode(block, 'COLOR_PARAM', Generator.ORDER_NONE) || null;
        const value = Generator.valueToCode(block, 'VALUE', Generator.ORDER_NONE) || 0;
        return `self.pen_${colorParam} = ${value}\n`;
    };

    Generator.pen_menu_colorParam = function (block) {
        const colorParam = Generator.getFieldValue(block, 'colorParam') || 'color';
        return [colorParam, Generator.ORDER_ATOMIC];
    };

    Generator.pen_changePenSizeBy = function (block) {
        const size = Generator.valueToCode(block, 'SIZE', Generator.ORDER_NONE) || 0;
        return `self.pen_size += ${size}\n`;
    };

    Generator.pen_setPenSizeTo = function (block) {
        const size = Generator.valueToCode(block, 'SIZE', Generator.ORDER_NONE) || 0;
        return `self.pen_size = ${size}\n`;
    };

    return Generator;
}
