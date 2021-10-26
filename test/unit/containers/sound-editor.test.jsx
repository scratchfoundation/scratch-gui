import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import configureStore from 'redux-mock-store';
import mockAudioBufferPlayer from '../../__mocks__/audio-buffer-player.js';
import mockAudioEffects from '../../__mocks__/audio-effects.js';

import SoundEditor from '../../../src/containers/sound-editor';
import SoundEditorComponent from '../../../src/components/sound-editor/sound-editor';

jest.mock('react-ga');
jest.mock('../../../src/lib/audio/audio-buffer-player', () => mockAudioBufferPlayer);
jest.mock('../../../src/lib/audio/audio-effects', () => mockAudioEffects);

describe('Sound Editor Container', () => {
    const mockStore = configureStore();
    let store;
    let soundIndex;
    let soundBuffer;
    const samples = new Float32Array([0, 0, 0]); // eslint-disable-line no-undef
    let vm;

    beforeEach(() => {
        soundIndex = 0;
        soundBuffer = {
            sampleRate: 0,
            getChannelData: jest.fn(() => samples)
        };
        vm = {
            getSoundBuffer: jest.fn(() => soundBuffer),
            renameSound: jest.fn(),
            updateSoundBuffer: jest.fn(),
            editingTarget: {
                sprite: {
                    sounds: [{name: 'first name', id: 'first id'}]
                }
            }
        };
        store = mockStore({scratchGui: {vm: vm, mode: {isFullScreen: false}}});
    });

    test('should pass the correct data to the component from the store', () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        const componentProps = wrapper.find(SoundEditorComponent).props();
        // Data retreived and processed by the `connect` with the store
        expect(componentProps.name).toEqual('first name');
        expect(componentProps.chunkLevels).toEqual([0]);
        expect(mockAudioBufferPlayer.instance.samples).toEqual(samples);
        // Initial data
        expect(componentProps.playhead).toEqual(null);
        expect(componentProps.trimStart).toEqual(null);
        expect(componentProps.trimEnd).toEqual(null);

    });

    test('it plays when clicked and stops when clicked again', () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        let component = wrapper.find(SoundEditorComponent);
        // Ensure rendering doesn't start playing any sounds
        expect(mockAudioBufferPlayer.instance.play.mock.calls).toEqual([]);
        expect(mockAudioBufferPlayer.instance.stop.mock.calls).toEqual([]);

        component.props().onPlay();
        expect(mockAudioBufferPlayer.instance.play).toHaveBeenCalled();

        // Mock the audio buffer player calling onUpdate
        mockAudioBufferPlayer.instance.onUpdate(0.5);
        wrapper.update();
        component = wrapper.find(SoundEditorComponent);
        expect(component.props().playhead).toEqual(0.5);

        component.props().onStop();
        wrapper.update();
        component = wrapper.find(SoundEditorComponent);
        expect(mockAudioBufferPlayer.instance.stop).toHaveBeenCalled();
        expect(component.props().playhead).toEqual(null);
    });

    test('it submits name changes to the vm', () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        const component = wrapper.find(SoundEditorComponent);
        component.props().onChangeName('hello');
        expect(vm.renameSound).toHaveBeenCalledWith(soundIndex, 'hello');
    });

    test('it handles an effect by submitting the result and playing', async () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        const component = wrapper.find(SoundEditorComponent);
        component.props().onReverse(); // Could be any of the effects, just testing the end result
        await mockAudioEffects.instance._finishProcessing(soundBuffer);
        expect(mockAudioBufferPlayer.instance.play).toHaveBeenCalled();
        expect(vm.updateSoundBuffer).toHaveBeenCalled();
    });

    test('it handles reverse effect correctly', () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        const component = wrapper.find(SoundEditorComponent);
        component.props().onReverse();
        expect(mockAudioEffects.instance.name).toEqual(mockAudioEffects.effectTypes.REVERSE);
        expect(mockAudioEffects.instance.process).toHaveBeenCalled();
    });

    test('it handles louder effect correctly', () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        const component = wrapper.find(SoundEditorComponent);
        component.props().onLouder();
        expect(mockAudioEffects.instance.name).toEqual(mockAudioEffects.effectTypes.LOUDER);
        expect(mockAudioEffects.instance.process).toHaveBeenCalled();
    });

    test('it handles softer effect correctly', () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        const component = wrapper.find(SoundEditorComponent);
        component.props().onSofter();
        expect(mockAudioEffects.instance.name).toEqual(mockAudioEffects.effectTypes.SOFTER);
        expect(mockAudioEffects.instance.process).toHaveBeenCalled();
    });

    test('it handles faster effect correctly', () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        const component = wrapper.find(SoundEditorComponent);
        component.props().onFaster();
        expect(mockAudioEffects.instance.name).toEqual(mockAudioEffects.effectTypes.FASTER);
        expect(mockAudioEffects.instance.process).toHaveBeenCalled();
    });

    test('it handles slower effect correctly', () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        const component = wrapper.find(SoundEditorComponent);
        component.props().onSlower();
        expect(mockAudioEffects.instance.name).toEqual(mockAudioEffects.effectTypes.SLOWER);
        expect(mockAudioEffects.instance.process).toHaveBeenCalled();
    });

    test('it handles echo effect correctly', () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        const component = wrapper.find(SoundEditorComponent);
        component.props().onEcho();
        expect(mockAudioEffects.instance.name).toEqual(mockAudioEffects.effectTypes.ECHO);
        expect(mockAudioEffects.instance.process).toHaveBeenCalled();
    });

    test('it handles robot effect correctly', () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        const component = wrapper.find(SoundEditorComponent);
        component.props().onRobot();
        expect(mockAudioEffects.instance.name).toEqual(mockAudioEffects.effectTypes.ROBOT);
        expect(mockAudioEffects.instance.process).toHaveBeenCalled();
    });

    test('undo/redo stack state', async () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        let component = wrapper.find(SoundEditorComponent);
        // Undo and redo should be disabled initially
        expect(component.prop('canUndo')).toEqual(false);
        expect(component.prop('canRedo')).toEqual(false);

        // Submitting new samples should make it possible to undo
        component.props().onFaster();
        await mockAudioEffects.instance._finishProcessing(soundBuffer);
        wrapper.update();
        component = wrapper.find(SoundEditorComponent);
        expect(component.prop('canUndo')).toEqual(true);
        expect(component.prop('canRedo')).toEqual(false);

        // Undoing should make it possible to redo and not possible to undo again
        await component.props().onUndo();
        wrapper.update();
        component = wrapper.find(SoundEditorComponent);
        expect(component.prop('canUndo')).toEqual(false);
        expect(component.prop('canRedo')).toEqual(true);

        // Redoing should make it possible to undo and not possible to redo again
        await component.props().onRedo();
        wrapper.update();
        component = wrapper.find(SoundEditorComponent);
        expect(component.prop('canUndo')).toEqual(true);
        expect(component.prop('canRedo')).toEqual(false);

        // New submission should clear the redo stack
        await component.props().onUndo(); // Undo to go back to a state where redo is enabled
        wrapper.update();
        component = wrapper.find(SoundEditorComponent);
        expect(component.prop('canRedo')).toEqual(true);
        component.props().onFaster();
        await mockAudioEffects.instance._finishProcessing(soundBuffer);

        wrapper.update();
        component = wrapper.find(SoundEditorComponent);
        expect(component.prop('canRedo')).toEqual(false);
    });

    test('undo and redo submit new samples and play the sound', async () => {
        const wrapper = mountWithIntl(
            <SoundEditor
                soundIndex={soundIndex}
                store={store}
            />
        );
        let component = wrapper.find(SoundEditorComponent);

        // Set up an undoable state
        component.props().onFaster();
        await mockAudioEffects.instance._finishProcessing(soundBuffer);
        wrapper.update();
        component = wrapper.find(SoundEditorComponent);

        // Undo should update the sound buffer and play the new samples
        await component.props().onUndo();
        expect(mockAudioBufferPlayer.instance.play).toHaveBeenCalled();
        expect(vm.updateSoundBuffer).toHaveBeenCalled();

        // Clear the mocks call history to assert again for redo.
        vm.updateSoundBuffer.mockClear();
        mockAudioBufferPlayer.instance.play.mockClear();

        // Undo should update the sound buffer and play the new samples
        await component.props().onRedo();
        expect(mockAudioBufferPlayer.instance.play).toHaveBeenCalled();
        expect(vm.updateSoundBuffer).toHaveBeenCalled();
    });
});
