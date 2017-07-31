import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Waveform from '../waveform/waveform.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import AudioTrimmer from '../../containers/audio-trimmer.jsx';

import styles from './sound-editor.css';

import playIcon from '../record-modal/icon--play.svg';
import stopIcon from '../record-modal/icon--stop-playback.svg';
import trimIcon from './icon--trim.svg';

const BufferedInput = BufferedInputHOC(Input);

const SoundEditor = props => (
    <div className={styles.editorContainer}>
        <div className={styles.row}>
            <div className={styles.inputGroup}>
                {props.playhead ? (
                    <button
                        className={classNames(styles.button, styles.stopButtonn)}
                        title={'Stop'}
                        onClick={props.onStop}
                    >
                        <img src={stopIcon} />
                    </button>
                ) : (
                    <button
                        className={classNames(styles.button, styles.playButton)}
                        title={'Play'}
                        onClick={props.onPlay}
                    >
                        <img src={playIcon} />
                    </button>
                )}
            </div>
            <div className={styles.inputGroup}>
                <Label text="Sound">
                    <BufferedInput
                        tabIndex="1"
                        type="text"
                        value={props.name}
                        onSubmit={props.onChangeName}
                    />
                </Label>
            </div>
            <div className={styles.inputGroupRight}>
                <button
                    className={classNames(styles.button, styles.trimButton, {
                        [styles.trimButtonActive]: props.trimStart !== null
                    })}
                    title={props.trimStart === null ? 'Trim' : 'Save'}
                    onClick={props.onActivateTrim}
                >
                    <img src={trimIcon} />
                    {props.trimStart === null ? 'Trim' : 'Save'}
                </button>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.waveformContainer}>
                <Waveform
                    data={props.chunkLevels}
                    height={180}
                    width={600}
                />
                <AudioTrimmer
                    playhead={props.playhead}
                    trimEnd={props.trimEnd}
                    trimStart={props.trimStart}
                    onSetTrimEnd={props.onSetTrimEnd}
                    onSetTrimStart={props.onSetTrimStart}
                />
            </div>
        </div>
    </div>
);

SoundEditor.propTypes = {
    chunkLevels: PropTypes.arrayOf(PropTypes.number).isRequired,
    name: PropTypes.string.isRequired,
    onActivateTrim: PropTypes.func,
    onChangeName: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onSetTrimEnd: PropTypes.func,
    onSetTrimStart: PropTypes.func,
    onStop: PropTypes.func.isRequired,
    playhead: PropTypes.number,
    trimEnd: PropTypes.number,
    trimStart: PropTypes.number
};

export default SoundEditor;
