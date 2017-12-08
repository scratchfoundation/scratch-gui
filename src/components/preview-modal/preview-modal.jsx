import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../modal/modal.jsx';
import Box from '../box/box.jsx';
import {FormattedMessage} from 'react-intl';

import styles from './preview-modal.css';

const PreviewModal = props => (
    <Modal
        className={styles.modalContent}
        contentLabel="Try Scratch 3.0"
        onRequestClose={props.onTryIt}
    >
        <Box className={styles.body}>

            <Box className={styles.buttonRow}>
                <button
                    className={styles.noButton}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Not Now"
                        description="Label for button to back out of trying Scratch 3.0 preview"
                        id="gui.previewModal.notnow"
                    />
                </button>
                <button
                    className={styles.okButton}
                    onClick={props.onTryIt}
                >
                    <FormattedMessage
                        defaultMessage="Try It!"
                        description="Label for button to try Scratch 3.0 preview"
                        id="gui.previewModal.tryit"
                    />
                </button>
            </Box>
        </Box>
    </Modal>
);

PreviewModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onTryIt: PropTypes.func.isRequired
};

export default PreviewModal;
