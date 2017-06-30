const PropTypes = require('prop-types');
const React = require('react');
const Box = require('../box/box.jsx');
const Meter = require('../meter/meter.jsx');
const Waveform = require('../waveform/waveform.jsx');

const styles = require('./record-modal.css');
const stopIcon = require('./icon--stop-recording.svg');

const RecordingStep = props => (
    <Box>
        <Box className={styles.visualizationContainer}>
            <Box className={styles.meterContainer}>
                <Meter
                    height={172}
                    level={props.level}
                    width={20}
                />
            </Box>
            <Box className={styles.waveformContainer}>
                {props.levels ? (
                    <Waveform
                        data={props.levels}
                        height={150}
                        level={0}
                        width={440}
                    />
                ) : (
                    <span className={styles.helpText}>
                        Begin recording by clicking the button below
                    </span>
                )}
            </Box>
        </Box>
        <Box className={styles.mainButtonRow}>
            <button
                className={styles.mainButton}
                onClick={props.recording ? props.onStopRecording : props.onRecord}
            >
                {props.recording ? (
                    <img src={stopIcon} />
                ) : (
                    <svg
                        className={styles.recordButton}
                        height="52"
                        width="52"
                    >
                        <circle
                            className={styles.recordButtonCircle}
                            cx="26"
                            cy="26"
                            r="25"
                        />
                        <circle
                            className={styles.recordButtonCircleOutline}
                            cx="26"
                            cy="26"
                            r={27 + props.level * 5}
                        />
                    </svg>
                )}
                <div className={styles.helpText}>
                    <span className={styles.recordingText}>
                        {props.recording ? 'Stop recording' : 'Record'}
                    </span>
                </div>
            </button>
        </Box>
    </Box>
);

RecordingStep.propTypes = {
    level: PropTypes.number,
    levels: PropTypes.arrayOf(PropTypes.number),
    onRecord: PropTypes.func.isRequired,
    onStopRecording: PropTypes.func.isRequired,
    recording: PropTypes.bool
};

module.exports = RecordingStep;
