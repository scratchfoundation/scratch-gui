const PropTypes = require('prop-types');
const React = require('react');
const Box = require('../box/box.jsx');
const Waveform = require('./waveform.jsx');
const Meter = require('./meter.jsx');
const styles = require('./record-modal.css');
const reRecordIcon = require('./re-record-icon.svg');

const PlaybackStep = props => (
    <Box>
        <Box className={styles.visualizationContainer}>

            <Box className={styles.meterContainer}>
                <Meter
                    height={172}
                    level={0}
                    width={20}
                />
            </Box>
            <Box className={styles.waveformContainer}>
                <Waveform
                    data={props.levels}
                    height={150}
                    level={0}
                    width={440}
                />
            </Box>
        </Box>
        <Box className={styles.mainButtonRow}>
            <button
                className={styles.mainButton}
                onClick={props.playing ? props.onStopPlaying : props.onPlay}
            >
                <svg
                    height={70}
                    style={{
                        overflow: 'visible'
                    }}
                    width={70}
                >
                    <g transform="translate(-35,-35) scale(1.5) translate(23, 23)">
                        {props.playing ? (
                            <g>
                                <rect
                                    fill="#4C97FF"
                                    height={30}
                                    rx={3}
                                    ry={3}
                                    stroke="#4280D7"
                                    width={30}
                                    x={10}
                                    y={10}
                                />
                                <rect
                                    className={styles.pulser}
                                    fill="#4C97FF"
                                    height={30}
                                    rx={3}
                                    ry={3}
                                    stroke="#4280D7"
                                    width={30}
                                    x={10}
                                    y={10}
                                />
                            </g>
                        ) : (
                            <g>
                                <polygon
                                    fill="#4280D7"
                                    points="15 15 35 25 15 35"
                                    stroke="#4280D7"
                                    strokeLineCap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="7"
                                />
                                <polygon
                                    fill="#4C97FF"
                                    points="15 15 35 25 15 35"
                                    stroke="#4C97FF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="5"
                                />
                            </g>
                        )}
                    </g>
                </svg>
                <div className={styles.helpText}>
                    <span className={styles.playingText}>
                        {props.playing ? 'Stop' : 'Play'}
                    </span>
                </div>
            </button>
        </Box>
        <Box className={styles.buttonRow}>
            <button
                className={styles.cancelButton}
                onClick={props.onBack}
            >
                <img src={reRecordIcon} /> Re-record
            </button>
            <button
                className={styles.okButton}
                disabled={props.encoding}
                onClick={props.onSubmit}
            >
                {props.encoding ? 'Loading...' : 'OK'}
            </button>
        </Box>
    </Box>
);

PlaybackStep.propTypes = {
    encoding: PropTypes.bool.isRequired,
    levels: PropTypes.arrayOf(PropTypes.number).isRequired,
    onBack: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStopPlaying: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    playing: PropTypes.bool.isRequired
};

module.exports = PlaybackStep;
