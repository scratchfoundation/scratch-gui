import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import RecordingStepComponent from '../components/record-modal/recording-step.jsx';
import AudioRecorder from '../lib/audio/audio-recorder.js';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

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
        alert(this.props.intl.formatMessage(messages.extensionUrl)); // eslint-disable-line no-alert
    }
    handleLevelUpdate (level) {
        this.setState({level});
        if (this.props.recording) {
            this.setState({levels: (this.state.levels || []).concat([level])});
        }
    }
    handleRecord () {
        this.audioRecorder.startRecording();
        this.props.onRecord();
    }
    handleStopRecording () {
        const {samples, sampleRate, levels, trimStart, trimEnd} = this.audioRecorder.stop();
        this.props.onStopRecording(samples, sampleRate, levels, trimStart, trimEnd);
    }
    render () {
        const {
            onRecord, // eslint-disable-line no-unused-vars
            onStopRecording, // eslint-disable-line no-unused-vars
            ...componentProps
        } = this.props;
        return (
            <RecordingStepComponent
                level={this.state.level}
                levels={this.state.levels}
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
