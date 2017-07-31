/* eslint-env jest */
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import mockAudioBufferPlayer from '../../__mocks__/audio-buffer-player.js';

import SoundEditor from '../../../src/containers/sound-editor'; // eslint-disable-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import SoundEditorComponent from '../../../src/components/sound-editor/sound-editor';

jest.mock('../../../src/lib/audio/audio-buffer-player', () => mockAudioBufferPlayer);

describe('Sound Editor Container', () => {
    const mockStore = configureStore();
    let store;
    let soundIndex;
    let soundBuffer;
    let samples = new Float32Array([0, 0, 0]); // eslint-disable-line no-undef
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
        store = mockStore({vm});
    });

    test('should pass the correct data to the component from the store', () => {
        const wrapper = mount(<SoundEditor store={store} soundIndex={soundIndex} />);
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
        const wrapper = mount(<SoundEditor store={store} soundIndex={soundIndex} />);
        const component = wrapper.find(SoundEditorComponent);
        // Ensure rendering doesn't start playing any sounds
        expect(mockAudioBufferPlayer.instance.play.mock.calls).toEqual([]);
        expect(mockAudioBufferPlayer.instance.stop.mock.calls).toEqual([]);

        component.props().onPlay();
        expect(mockAudioBufferPlayer.instance.play).toHaveBeenCalled();

        // Mock the audio buffer player calling onUpdate
        mockAudioBufferPlayer.instance.onUpdate(0.5);
        expect(component.props().playhead).toEqual(0.5);

        component.props().onStop();
        expect(mockAudioBufferPlayer.instance.stop).toHaveBeenCalled();
        expect(component.props().playhead).toEqual(null);
    });

    test('it sets the component props for trimming and submits to the vm', () => {
        const wrapper = mount(<SoundEditor store={store} soundIndex={soundIndex} />);
        const component = wrapper.find(SoundEditorComponent);

        component.props().onActivateTrim();
        expect(component.props().trimStart).not.toEqual(null);
        expect(component.props().trimEnd).not.toEqual(null);

        component.props().onActivateTrim();
        expect(vm.updateSoundBuffer).toHaveBeenCalled();
        expect(component.props().trimStart).toEqual(null);
        expect(component.props().trimEnd).toEqual(null);
    });

    test('it submits name changes to the vm', () => {
        const wrapper = mount(<SoundEditor store={store} soundIndex={soundIndex} />);
        const component = wrapper.find(SoundEditorComponent);
        component.props().onChangeName('hello');
        expect(vm.renameSound).toHaveBeenCalledWith(soundIndex, 'hello');
    });
});
