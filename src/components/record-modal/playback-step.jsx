const PropTypes = require('prop-types');
const React = require('react');
const Box = require('../box/box.jsx');
const Waveform = require('../waveform/waveform.jsx');
const Meter = require('../meter/meter.jsx');

const styles = require('./record-modal.css');
const backIcon = require('./icon--back.svg');
const stopIcon = require('./icon--stop-playback.svg');
const playIcon = require('./icon--play.svg');

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
                <img src={props.playing ? stopIcon : playIcon} />
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
                <img src={backIcon} /> Re-record
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
