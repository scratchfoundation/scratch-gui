import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Box from '../box/box.jsx';
import Waveform from '../waveform/waveform.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';

import styles from './sound-editor.css';

import playIcon from '../record-modal/icon--play.svg';
import stopIcon from '../record-modal/icon--stop-playback.svg';

const BufferedInput = BufferedInputHOC(Input);

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
                <Label text="Sound">
                    <BufferedInput
                        tabIndex="1"
                        type="text"
                        value={props.name}
                        onSubmit={props.onChangeName}
                    />
                </Label>
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

export default SoundEditor;
