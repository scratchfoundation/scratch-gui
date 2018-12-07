/**
 * Define Ruby code generator for Music Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    Generator.music_playDrumForBeats = function (block) {
        const drum = Generator.valueToCode(block, 'DRUM', Generator.ORDER_NONE) || null;
        const beats = Generator.valueToCode(block, 'BEATS', Generator.ORDER_NONE) || 0;
        return `play_drum(drum: ${drum}, beats: ${beats})\n`;
    };

    Generator.music_menu_DRUM = function (block) {
        const drum = Generator.getFieldValue(block, 'DRUM') || 1;
        return [drum, Generator.ORDER_ATOMIC];
    };

    Generator.music_restForBeats = function (block) {
        const beats = Generator.valueToCode(block, 'BEATS', Generator.ORDER_NONE) || 0;
        return `rest(${beats})\n`;
    };

    Generator.music_playNoteForBeats = function (block) {
        const note = Generator.valueToCode(block, 'NOTE', Generator.ORDER_NONE) || 0;
        const beats = Generator.valueToCode(block, 'BEATS', Generator.ORDER_NONE) || 0;
        return `play_note(note: ${note}, beats: ${beats})\n`;
    };

    Generator.music_playNoteForBeats = function (block) {
        const note = Generator.valueToCode(block, 'NOTE', Generator.ORDER_NONE) || 0;
        const beats = Generator.valueToCode(block, 'BEATS', Generator.ORDER_NONE) || 0;
        return `play_note(note: ${note}, beats: ${beats})\n`;
    };

    Generator.note = function (block) {
        const note = Generator.getFieldValue(block, 'NOTE') || 0;
        return [note, Generator.ORDER_ATOMIC];
    };

    Generator.music_setInstrument = function (block) {
        const instrument = Generator.valueToCode(block, 'INSTRUMENT', Generator.ORDER_NONE) || null;
        return `self.instrument = ${instrument}\n`;
    };

    Generator.music_menu_INSTRUMENT = function (block) {
        const instrument = Generator.getFieldValue(block, 'INSTRUMENT') || 1;
        return [instrument, Generator.ORDER_ATOMIC];
    };

    Generator.music_setTempo = function (block) {
        const tempo = Generator.valueToCode(block, 'TEMPO', Generator.ORDER_NONE) || 0;
        return `self.tempo = ${tempo}\n`;
    };

    Generator.music_changeTempo = function (block) {
        const tempo = Generator.valueToCode(block, 'TEMPO', Generator.ORDER_NONE) || 0;
        return `self.tempo += ${tempo}\n`;
    };

    Generator.music_getTempo = function () {
        return ['tempo', Generator.ORDER_ATOMIC];
    };

    return Generator;
}
