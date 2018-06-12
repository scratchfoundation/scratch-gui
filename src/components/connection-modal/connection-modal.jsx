import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Modal from '../modal/modal.jsx';

import styles from './connection-modal.css';

const ConnectionModalComponent = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={props.title}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={styles.buttonRow}>
                <button
                    className={styles.cancelButton}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="cancel"
                        description="Button in prompt for cancelling the dialog"
                        id="gui.prompt.cancel"
                    />
                </button>
            </Box>
        </Box>
    </Modal>
);

ConnectionModalComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default ConnectionModalComponent;
