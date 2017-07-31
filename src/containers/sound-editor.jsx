import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';

import {computeChunkedRMS} from '../lib/audio/audio-util.js';

import SoundEditorComponent from '../components/sound-editor/sound-editor.jsx';
import AudioBufferPlayer from '../lib/audio/audio-buffer-player.js';

class SoundEditor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleStoppedPlaying',
            'handleChangeName',
            'handlePlay',
            'handleStopPlaying',
            'handleUpdatePlayhead',
            'handleActivateTrim',
            'handleUpdateTrimEnd',
            'handleUpdateTrimStart'
        ]);
        this.state = {
            chunkLevels: computeChunkedRMS(this.props.samples),
            playhead: null, // null is not playing, [0 -> 1] is playing percent
            trimStart: null,
            trimEnd: null
        };
    }
    componentDidMount () {
        this.audioBufferPlayer = new AudioBufferPlayer(this.props.samples, this.props.sampleRate);
    }
    componentWillReceiveProps (newProps) {
        if (newProps.soundId !== this.props.soundId) { // A different sound has been selected
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
    submitNewSamples (samples, sampleRate) {
        this.resetState(samples, sampleRate);
        this.props.onUpdateSoundBuffer(
            this.props.soundIndex,
            this.audioBufferPlayer.buffer
        );
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
        this.props.onRenameSound(this.props.soundIndex, name);
    }
    handleActivateTrim () {
        if (this.state.trimStart === null && this.state.trimEnd === null) {
            this.setState({trimEnd: 0.95, trimStart: 0.05});
        } else {
            const sampleCount = this.props.samples.length;
            const startIndex = Math.floor(this.state.trimStart * sampleCount);
            const endIndex = Math.floor(this.state.trimEnd * sampleCount);
            const clippedSamples = this.props.samples.slice(startIndex, endIndex);
            this.submitNewSamples(clippedSamples, this.props.sampleRate);
        }
    }
    handleUpdateTrimEnd (trimEnd) {
        this.setState({trimEnd});
    }
    handleUpdateTrimStart (trimStart) {
        this.setState({trimStart});
    }
    render () {
        return (
            <SoundEditorComponent
                chunkLevels={this.state.chunkLevels}
                name={this.props.name}
                playhead={this.state.playhead}
                trimEnd={this.state.trimEnd}
                trimStart={this.state.trimStart}
                onActivateTrim={this.handleActivateTrim}
                onChangeName={this.handleChangeName}
                onPlay={this.handlePlay}
                onSetTrimEnd={this.handleUpdateTrimEnd}
                onSetTrimStart={this.handleUpdateTrimStart}
                onStop={this.handleStopPlaying}
            />
        );
    }
}

SoundEditor.propTypes = {
    name: PropTypes.string.isRequired,
    onRenameSound: PropTypes.func.isRequired,
    onUpdateSoundBuffer: PropTypes.func.isRequired,
    sampleRate: PropTypes.number,
    samples: PropTypes.instanceOf(Float32Array),
    soundId: PropTypes.string,
    soundIndex: PropTypes.number
};

const mapStateToProps = (state, {soundIndex}) => {
    const sound = state.vm.editingTarget.sprite.sounds[soundIndex];
    const audioBuffer = state.vm.getSoundBuffer(soundIndex);
    return {
        soundId: sound.soundId,
        sampleRate: audioBuffer.sampleRate,
        samples: audioBuffer.getChannelData(0),
        name: sound.name,
        onRenameSound: state.vm.renameSound.bind(state.vm),
        onUpdateSoundBuffer: state.vm.updateSoundBuffer.bind(state.vm)
    };
};

export default connect(
    mapStateToProps
)(SoundEditor);
