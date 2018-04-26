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
            <Box className={styles.visualizationContainer}>
                <Box className={styles.cameraFeedContainer}>
                    <canvas
                        className={styles.canvas}
                        // height and (below) width of the actual image
                        height="720"
                        ref={props.canvasRef}
                        width="960"
                    />
                </Box>
            </Box>
            {props.capture ?
                <Box className={styles.buttonRow}>
                    <button
                        className={styles.cancelButton}
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
                        onClick={props.onCapture}
                    >
                        <img
                            className={styles.mainIcon}
                            draggable={false}
                            src={cameraIcon}
                        />
                    </button>
                    <div className={styles.helpText}>
                        <span className={styles.captureText}>
                            {'Take Photo'}
                        </span>
                    </div>

                </Box>
            }
        </Box>
    </Modal>
);

CameraModal.propTypes = {
    canvasRef: PropTypes.func.isRequired,
    capture: PropTypes.string,
    onBack: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCapture: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
    // videoRef: PropTypes.func.isRequired
};

export default CameraModal;
