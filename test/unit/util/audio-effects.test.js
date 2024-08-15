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
        const audioEffects = new AudioEffects(audioBuffer, 'faster', 0, 1);
        expect(audioEffects.audioContext._.length).toBeLessThan(400);
    });

    test('changes buffer length  and playback rate for slower effect', () => {
        const audioEffects = new AudioEffects(audioBuffer, 'slower', 0, 1);
        expect(audioEffects.audioContext._.length).toBeGreaterThan(400);
    });

    test('changes buffer length for echo effect', () => {
        const audioEffects = new AudioEffects(audioBuffer, 'echo', 0, 1);
        expect(audioEffects.audioContext._.length).toBeGreaterThan(400);
    });

    test('updates the trim positions after an effect has changed the length of selection', () => {
        const slowerEffect = new AudioEffects(audioBuffer, 'slower', 0.25, 0.75);
        expect(slowerEffect.adjustedTrimStartSeconds).toEqual(slowerEffect.trimStartSeconds);
        expect(slowerEffect.adjustedTrimEndSeconds).toBeGreaterThan(slowerEffect.trimEndSeconds);

        const fasterEffect = new AudioEffects(audioBuffer, 'faster', 0.25, 0.75);
        expect(fasterEffect.adjustedTrimStartSeconds).toEqual(fasterEffect.trimStartSeconds);
        expect(fasterEffect.adjustedTrimEndSeconds).toBeLessThan(fasterEffect.trimEndSeconds);

        // Some effects do not change the length of the selection
        const fadeEffect = new AudioEffects(audioBuffer, 'fade in', 0.25, 0.75);
        expect(fadeEffect.adjustedTrimStartSeconds).toEqual(fadeEffect.trimStartSeconds);
        // Should be within one millisecond (flooring can change the duration by one sample)
        expect(fadeEffect.adjustedTrimEndSeconds).toBeCloseTo(fadeEffect.trimEndSeconds, 3);
    });

    test.skip('process starts the offline rendering context and returns a promise', () => {
        // @todo haven't been able to get web audio test api to actually run render
    });

    test('reverse effect strictly reverses the samples', () => {
        const fakeSound = [1, 2, 3, 4, 5, 6, 7, 8];

        const fakeBuffer = audioContext.createBuffer(1, 8, 44100);
        const bufferData = fakeBuffer.getChannelData(0);
        fakeSound.forEach((sample, index) => {
            bufferData[index] = sample;
        });

        // Reverse the entire sound
        const reverseAll = new AudioEffects(fakeBuffer, 'reverse', 0, 1);
        expect(Array.from(reverseAll.buffer.getChannelData(0))).toEqual(fakeSound.reverse());

        // Reverse part of the sound
        const reverseSelection = new AudioEffects(fakeBuffer, 'reverse', 0.25, 0.75);
        const selectionReversed = [1, 2, 6, 5, 4, 3, 7, 8];
        expect(Array.from(reverseSelection.buffer.getChannelData(0))).toEqual(selectionReversed);
    });
});

describe('Effects', () => {
    let audioContext;

    beforeEach(() => {
        audioContext = new AudioContext();
    });

    test('all effects provide an input and output that are connected', () => {
        const robotEffect = new RobotEffect(audioContext, 0, 1);
        expect(robotEffect.input).toBeInstanceOf(AudioNode);
        expect(robotEffect.output).toBeInstanceOf(AudioNode);

        const echoEffect = new EchoEffect(audioContext, 0, 1);
        expect(echoEffect.input).toBeInstanceOf(AudioNode);
        expect(echoEffect.output).toBeInstanceOf(AudioNode);

        const volumeEffect = new VolumeEffect(audioContext, 0.5, 0, 1);
        expect(volumeEffect.input).toBeInstanceOf(AudioNode);
        expect(volumeEffect.output).toBeInstanceOf(AudioNode);
    });
});
