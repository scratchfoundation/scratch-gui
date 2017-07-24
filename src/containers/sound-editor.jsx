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
            'handleUpdatePlayhead'
        ]);
        this.state = {
            playhead: null, // null is not playing, [0 -> 1] is playing percent
            chunkLevels: computeChunkedRMS(this.props.samples)
        };
    }
    componentDidMount () {
        this.audioBufferPlayer = new AudioBufferPlayer(this.props.samples, this.props.sampleRate);
    }
    componentWillReceiveProps (newProps) {
        if (newProps.soundIndex !== this.props.soundIndex) {
            this.audioBufferPlayer.stop();
            this.audioBufferPlayer = new AudioBufferPlayer(newProps.samples, newProps.sampleRate);
            this.setState({chunkLevels: computeChunkedRMS(newProps.samples)});
        }
    }
    componentWillUnmount () {
        this.audioBufferPlayer.stop();
    }
    handlePlay () {
        this.audioBufferPlayer.play(
            0,
            1,
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
    render () {
        return (
            <SoundEditorComponent
                chunkLevels={this.state.chunkLevels}
                name={this.props.name}
                playhead={this.state.playhead}
                trimEnd={this.state.trimEnd}
                trimStart={this.state.trimStart}
                onChangeName={this.handleChangeName}
                onPlay={this.handlePlay}
                onSetTrimEnd={this.handleUpdateTrimEnd}
                onSetTrimStart={this.handleUpdateTrimStart}
                onStop={this.handleStopPlaying}
                onTrim={this.handleActivateTrim}
            />
        );
    }
}

SoundEditor.propTypes = {
    name: PropTypes.string.isRequired,
    onRenameSound: PropTypes.func.isRequired,
    sampleRate: PropTypes.number,
    samples: PropTypes.instanceOf(Float32Array),
    soundIndex: PropTypes.number
};

const mapStateToProps = (state, {soundIndex}) => {
    const sound = state.vm.editingTarget.sprite.sounds[soundIndex];
    const audioBuffer = state.vm.runtime.audioEngine.audioBuffers[sound.md5];
    return {
        sampleRate: audioBuffer.sampleRate,
        samples: audioBuffer.getChannelData(0),
        name: sound.name,
        onRenameSound: state.vm.renameSound.bind(state.vm)
    };
};

export default connect(
    mapStateToProps
)(SoundEditor);
