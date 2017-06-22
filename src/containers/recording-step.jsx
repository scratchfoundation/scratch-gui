const React = require('react');
const bindAll = require('lodash.bindall');
const RecordingStepComponent = require('../components/record-modal/recording-step.jsx');
const AudioRecorder = require('../lib/audio/audio-recorder.js');

class RecordingStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleRecord',
            'handleStopRecording',
            'handleLevelUpdate',
            'handleRecordingError'
        ]);

        this.state = {
            level: 0,
            levels: null
        };
    }
    componentDidMount () {
        this.audioRecorder = new AudioRecorder();
        this.audioRecorder.startListening(this.handleLevelUpdate, this.handleRecordingError);
    }
    componentWillUnmount () {
        this.audioRecorder.dispose();
    }
    handleRecordingError () {
        alert('Could not start recording'); // eslint-disable-line no-alert
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
        const {samples, sampleRate, levels} = this.audioRecorder.stop();
        this.props.onStopRecording(samples, sampleRate, levels);
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
                onRecord={this.handleRecord}
                onStopRecording={this.handleStopRecording}
                {...componentProps}
            />
        );
    }
}

RecordingStep.propTypes = RecordingStepComponent.propTypes;

module.exports = RecordingStep;
