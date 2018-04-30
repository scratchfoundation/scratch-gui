import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../modal/modal.jsx';
import styles from './camera-modal.css';
import backIcon from './icon--back.svg';
import cameraIcon from '../action-menu/icon--camera.svg';

const CameraModal = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={'Take a Picture'}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={styles.cameraFeedContainer}>
                <div className={styles.loadingText}>
                    {props.access ? 'Loading camera...' :
                        '↖️ \u00A0We need your permission to use your microphone'}
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
                        /> Re-take
                    </button>
                    <button
                        className={styles.okButton}
                        onClick={props.onSubmit}
                    > Save
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
                                {props.loaded ? 'Take Photo' : 'Loading...'}
                            </span> :
                            <span className={styles.disabledText}>
                                {'Enable Camera'}
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
    loaded: PropTypes.bool,
    onBack: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCapture: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default CameraModal;
