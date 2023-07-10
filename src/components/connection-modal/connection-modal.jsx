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
import UpdatePeripheralStep from './update-peripheral-step.jsx';

import styles from './connection-modal.css';

const PHASES = keyMirror({
    scanning: null,
    connecting: null,
    connected: null,
    error: null,
    unavailable: null,
    updatePeripheral: null
});

const ConnectionModalComponent = props => {
    // ScanningStep allows the user to choose a peripheral from a list.
    // AutoScanningStep connects to the first peripheral found.
    // Also, AutoScanningStep adds "prescan" and "pressbutton" phases before the actual scan.
    // When useExternalPeripheralList is true, force the use of AutoScanningStep:
    // - We want to automatically connect to the first peripheral "found" since it's actually the one selected by the
    //   user from the external list.
    // - We want to show the "prescan" phase to inform the user before the external list appears.
    // - The "pressbutton" phase doesn't hurt: it might be hidden behind the external list (especially with Android
    //   CDM) or it might help the user to keep the peripheral device awake.
    // TODO: does forcing AutoScanningStep mean we can eliminate the `USER_PICKED_PERIPHERAL` message?
    const ScanningStepContainer = (
        (props.useAutoScan || props.useExternalPeripheralList) ?
            AutoScanningStep :
            ScanningStep
    );
    return (<Modal
        className={styles.modalContent}
        contentLabel={props.name}
        headerClassName={styles.header}
        headerImage={props.connectionSmallIconURL}
        id="connectionModal"
        onHelp={props.onHelp}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            {props.phase === PHASES.scanning && <ScanningStepContainer {...props} />}
            {props.phase === PHASES.connecting && <ConnectingStep {...props} />}
            {props.phase === PHASES.connected && <ConnectedStep {...props} />}
            {props.phase === PHASES.error && <ErrorStep {...props} />}
            {props.phase === PHASES.unavailable && <UnavailableStep {...props} />}
            {props.phase === PHASES.updatePeripheral && <UpdatePeripheralStep {...props} />}
        </Box>
    </Modal>);
};

ConnectionModalComponent.propTypes = {
    connectingMessage: PropTypes.node.isRequired,
    connectionIconURL: PropTypes.string,
    connectionSmallIconURL: PropTypes.string,
    connectionTipIconURL: PropTypes.string,
    name: PropTypes.node,
    onCancel: PropTypes.func.isRequired,
    onHelp: PropTypes.func.isRequired,
    phase: PropTypes.oneOf(Object.keys(PHASES)).isRequired,
    prescanMessage: PropTypes.node,
    scanBeginMessage: PropTypes.node,
    title: PropTypes.string.isRequired,
    useAutoScan: PropTypes.bool.isRequired,
    useExternalPeripheralList: PropTypes.bool
};

ConnectionModalComponent.defaultProps = {
    connectingMessage: 'Connecting'
};

export {
    ConnectionModalComponent as default,
    PHASES
};
