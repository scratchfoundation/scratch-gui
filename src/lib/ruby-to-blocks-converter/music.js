/* global Opal */
import _ from 'lodash';

/**
 * Music converter
 */
const MusicConverter = {
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'play_drum':
                if (args.length === 1 && this._isHash(args[0]) && args[0].size === 2) {
                    const drum = args[0].get('sym:drum');
                    const beats = args[0].get('sym:beats');
                    if (this._isNumberOrBlock(drum) && this._isNumberOrBlock(beats)) {
                        block = this._createBlock('music_playDrumForBeats', 'statement');
                        this._addInput(
                            block,
                            'DRUM',
                            this._createFieldBlock('music_menu_DRUM', 'DRUM', drum)
                        );
                        this._addNumberInput(block, 'BEATS', 'math_number', beats, 0.25);
                    }
                }
                break;
            case 'rest':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('music_restForBeats', 'statement');
                    this._addNumberInput(block, 'BEATS', 'math_number', args[0], 0.25);
                }
                break;
            case 'play_note':
                if (args.length === 1 && this._isHash(args[0]) && args[0].size === 2) {
                    const note = args[0].get('sym:note');
                    const beats = args[0].get('sym:beats');
                    if (this._isNumberOrBlock(note) && this._isNumberOrBlock(beats)) {
                        block = this._createBlock('music_playNoteForBeats', 'statement');
                        this._addNoteInput(block, 'NOTE', note, 60);
                        this._addNumberInput(block, 'BEATS', 'math_number', beats, 0.25);
                    }
                }
                break;
            case 'instrument=':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('music_setInstrument', 'statement');
                    this._addInput(
                        block,
                        'INSTRUMENT',
                        this._createFieldBlock('music_menu_INSTRUMENT', 'INSTRUMENT', args[0])
                    );
                }
                break;
            case 'tempo=':
                if (args.length === 1 && this._isNumberOrBlock(args[0])) {
                    block = this._createBlock('music_setTempo', 'statement');
                    this._addNumberInput(block, 'TEMPO', 'math_number', args[0], 60);
                }
                break;
            case 'tempo':
                if (args.length === 0) {
                    block = this._createBlock('music_getTempo', 'value');
                }
                break;
            }
        }
        return block;
    },

    // eslint-disable-next-line no-unused-vars
    onOpAsgn: function (lh, operator, rh) {
        let block;
        if (this._isBlock(lh) && operator === '+' && this._isNumberOrBlock(rh)) {
            switch (lh.opcode) {
            case 'music_getTempo':
                block = this._changeBlock(lh, 'music_changeTempo', 'statement');
                this._addNumberInput(block, 'TEMPO', 'math_number', rh, 20);
                break;
            }
        }
        return block;
    }
};

export default MusicConverter;
