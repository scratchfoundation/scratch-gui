/* global WebAudioTestAPI */
import 'web-audio-test-api';
WebAudioTestAPI.setState({
    'OfflineAudioContext#startRendering': 'promise'
});

import AudioEffects from '../../../src/lib/audio/audio-effects';
import RobotEffect from '../../../src/lib/audio/effects/robot-effect';
import EchoEffect from '../../../src/lib/audio/effects/echo-effect';
import VolumeEffect from '../../../src/lib/audio/effects/volume-effect';

describe('Audio Effects manager', () => {
    const audioContext = new AudioContext();
    const audioBuffer = audioContext.createBuffer(1, 400, 44100);

    test('changes buffer length and playback rate for faster effect', () => {
        const audioEffects = new AudioEffects(audioBuffer, 'faster');
        expect(audioEffects.audioContext._.length).toBeLessThan(400);
        expect(audioEffects.source.playbackRate.value).toBeGreaterThan(1);
    });

    test('changes buffer length  and playback rate for slower effect', () => {
        const audioEffects = new AudioEffects(audioBuffer, 'slower');
        expect(audioEffects.audioContext._.length).toBeGreaterThan(400);
        expect(audioEffects.source.playbackRate.value).toBeLessThan(1);
    });

    test('changes buffer length for echo effect', () => {
        const audioEffects = new AudioEffects(audioBuffer, 'echo');
        expect(audioEffects.audioContext._.length).toBeGreaterThan(400);
    });

    test.skip('process starts the offline rendering context and returns a promise', () => {
        // @todo haven't been able to get web audio test api to actually run render
    });
});

describe('Effects', () => {
    let audioContext;

    beforeEach(() => {
        audioContext = new AudioContext();
    });

    test('all effects provide an input and output that are connected', () => {
        const robotEffect = new RobotEffect(audioContext, 0.5);
        expect(robotEffect.input).toBeInstanceOf(AudioNode);
        expect(robotEffect.output).toBeInstanceOf(AudioNode);

        const echoEffect = new EchoEffect(audioContext, 0.5);
        expect(echoEffect.input).toBeInstanceOf(AudioNode);
        expect(echoEffect.output).toBeInstanceOf(AudioNode);

        const volumeEffect = new VolumeEffect(audioContext, 0.5);
        expect(volumeEffect.input).toBeInstanceOf(AudioNode);
        expect(volumeEffect.output).toBeInstanceOf(AudioNode);
    });
});
