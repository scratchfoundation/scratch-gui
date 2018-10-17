/**
 * Define Ruby with Sound Blocks
 * @param {Blockly} Blockly The ScratchBlocks
 * @return {Blockly} Blockly defined Ruby generator.
 */
export default function (Blockly){
    Blockly.Ruby.sound_sounds_menu = function (block) {
        const sound = block.getFieldValue('SOUND_MENU') || null;
        return [sound, Blockly.Ruby.ORDER_ATOMIC];
    };

    Blockly.Ruby.sound_playuntildone = function (block) {
        const sound = Blockly.Ruby.valueToCode(block, 'SOUND_MENU', Blockly.Ruby.ORDER_NONE) || null;
        return `Sound.play_until_done(name: "${sound}")\n`;
    };

    Blockly.Ruby.sound_play = function (block) {
        const sound = Blockly.Ruby.valueToCode(block, 'SOUND_MENU', Blockly.Ruby.ORDER_NONE) || null;
        return `Sound.play(name: "${sound}")\n`;
    };

    Blockly.Ruby.sound_stopallsounds = function () {
        return 'stop_all_sounds\n';
    };

    Blockly.Ruby.sound_changeeffectby = function (block) {
        const effect = block.getFieldValue('EFFECT') || null;
        const value = Blockly.Ruby.valueToCode(block, 'VALUE', Blockly.Ruby.ORDER_NONE) || '0';
        return `change_effect_by(effect: "${effect}", value: ${value})\n`;
    };

    Blockly.Ruby.sound_seteffectto = function (block) {
        const effect = block.getFieldValue('EFFECT') || null;
        const value = Blockly.Ruby.valueToCode(block, 'VALUE', Blockly.Ruby.ORDER_NONE) || '0';
        return `set_effect(effect: "${effect}",value: ${value})\n`;
    };

    Blockly.Ruby.sound_cleareffects = function () {
        return 'clear_effects\n';
    };

    Blockly.Ruby.sound_changevolumeby = function (block) {
        const volume = Blockly.Ruby.valueToCode(block, 'VOLUME', Blockly.Ruby.ORDER_NONE) || '0';
        return `Sound.volume += ${volume}\n`;
    };

    Blockly.Ruby.sound_setvolumeto = function (block) {
        const volume = Blockly.Ruby.valueToCode(block, 'VOLUME', Blockly.Ruby.ORDER_NONE) || '0';
        return `Sound.volume = ${volume}\n`;
    };

    Blockly.Ruby.sound_volume = function () {
        return ['Sound.volume', Blockly.Ruby.ORDER_ATOMIC];
    };

    return Blockly;
}
