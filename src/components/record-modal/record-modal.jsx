import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import RecordingStep from '../../containers/recording-step.jsx';
import PlaybackStep from '../../containers/playback-step.jsx';
import Modal from '../modal/modal.jsx';
import styles from './record-modal.css';

const RecordModal = props => (
    <Modal
        visible
        className={styles.modalContent}
        contentLabel={'Record Sound'}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            {props.samples ? (
                <PlaybackStep
                    encoding={props.encoding}
                    levels={props.levels}
                    playhead={props.playhead}
                    playing={props.playing}
                    samples={props.samples}
                    trimEnd={props.trimEnd}
                    trimStart={props.trimStart}
                    onBack={props.onBack}
                    onPlay={props.onPlay}
                    onSetPlayhead={props.onSetPlayhead}
                    onSetTrimEnd={props.onSetTrimEnd}
                    onSetTrimStart={props.onSetTrimStart}
                    onStopPlaying={props.onStopPlaying}
                    onSubmit={props.onSubmit}
                />
            ) : (
                <RecordingStep
                    recording={props.recording}
                    onRecord={props.onRecord}
                    onStopRecording={props.onStopRecording}
                />
            )}
        </Box>
    </Modal>
);

RecordModal.propTypes = {
    encoding: PropTypes.bool.isRequired,
    levels: PropTypes.arrayOf(PropTypes.number),
    onBack: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onRecord: PropTypes.func.isRequired,
    onSetPlayhead: PropTypes.func.isRequired,
    onSetTrimEnd: PropTypes.func.isRequired,
    onSetTrimStart: PropTypes.func.isRequired,
    onStopPlaying: PropTypes.func.isRequired,
    onStopRecording: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    playhead: PropTypes.number,
    playing: PropTypes.bool,
    recording: PropTypes.bool,
    samples: PropTypes.instanceOf(Float32Array),
    trimEnd: PropTypes.number.isRequired,
    trimStart: PropTypes.number.isRequired
};

module.exports = RecordModal;
