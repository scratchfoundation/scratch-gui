import PropTypes from 'prop-types';
import React from 'react';
import keyMirror from 'keymirror';

import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';

import ScanningStep from '../../containers/scanning-step.jsx';
import AutoScanningStep from '../../containers/auto-scanning-step.jsx';
import ConnectingStep from './connecting-step.jsx';
import ConnectedStep from './connected-step.jsx';
import ErrorStep from './error-step.jsx';
import UnavailableStep from './unavailable-step.jsx';

import styles from './connection-modal.css';

const PHASES = keyMirror({
    scanning: null,
    connecting: null,
    connected: null,
    error: null,
    unavailable: null
});

const ConnectionModalComponent = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={props.name}
        headerClassName={styles.header}
        headerImage={props.smallDeviceImage}
        onHelp={props.onHelp}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            {props.phase === PHASES.scanning && !props.useAutoScan && <ScanningStep {...props} />}
            {props.phase === PHASES.scanning && props.useAutoScan && <AutoScanningStep {...props} />}
            {props.phase === PHASES.connecting && <ConnectingStep {...props} />}
            {props.phase === PHASES.connected && <ConnectedStep {...props} />}
            {props.phase === PHASES.error && <ErrorStep {...props} />}
            {props.phase === PHASES.unavailable && <UnavailableStep {...props} />}
        </Box>
    </Modal>
);

ConnectionModalComponent.propTypes = {
    connectingMessage: PropTypes.node,
    deviceButtonImage: PropTypes.string,
    name: PropTypes.node,
    onCancel: PropTypes.func.isRequired,
    onHelp: PropTypes.func.isRequired,
    phase: PropTypes.oneOf(Object.keys(PHASES)).isRequired,
    smallDeviceImage: PropTypes.string,
    title: PropTypes.string.isRequired,
    useAutoScan: PropTypes.bool.isRequired
};

export {
    ConnectionModalComponent as default,
    PHASES
};
