import WebAudioTestAPI from 'web-audio-test-api';
import SharedAudioContext from '../../../src/lib/audio/shared-audio-context';

WebAudioTestAPI.setState({
    'AudioContext#resume': 'enabled'
});

describe('Shared Audio Context', () => {
    const audioContext = new AudioContext();

    test('returns empty object without user gesture', () => {
        const sharedAudioContext = new SharedAudioContext();
        expect(sharedAudioContext).toMatchObject({});
    });

    // TODO: support both instead of either/or (see shared-audio-context)
    // then make this two separate tests
    test('returns AudioContext when mousedown/touchstart is triggered', () => {
        const sharedAudioContext1 = new SharedAudioContext();
        expect(sharedAudioContext1).toMatchObject({});
        document.dispatchEvent(new Event('mousedown'));
        document.dispatchEvent(new Event('touchstart'));
        const sharedAudioContext2 = new SharedAudioContext();
        expect(sharedAudioContext2).toMatchObject(audioContext);
    });
});
