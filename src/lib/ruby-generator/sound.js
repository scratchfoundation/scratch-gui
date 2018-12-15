/**
 * Define Ruby code generator for Sound Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator){
    Generator.sound_sounds_menu = function (block) {
        const sound = Generator.quote_(Generator.getFieldValue(block, 'SOUND_MENU') || '');
        return [sound, Generator.ORDER_ATOMIC];
    };

    Generator.sound_playuntildone = function (block) {
        const sound = Generator.valueToCode(block, 'SOUND_MENU', Generator.ORDER_NONE) || null;
        return `play_until_done(${sound})\n`;
    };

    Generator.sound_play = function (block) {
        const sound = Generator.valueToCode(block, 'SOUND_MENU', Generator.ORDER_NONE) || null;
        return `play(${sound})\n`;
    };

    Generator.sound_stopallsounds = function () {
        return 'stop_all_sounds\n';
    };

    Generator.sound_changeeffectby = function (block) {
        const effect = Generator.quote_(Generator.getFieldValue(block, 'EFFECT') || '');
        const value = Generator.valueToCode(block, 'VALUE', Generator.ORDER_NONE) || '0';
        return `change_sound_effect_by(${effect}, ${value})\n`;
    };

    Generator.sound_seteffectto = function (block) {
        const effect = Generator.quote_(Generator.getFieldValue(block, 'EFFECT') || '');
        const value = Generator.valueToCode(block, 'VALUE', Generator.ORDER_NONE) || '0';
        return `set_sound_effect(${effect}, ${value})\n`;
    };

    Generator.sound_cleareffects = function () {
        return 'clear_sound_effects\n';
    };

    Generator.sound_changevolumeby = function (block) {
        const volume = Generator.valueToCode(block, 'VOLUME', Generator.ORDER_NONE) || '0';
        return `self.volume += ${volume}\n`;
    };

    Generator.sound_setvolumeto = function (block) {
        const volume = Generator.valueToCode(block, 'VOLUME', Generator.ORDER_NONE) || '0';
        return `self.volume = ${volume}\n`;
    };

    Generator.sound_volume = function () {
        return ['volume', Generator.ORDER_ATOMIC];
    };

    return Generator;
}
