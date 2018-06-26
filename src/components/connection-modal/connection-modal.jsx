import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Modal from '../modal/modal.jsx';

import ScanningStep from '../../containers/scanning-step.jsx';
import ConnectingStep from './connecting-step.jsx';
import ConnectedStep from './connected-step.jsx';
import ErrorStep from './error-step.jsx';

import styles from './connection-modal.css';

const ConnectionModalComponent = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={''}
        headerClassName={styles.header}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            {props.phase === 'scanning' && <ScanningStep {...props} />}
            {props.phase === 'connecting' && <ConnectingStep {...props} />}
            {props.phase === 'connected' && <ConnectedStep {...props} />}
            {props.phase === 'error' && <ErrorStep {...props} />}
        </Box>
    </Modal>
);

ConnectionModalComponent.propTypes = {
    extensionId: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConnected: PropTypes.func.isRequired,
    onConnecting: PropTypes.func.isRequired,
    phase: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default ConnectionModalComponent;
