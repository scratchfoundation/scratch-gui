import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import Box from '../box/box.jsx';
import Modal from '../modal/modal.jsx';
import styles from './camera-modal.css';
import backIcon from './icon--back.svg';
import cameraIcon from '../action-menu/icon--camera.svg';

const messages = defineMessages({
    cameraModalTitle: {
        defaultMessage: 'Take a Photo',
        description: 'Title for prompt to take a picture (to add as a new costume).',
        id: 'gui.cameraModal.cameraModalTitle'
    },
    loadingCameraMessage: {
        defaultMessage: 'Loading Camera...',
        description: 'Notification to the user that the camera is loading',
        id: 'gui.cameraModal.loadingCameraMessage'
    },
    permissionRequest: {
        defaultMessage: 'We need your permission to use your camera',
        description: 'Notification to the user that the app needs camera access',
        id: 'gui.cameraModal.permissionRequest'
    },
    retakePhoto: {
        defaultMessage: 'Retake Photo',
        description: 'A button that allows the user to take the picture again, replacing the old one',
        id: 'gui.cameraModal.retakePhoto'
    },
    save: {
        defaultMessage: 'Save',
        description: 'A button that allows the user to save the photo they took as a costume',
        id: 'gui.cameraModal.save'
    },
    takePhotoButton: {
        defaultMessage: 'Take Photo',
        description: 'A button to take a photo',
        id: 'gui.cameraModal.takePhoto'
    },
    loadingCaption: {
        defaultMessage: 'Loading...',
        description: 'A caption for a disabled button while the video from the camera is still loading',
        id: 'gui.cameraModal.loadingCaption'
    },
    enableCameraCaption: {
        defaultMessage: 'Enable Camera',
        description: 'A caption for a disabled button prompting the user to enable camera access',
        id: 'gui.cameraModal.enableCameraCaption'
    }
});

const CameraModal = ({intl, ...props}) => (
    <Modal
        className={styles.modalContent}
        contentLabel={intl.formatMessage(messages.cameraModalTitle)}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={styles.cameraFeedContainer}>
                <div className={styles.loadingText}>
                    {props.access ? intl.formatMessage(messages.loadingCameraMessage) :
                        `↖️ \u00A0${intl.formatMessage(messages.permissionRequest)}`}
                </div>
                <canvas
                    className={styles.canvas}
                    // height and (below) width of the actual image
                    // double stage dimensions to avoid the need for
                    // resizing the captured image when importing costume
                    // to accommodate double resolution bitmaps
                    height="720"
                    ref={props.canvasRef}
                    width="960"
                />
                {props.capture ? (
                    <div className={styles.flashOverlay} />
                ) : null}
            </Box>
            {props.capture ?
                <Box className={styles.buttonRow}>
                    <button
                        className={styles.cancelButton}
                        key="retake-button"
                        onClick={props.onBack}
                    >
                        <img
                            draggable={false}
                            src={backIcon}
                        /> {intl.formatMessage(messages.retakePhoto)}
                    </button>
                    <button
                        className={styles.okButton}
                        onClick={props.onSubmit}
                    > {intl.formatMessage(messages.save)}
                    </button>
                </Box> :
                <Box className={styles.mainButtonRow}>
                    <button
                        className={styles.mainButton}
                        disabled={!props.loaded}
                        key="capture-button"
                        onClick={props.onCapture}
                    >
                        <img
                            className={styles.mainIcon}
                            draggable={false}
                            src={cameraIcon}
                        />
                    </button>
                    <div className={styles.helpText}>
                        {props.access ?
                            <span className={props.loaded ? styles.captureText : styles.disabledText}>
                                {props.loaded ?
                                    intl.formatMessage(messages.takePhotoButton) :
                                    intl.formatMessage(messages.loadingCaption)}
                            </span> :
                            <span className={styles.disabledText}>
                                {intl.formatMessage(messages.enableCameraCaption)}
                            </span>
                        }
                    </div>

                </Box>
            }
        </Box>
    </Modal>
);

CameraModal.propTypes = {
    access: PropTypes.bool,
    canvasRef: PropTypes.func.isRequired,
    capture: PropTypes.string,
    intl: intlShape.isRequired,
    loaded: PropTypes.bool,
    onBack: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCapture: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default injectIntl(CameraModal);
