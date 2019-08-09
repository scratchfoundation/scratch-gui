import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import RecordingStepComponent from '../components/record-modal/recording-step.jsx';
import AudioRecorder from '../lib/audio/audio-recorder.js';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import Waveform from '../components/waveform/waveform.jsx';

const messages = defineMessages({
    alertMsg: {
        defaultMessage: 'Could not start recording',
        description: 'Alert for recording error',
        id: 'gui.recordingStep.alertMsg'
    }
});

class RecordingStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setVisRef',
            'handleRecord',
            'handleStopRecording',
            'handleStarted',
            'handleLevelUpdate',
            'handleRecordingError'
        ]);

        this.state = {
            listening: false,
            level: 0,
            levels: null
        };
    }
    componentDidMount () {
        this.audioRecorder = new AudioRecorder();
        this.audioRecorder.startListening(this.handleStarted, this.handleLevelUpdate, this.handleRecordingError);
    }
    componentWillUnmount () {
        this.audioRecorder.dispose();
    }
    handleStarted () {
        this.setState({listening: true});
    }
    handleRecordingError () {
        alert(this.props.intl.formatMessage(messages.alertMsg)); // eslint-disable-line no-alert
    }
    handleLevelUpdate (level) {
        if (this.props.recording) {
            const levels = this._levels || [];
            levels.push(level);
            // if (levels.length > WAVEFORM_WINDOW) levels.shift();
            this._levels = levels;
            this.drawRecording();
        } else {
            this.setState({level});
        }
        // this.setState({
        //     level: level,
        //     levels: this.props.recording ? (this.state.levels || []).concat([level]) : this.state.levels
        // });
    }
    handleRecord () {
        this.audioRecorder.startRecording();
        this.props.onRecord();
        this._levels = [];
    }
    handleStopRecording () {
        this.visRef.remove(this._canvas);
        const {samples, sampleRate, levels, trimStart, trimEnd} = this.audioRecorder.stop();
        this.props.onStopRecording(samples, sampleRate, levels, trimStart, trimEnd);
    }
    drawRecording () {
        if (!this._canvas) {
            const bbox = this.visRef.getBoundingClientRect();
            this._canvas = document.createElement('canvas');
            this._canvas.width = bbox.width;
            this._canvas.height = bbox.height;
            this.visRef.appendChild(this._canvas);
        }
        const ctx = this._canvas.getContext('2d');
        const {width, height} = this._canvas;

        const pathComponents = Waveform.pathComponents(width, height, this._levels);
        
        ctx.fillStyle = 'hsl(300, 54%, 72%)';
        ctx.strokeStyle = '#BD42BD';
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        for (let i = 0; i < pathComponents.length; i++) {
            const cmd = pathComponents[i];
            switch (cmd[0]) {
            case 'M':
                ctx.moveTo(cmd[1], cmd[2]);
                break;
            case 'Q':
                ctx.quadraticCurveTo(cmd[1], cmd[2], cmd[3], cmd[4]);
                break;
            case 'Z':
                ctx.closePath();
                break;
            }
        }
        ctx.fill();
        ctx.stroke();
    }
    setVisRef (ref) {
        this.visRef = ref;
    }
    render () {
        const {
            onRecord, // eslint-disable-line no-unused-vars
            onStopRecording, // eslint-disable-line no-unused-vars
            ...componentProps
        } = this.props;
        return (
            <RecordingStepComponent
                visRef={this.setVisRef}
                level={this.state.level}
                listening={this.state.listening}
                onRecord={this.handleRecord}
                onStopRecording={this.handleStopRecording}
                {...componentProps}
            />
        );
    }
}

RecordingStep.propTypes = {
    intl: intlShape.isRequired,
    onRecord: PropTypes.func.isRequired,
    onStopRecording: PropTypes.func.isRequired,
    recording: PropTypes.bool
};

export default injectIntl(RecordingStep);
