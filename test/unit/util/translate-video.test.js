import {translateVideo} from '../../../src/lib/libraries/decks/translate-video.js';

describe('translateVideo', () => {
    test('returns the id if it is not found', () => {
        expect(translateVideo('not-a-key', 'en')).toEqual('not-a-key');
    });

    test('returns the expected id for Japanese', () => {
        expect(translateVideo('intro-move-sayhello', 'ja')).toEqual('v2c2f3y2sc');
    });

    test('returns the expected id for English', () => {
        expect(translateVideo('intro-move-sayhello', 'en')).toEqual('rpjvs3v9gj');
    });

    test('returns the English id for non-existent locales', () => {
        expect(translateVideo('intro-move-sayhello', 'yum')).toEqual('rpjvs3v9gj');
    });
});
