import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Modal from '../modal/modal.jsx';

import ScanningStep from '../../containers/scanning-step.jsx';
import ConnectingStep from './connecting-step.jsx';
import ConnectedStep from './connected-step.jsx';
import ErrorStep from './error-step.jsx';

import styles from './connection-modal.css';

const phases = {
    scanning: ScanningStep,
    connecting: ConnectingStep,
    connected: ConnectedStep,
    error: ErrorStep
};

const ConnectionModalComponent = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={props.title}
        headerClassName={styles.header}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            {React.createElement(phases[props.phase], props)}
        </Box>
    </Modal>
);

ConnectionModalComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    phase: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default ConnectionModalComponent;
