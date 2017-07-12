const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const {connect} = require('react-redux');

const {computeRMS} = require('../lib/audio/audio-util.js');

const SoundEditorComponent = require('../components/sound-editor/sound-editor.jsx');
const AudioBufferPlayer = require('../lib/audio/audio-buffer-player.js');

const getChunkLevels = (samples, chunkSize = 1024) => {
    const sampleCount = samples.length;
    const chunkLevels = [];
    for (let i = 0; i < sampleCount; i += chunkSize) {
        const maxIndex = Math.min(sampleCount - 1, i + chunkSize);
        chunkLevels.push(computeRMS(samples.slice(i, maxIndex), true));
    }
    return chunkLevels;
};

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
            chunkLevels: getChunkLevels(this.props.samples)
        };
    }
    componentDidMount () {
        this.audioBufferPlayer = new AudioBufferPlayer(this.props.samples, this.props.sampleRate);
    }
    componentWillReceiveProps (newProps) {
        if (newProps.soundIndex !== this.props.soundIndex) {
            this.audioBufferPlayer.stop();
            this.audioBufferPlayer = new AudioBufferPlayer(newProps.samples, newProps.sampleRate);
            this.setState({chunkLevels: getChunkLevels(newProps.samples)});
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

module.exports = connect(
    mapStateToProps
)(SoundEditor);
