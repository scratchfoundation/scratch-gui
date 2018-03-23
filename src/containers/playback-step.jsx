import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import PlaybackStepComponent from '../components/record-modal/playback-step.jsx';
import AudioBufferPlayer from '../lib/audio/audio-buffer-player.js';

class PlaybackStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handlePlay',
            'handleStopPlaying'
        ]);
    }
    componentDidMount () {
        this.audioBufferPlayer = new AudioBufferPlayer(this.props.samples, this.props.sampleRate);
    }
    componentWillUnmount () {
        this.audioBufferPlayer.stop();
    }
    handlePlay () {
        this.audioBufferPlayer.play(
            this.props.trimStart,
            this.props.trimEnd,
            this.props.onSetPlayhead,
            this.props.onStopPlaying
        );
        this.props.onPlay();
    }
    handleStopPlaying () {
        this.audioBufferPlayer.stop();
        this.props.onStopPlaying();
    }
    render () {
        const {
            sampleRate, // eslint-disable-line no-unused-vars
            onPlay, // eslint-disable-line no-unused-vars
            onStopPlaying, // eslint-disable-line no-unused-vars
            onSetPlayhead, // eslint-disable-line no-unused-vars
            ...componentProps
        } = this.props;
        return (
            <PlaybackStepComponent
                onPlay={this.handlePlay}
                onStopPlaying={this.handleStopPlaying}
                {...componentProps}
            />
        );
    }
}

PlaybackStep.propTypes = {
    sampleRate: PropTypes.number.isRequired,
    samples: PropTypes.instanceOf(Float32Array).isRequired,
    ...PlaybackStepComponent.propTypes
};

export default PlaybackStep;
