import PropTypes from 'prop-types';
import React from 'react';
import keyMirror from 'keymirror';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import Box from '../box/box.jsx';
import Modal from '../modal/modal.jsx';

import ScanningStep from '../../containers/scanning-step.jsx';
import ConnectingStep from './connecting-step.jsx';
import ConnectedStep from './connected-step.jsx';
import ErrorStep from './error-step.jsx';

import styles from './connection-modal.css';

const PHASES = keyMirror({
    scanning: null,
    connecting: null,
    connected: null,
    error: null
});

const messages = defineMessages({
    connectionModalLabel: {
        defaultMessage: 'Scratch Device Connection Modal',
        description: 'Title for scratch device connection modal',
        id: 'gui.connectionModal.modalLabel'
    }
});

const ConnectionModalComponent = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={props.intl.formatMessage(messages.connectionModalLabel)}
        headerClassName={styles.header}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            {props.phase === PHASES.scanning && <ScanningStep {...props} />}
            {props.phase === PHASES.connecting && <ConnectingStep {...props} />}
            {props.phase === PHASES.connected && <ConnectedStep {...props} />}
            {props.phase === PHASES.error && <ErrorStep {...props} />}
        </Box>
    </Modal>
);

ConnectionModalComponent.propTypes = {
    intl: intlShape,
    onCancel: PropTypes.func.isRequired,
    phase: PropTypes.oneOf(Object.keys(PHASES)).isRequired,
    title: PropTypes.string.isRequired
};

const IntlModal = injectIntl(ConnectionModalComponent);

export {
    IntlModal as default,
    PHASES
};
