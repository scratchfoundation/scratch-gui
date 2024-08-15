/* global WebAudioTestAPI */
import 'web-audio-test-api';
WebAudioTestAPI.setState({
    'AudioContext#resume': 'enabled'
});

import SharedAudioContext from '../../../src/lib/audio/shared-audio-context';

describe('Shared Audio Context', () => {
    const audioContext = new AudioContext();

    test('returns empty object without user gesture', () => {
        const sharedAudioContext = new SharedAudioContext();
        expect(sharedAudioContext).toMatchObject({});
    });

    test('returns AudioContext when mousedown is triggered', () => {
        const sharedAudioContext = new SharedAudioContext();
        const event = new Event('mousedown');
        document.dispatchEvent(event);
        expect(sharedAudioContext).toMatchObject(audioContext);
    });

    test('returns AudioContext when touchstart is triggered', () => {
        const sharedAudioContext = new SharedAudioContext();
        const event = new Event('touchstart');
        document.dispatchEvent(event);
        expect(sharedAudioContext).toMatchObject(audioContext);
    });
});
