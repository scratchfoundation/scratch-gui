const PropTypes = require('prop-types');
const React = require('react');
const Box = require('../box/box.jsx');
const Meter = require('../meter/meter.jsx');
const Waveform = require('../waveform/waveform.jsx');

const styles = require('./record-modal.css');

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
                <svg
                    height={70}
                    width={70}
                >
                    <g transform="translate(-35,-35) scale(1.5) translate(23, 23)">
                        {props.recording ? (
                            <g>
                                <rect
                                    fill="#FF661A"
                                    height={30}
                                    rx={3}
                                    ry={3}
                                    stroke="#E64D00"
                                    width={30}
                                    x={10}
                                    y={10}
                                />
                                <rect
                                    className={styles.pulser}
                                    fill="#FF661A"
                                    height={30}
                                    rx={3}
                                    ry={3}
                                    stroke="#E64D00"
                                    width={30}
                                    x={10}
                                    y={10}
                                />
                            </g>
                        ) : (
                            <g>
                                <circle
                                    cx={25}
                                    cy={25}
                                    fill="#FF661A"
                                    r={15}
                                    stroke="#E64D00"
                                />
                                <circle
                                    cx={25}
                                    cy={25}
                                    fill="#FF661A"
                                    r={18 + props.level * 10}
                                    style={{opacity: 0.15, transition: '0.1s'}}
                                />
                            </g>
                        )}
                    </g>
                </svg>
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
