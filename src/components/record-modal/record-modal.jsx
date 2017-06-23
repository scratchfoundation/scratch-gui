const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const ReactModal = require('react-modal');
const Box = require('../box/box.jsx');
const CloseButton = require('../close-button/close-button.jsx');
const RecordingStep = require('../../containers/recording-step.jsx');
const PlaybackStep = require('../../containers/playback-step.jsx');

const styles = require('./record-modal.css');

const RecordModal = props => (
    <ReactModal
        isOpen
        className={styles.modalContent}
        contentLabel={'Record Sound'}
        overlayClassName={styles.modalOverlay}
        onRequestClose={props.onCancel}
    >
        <div className={styles.header}>
            <div className={classNames(styles.headerItem, styles.headerItemFilter)}>
                {/* Nothing here, just for spacing */}
            </div>
            <div className={classNames(styles.headerItem, styles.headerItemTitle)}>
                Record Sound
            </div>
            <div className={classNames(styles.headerItem, styles.headerItemClose)}>
                <CloseButton
                    size={CloseButton.SIZE_LARGE}
                    onClick={props.onCancel}
                />
            </div>
        </div>
        <Box className={styles.body}>
            {props.samples ? (
                <PlaybackStep
                    encoding={props.encoding}
                    levels={props.levels}
                    playing={props.playing}
                    samples={props.samples}
                    onBack={props.onBack}
                    onPlay={props.onPlay}
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
    </ReactModal>
);

RecordModal.propTypes = {
    encoding: PropTypes.bool.isRequired,
    levels: PropTypes.arrayOf(PropTypes.number),
    onBack: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onRecord: PropTypes.func.isRequired,
    onStopPlaying: PropTypes.func.isRequired,
    onStopRecording: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    playing: PropTypes.bool,
    recording: PropTypes.bool,
    samples: PropTypes.instanceOf(Float32Array)
};

module.exports = RecordModal;
