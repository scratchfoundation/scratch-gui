import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';

import Waveform from '../waveform/waveform.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import AudioSelector from '../../containers/audio-selector.jsx';
import IconButton from '../icon-button/icon-button.jsx';

import styles from './sound-editor.css';

import playIcon from './icon--play.svg';
import stopIcon from './icon--stop.svg';
import redoIcon from './icon--redo.svg';
import undoIcon from './icon--undo.svg';
import fasterIcon from './icon--faster.svg';
import slowerIcon from './icon--slower.svg';
import louderIcon from './icon--louder.svg';
import softerIcon from './icon--softer.svg';
import robotIcon from './icon--robot.svg';
import reverseIcon from './icon--reverse.svg';
import fadeOutIcon from './icon--fade-out.svg';
import fadeInIcon from './icon--fade-in.svg';
import muteIcon from './icon--mute.svg';

import deleteIcon from './icon--delete.svg';
import copyIcon from './icon--copy.svg';
import pasteIcon from './icon--paste.svg';
import copyToNewIcon from './icon--copy-to-new.svg';

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    sound: {
        id: 'gui.soundEditor.sound',
        description: 'Label for the name of the sound',
        defaultMessage: 'Sound'
    },
    play: {
        id: 'gui.soundEditor.play',
        description: 'Title of the button to start playing the sound',
        defaultMessage: 'Play'
    },
    stop: {
        id: 'gui.soundEditor.stop',
        description: 'Title of the button to stop the sound',
        defaultMessage: 'Stop'
    },
    copy: {
        id: 'gui.soundEditor.copy',
        description: 'Title of the button to copy the sound',
        defaultMessage: 'Copy'
    },
    paste: {
        id: 'gui.soundEditor.paste',
        description: 'Title of the button to paste the sound',
        defaultMessage: 'Paste'
    },
    copyToNew: {
        id: 'gui.soundEditor.copyToNew',
        description: 'Title of the button to copy the selection into a new sound',
        defaultMessage: 'Copy to New'
    },
    delete: {
        id: 'gui.soundEditor.delete',
        description: 'Title of the button to delete the sound',
        defaultMessage: 'Delete'
    },
    save: {
        id: 'gui.soundEditor.save',
        description: 'Title of the button to save trimmed sound',
        defaultMessage: 'Save'
    },
    undo: {
        id: 'gui.soundEditor.undo',
        description: 'Title of the button to undo',
        defaultMessage: 'Undo'
    },
    redo: {
        id: 'gui.soundEditor.redo',
        description: 'Title of the button to redo',
        defaultMessage: 'Redo'
    },
    faster: {
        id: 'gui.soundEditor.faster',
        description: 'Title of the button to apply the faster effect',
        defaultMessage: 'Faster'
    },
    slower: {
        id: 'gui.soundEditor.slower',
        description: 'Title of the button to apply the slower effect',
        defaultMessage: 'Slower'
    },
    echo: {
        id: 'gui.soundEditor.echo',
        description: 'Title of the button to apply the echo effect',
        defaultMessage: 'Echo'
    },
    robot: {
        id: 'gui.soundEditor.robot',
        description: 'Title of the button to apply the robot effect',
        defaultMessage: 'Robot'
    },
    louder: {
        id: 'gui.soundEditor.louder',
        description: 'Title of the button to apply the louder effect',
        defaultMessage: 'Louder'
    },
    softer: {
        id: 'gui.soundEditor.softer',
        description: 'Title of the button to apply thr.softer effect',
        defaultMessage: 'Softer'
    },
    reverse: {
        id: 'gui.soundEditor.reverse',
        description: 'Title of the button to apply the reverse effect',
        defaultMessage: 'Reverse'
    },
    fadeOut: {
        id: 'gui.soundEditor.fadeOut',
        description: 'Title of the button to apply the fade out effect',
        defaultMessage: 'Fade out'
    },
    fadeIn: {
        id: 'gui.soundEditor.fadeIn',
        description: 'Title of the button to apply the fade in effect',
        defaultMessage: 'Fade in'
    },
    mute: {
        id: 'gui.soundEditor.mute',
        description: 'Title of the button to apply the mute effect',
        defaultMessage: 'Mute'
    }
});

const SoundEditor = props => (
    <div
        className={styles.editorContainer}
        ref={props.setRef}
        onMouseDown={props.onContainerClick}
    >
        <div className={styles.row}>
            <div className={styles.inputGroup}>
                <Label text={props.intl.formatMessage(messages.sound)}>
                    <BufferedInput
                        tabIndex="1"
                        type="text"
                        value={props.name}
                        onSubmit={props.onChangeName}
                    />
                </Label>
                <div className={styles.buttonGroup}>
                    <button
                        className={styles.button}
                        disabled={!props.canUndo}
                        title={props.intl.formatMessage(messages.undo)}
                        onClick={props.onUndo}
                    >
                        <img
                            className={styles.undoIcon}
                            draggable={false}
                            src={undoIcon}
                        />
                    </button>
                    <button
                        className={styles.button}
                        disabled={!props.canRedo}
                        title={props.intl.formatMessage(messages.redo)}
                        onClick={props.onRedo}
                    >
                        <img
                            className={styles.redoIcon}
                            draggable={false}
                            src={redoIcon}
                        />
                    </button>
                </div>
            </div>
            <div className={styles.inputGroup}>
                <IconButton
                    className={styles.toolButton}
                    img={copyIcon}
                    title={props.intl.formatMessage(messages.copy)}
                    onClick={props.onCopy}
                />
                <IconButton
                    className={styles.toolButton}
                    disabled={props.canPaste === false}
                    img={pasteIcon}
                    title={props.intl.formatMessage(messages.paste)}
                    onClick={props.onPaste}
                />
                <IconButton
                    className={classNames(styles.toolButton, styles.flipInRtl)}
                    img={copyToNewIcon}
                    title={props.intl.formatMessage(messages.copyToNew)}
                    onClick={props.onCopyToNew}
                />
            </div>
            <IconButton
                className={styles.toolButton}
                disabled={props.trimStart === null}
                img={deleteIcon}
                title={props.intl.formatMessage(messages.delete)}
                onClick={props.onDelete}
            />
        </div>
        <div className={styles.row}>
            <div className={styles.waveformContainer}>
                <Waveform
                    data={props.chunkLevels}
                    height={160}
                    width={600}
                />
                <AudioSelector
                    playhead={props.playhead}
                    trimEnd={props.trimEnd}
                    trimStart={props.trimStart}
                    onPlay={props.onPlay}
                    onSetTrim={props.onSetTrim}
                    onStop={props.onStop}
                />
            </div>
        </div>
        <div className={classNames(styles.row, styles.rowReverse)}>
            <div className={styles.inputGroup}>
                {props.playhead ? (
                    <button
                        className={classNames(styles.roundButton, styles.stopButtonn)}
                        title={props.intl.formatMessage(messages.stop)}
                        onClick={props.onStop}
                    >
                        <img
                            draggable={false}
                            src={stopIcon}
                        />
                    </button>
                ) : (
                    <button
                        className={classNames(styles.roundButton, styles.playButton)}
                        title={props.intl.formatMessage(messages.play)}
                        onClick={props.onPlay}
                    >
                        <img
                            draggable={false}
                            src={playIcon}
                        />
                    </button>
                )}
            </div>
            <IconButton
                className={styles.effectButton}
                img={fasterIcon}
                title={<FormattedMessage {...messages.faster} />}
                onClick={props.onFaster}
            />
            <IconButton
                className={styles.effectButton}
                img={slowerIcon}
                title={<FormattedMessage {...messages.slower} />}
                onClick={props.onSlower}
            />
            <IconButton
                disabled={props.tooLoud}
                className={classNames(styles.effectButton, styles.flipInRtl)}
                img={louderIcon}
                title={<FormattedMessage {...messages.louder} />}
                onClick={props.onLouder}
            />
            <IconButton
                className={classNames(styles.effectButton, styles.flipInRtl)}
                img={softerIcon}
                title={<FormattedMessage {...messages.softer} />}
                onClick={props.onSofter}
            />
            <IconButton
                className={classNames(styles.effectButton, styles.flipInRtl)}
                img={muteIcon}
                title={<FormattedMessage {...messages.mute} />}
                onClick={props.onMute}
            />
            <IconButton
                className={styles.effectButton}
                img={fadeInIcon}
                title={<FormattedMessage {...messages.fadeIn} />}
                onClick={props.onFadeIn}
            />
            <IconButton
                className={styles.effectButton}
                img={fadeOutIcon}
                title={<FormattedMessage {...messages.fadeOut} />}
                onClick={props.onFadeOut}
            />
            <IconButton
                className={styles.effectButton}
                img={reverseIcon}
                title={<FormattedMessage {...messages.reverse} />}
                onClick={props.onReverse}
            />
            <IconButton
                className={styles.effectButton}
                img={robotIcon}
                title={<FormattedMessage {...messages.robot} />}
                onClick={props.onRobot}
            />
        </div>
    </div>
);

SoundEditor.propTypes = {
    canPaste: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    canUndo: PropTypes.bool.isRequired,
    chunkLevels: PropTypes.arrayOf(PropTypes.number).isRequired,
    intl: intlShape,
    name: PropTypes.string.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onContainerClick: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    onCopyToNew: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onEcho: PropTypes.func.isRequired,
    onFadeIn: PropTypes.func.isRequired,
    onFadeOut: PropTypes.func.isRequired,
    onFaster: PropTypes.func.isRequired,
    onLouder: PropTypes.func.isRequired,
    onMute: PropTypes.func.isRequired,
    onPaste: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onReverse: PropTypes.func.isRequired,
    onRobot: PropTypes.func.isRequired,
    onSetTrim: PropTypes.func,
    onSlower: PropTypes.func.isRequired,
    onSofter: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    playhead: PropTypes.number,
    setRef: PropTypes.func,
    tooLoud: PropTypes.bool.isRequired,
    trimEnd: PropTypes.number,
    trimStart: PropTypes.number
};

export default injectIntl(SoundEditor);
