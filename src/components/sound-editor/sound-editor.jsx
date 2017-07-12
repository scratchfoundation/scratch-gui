const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');
const Box = require('../box/box.jsx');
const Waveform = require('../waveform/waveform.jsx');
const BufferedInput = require('../buffered-input/buffered-input.jsx');

const styles = require('./sound-editor.css');
const formStyles = require('../../css/forms.css');

const playIcon = require('../record-modal/icon--play.svg');
const stopIcon = require('../record-modal/icon--stop-playback.svg');

const SoundEditor = props => (
    <Box className={styles.editorContainer}>
        <Box className={styles.row}>
            <Box className={styles.inputGroup}>
                {props.playhead ? (
                    <button
                        className={classNames(styles.button, styles.stopButtonn)}
                        onClick={props.onStop}
                    >
                        <img src={stopIcon} />
                    </button>
                ) : (
                    <button
                        className={classNames(styles.button, styles.playButton)}
                        onClick={props.onPlay}
                    >
                        <img src={playIcon} />
                    </button>
                )}
            </Box>
            <Box className={styles.inputGroup}>
                <span className={formStyles.inputLabel}>Sound</span>
                <BufferedInput
                    className={classNames(formStyles.inputForm, styles.soundName)}
                    tabIndex="1"
                    type="text"
                    value={props.name}
                    onSubmit={props.onChangeName}
                />
            </Box>
        </Box>
        <Box className={styles.row}>
            <Box className={styles.waveformContainer}>
                <Waveform
                    data={props.chunkLevels}
                    height={180}
                    width={600}
                />
            </Box>
        </Box>
    </Box>
);

SoundEditor.propTypes = {
    chunkLevels: PropTypes.arrayOf(PropTypes.number).isRequired,
    name: PropTypes.string.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    playhead: PropTypes.number
};

module.exports = SoundEditor;
