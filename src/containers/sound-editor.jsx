import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import WavEncoder from 'wav-encoder';

import {connect} from 'react-redux';

import analytics from '../lib/analytics';
import {computeChunkedRMS} from '../lib/audio/audio-util.js';
import AudioEffects from '../lib/audio/audio-effects.js';
import SoundEditorComponent from '../components/sound-editor/sound-editor.jsx';
import AudioBufferPlayer from '../lib/audio/audio-buffer-player.js';
import log from '../lib/log.js';

const UNDO_STACK_SIZE = 99;

class SoundEditor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'copyCurrentBuffer',
            'handleStoppedPlaying',
            'handleChangeName',
            'handlePlay',
            'handleStopPlaying',
            'handleUpdatePlayhead',
            'handleActivateTrim',
            'handleUpdateTrimEnd',
            'handleUpdateTrimStart',
            'handleEffect',
            'handleUndo',
            'handleRedo',
            'submitNewSamples'
        ]);
        this.state = {
            chunkLevels: computeChunkedRMS(this.props.samples),
            playhead: null, // null is not playing, [0 -> 1] is playing percent
            trimStart: null,
            trimEnd: null
        };

        this.redoStack = [];
        this.undoStack = [];
    }
    componentDidMount () {
        this.audioBufferPlayer = new AudioBufferPlayer(this.props.samples, this.props.sampleRate);
        analytics.pageview('/editors/sound');
    }
    componentWillReceiveProps (newProps) {
        if (newProps.soundId !== this.props.soundId) { // A different sound has been selected
            this.redoStack = [];
            this.undoStack = [];
            this.resetState(newProps.samples, newProps.sampleRate);
        }
    }
    componentWillUnmount () {
        this.audioBufferPlayer.stop();
    }
    resetState (samples, sampleRate) {
        this.audioBufferPlayer.stop();
        this.audioBufferPlayer = new AudioBufferPlayer(samples, sampleRate);
        this.setState({
            chunkLevels: computeChunkedRMS(samples),
            playhead: null,
            trimStart: null,
            trimEnd: null
        });
    }
    submitNewSamples (samples, sampleRate, skipUndo) {
        if (!skipUndo) {
            this.redoStack = [];
            if (this.undoStack.length >= UNDO_STACK_SIZE) {
                this.undoStack.shift(); // Drop the first element off the array
            }
            this.undoStack.push(this.copyCurrentBuffer());
        }
        // Encode the new sound into a wav so that it can be stored
        let wavBuffer = null;
        try {
            wavBuffer = WavEncoder.encode.sync({
                sampleRate: sampleRate,
                channelData: [samples]
            });
        } catch (e) {
            // This error state is mostly for the mock sounds used during testing.
            // Any incorrect sound buffer trying to get interpretd as a Wav file
            // should yield this error.
            log.error(`Encountered error while trying to encode sound update: ${e}`);
        }

        this.resetState(samples, sampleRate);
        this.props.vm.updateSoundBuffer(
            this.props.soundIndex,
            this.audioBufferPlayer.buffer,
            wavBuffer ? new Uint8Array(wavBuffer) : new Uint8Array());
    }
    handlePlay () {
        this.audioBufferPlayer.play(
            this.state.trimStart || 0,
            this.state.trimEnd || 1,
            this.handleUpdatePlayhead,
            this.handleStoppedPlaying);
    }
    handleStopPlaying () {
        this.audioBufferPlayer.stop();
        this.handleStoppedPlaying();
    }
    handleStoppedPlaying () {
        this.setState({playhead: null});
    }
    handleUpdatePlayhead (playhead) {
        this.setState({playhead});
    }
    handleChangeName (name) {
        this.props.vm.renameSound(this.props.soundIndex, name);
    }
    handleActivateTrim () {
        if (this.state.trimStart === null && this.state.trimEnd === null) {
            this.setState({trimEnd: 0.95, trimStart: 0.05});
        } else {
            const {samples, sampleRate} = this.copyCurrentBuffer();
            const sampleCount = samples.length;
            const startIndex = Math.floor(this.state.trimStart * sampleCount);
            const endIndex = Math.floor(this.state.trimEnd * sampleCount);
            const clippedSamples = samples.slice(startIndex, endIndex);
            this.submitNewSamples(clippedSamples, sampleRate);
        }
    }
    handleUpdateTrimEnd (trimEnd) {
        this.setState({trimEnd});
    }
    handleUpdateTrimStart (trimStart) {
        this.setState({trimStart});
    }
    effectFactory (name) {
        return () => this.handleEffect(name);
    }
    copyCurrentBuffer () {
        // Cannot reliably use props.samples because it gets detached by Firefox
        return {
            samples: this.audioBufferPlayer.buffer.getChannelData(0),
            sampleRate: this.audioBufferPlayer.buffer.sampleRate
        };
    }
    handleEffect (name) {
        const effects = new AudioEffects(this.audioBufferPlayer.buffer, name);
        effects.process(({renderedBuffer}) => {
            const samples = renderedBuffer.getChannelData(0);
            const sampleRate = renderedBuffer.sampleRate;
            this.submitNewSamples(samples, sampleRate);
            this.handlePlay();
        });
    }
    handleUndo () {
        this.redoStack.push(this.copyCurrentBuffer());
        const {samples, sampleRate} = this.undoStack.pop();
        if (samples) {
            this.submitNewSamples(samples, sampleRate, true);
            this.handlePlay();
        }
    }
    handleRedo () {
        const {samples, sampleRate} = this.redoStack.pop();
        if (samples) {
            this.undoStack.push(this.copyCurrentBuffer());
            this.submitNewSamples(samples, sampleRate, true);
            this.handlePlay();
        }
    }
    render () {
        const {effectTypes} = AudioEffects;
        return (
            <SoundEditorComponent
                canRedo={this.redoStack.length > 0}
                canUndo={this.undoStack.length > 0}
                chunkLevels={this.state.chunkLevels}
                name={this.props.name}
                playhead={this.state.playhead}
                trimEnd={this.state.trimEnd}
                trimStart={this.state.trimStart}
                onActivateTrim={this.handleActivateTrim}
                onChangeName={this.handleChangeName}
                onEcho={this.effectFactory(effectTypes.ECHO)}
                onFaster={this.effectFactory(effectTypes.FASTER)}
                onLouder={this.effectFactory(effectTypes.LOUDER)}
                onPlay={this.handlePlay}
                onRedo={this.handleRedo}
                onReverse={this.effectFactory(effectTypes.REVERSE)}
                onRobot={this.effectFactory(effectTypes.ROBOT)}
                onSetTrimEnd={this.handleUpdateTrimEnd}
                onSetTrimStart={this.handleUpdateTrimStart}
                onSlower={this.effectFactory(effectTypes.SLOWER)}
                onSofter={this.effectFactory(effectTypes.SOFTER)}
                onStop={this.handleStopPlaying}
                onUndo={this.handleUndo}
            />
        );
    }
}

SoundEditor.propTypes = {
    name: PropTypes.string.isRequired,
    sampleRate: PropTypes.number,
    samples: PropTypes.instanceOf(Float32Array),
    soundId: PropTypes.string,
    soundIndex: PropTypes.number,
    vm: PropTypes.shape({
        updateSoundBuffer: PropTypes.func,
        renameSound: PropTypes.func
    })
};

const mapStateToProps = (state, {soundIndex}) => {
    const sprite = state.scratchGui.vm.editingTarget.sprite;
    // Make sure the sound index doesn't go out of range.
    const index = soundIndex < sprite.sounds.length ? soundIndex : sprite.sounds.length - 1;
    const sound = state.scratchGui.vm.editingTarget.sprite.sounds[index];
    const audioBuffer = state.scratchGui.vm.getSoundBuffer(index);
    return {
        soundId: sound.soundId,
        sampleRate: audioBuffer.sampleRate,
        samples: audioBuffer.getChannelData(0),
        name: sound.name,
        vm: state.scratchGui.vm
    };
};

export default connect(
    mapStateToProps
)(SoundEditor);
