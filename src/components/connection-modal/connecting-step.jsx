import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';

import bluetoothIcon from './icons/bluetooth-white.svg';
import closeIcon from '../close-button/icon--close.svg';

import styles from './connection-modal.css';

const ConnectingStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            <Box className={styles.centeredRow}>
                <div className={styles.deviceActivity}>
                    <img
                        className={styles.deviceActivityIcon}
                        src={props.deviceImage}
                    />
                    <img
                        className={styles.bluetoothConnectingIcon}
                        src={bluetoothIcon}
                    />
                </div>
            </Box>
        </Box>
        <Box className={styles.bottomArea}>
            <Box className={styles.instructions}>
                {props.connectingMessage}
            </Box>
            <Dots
                counter={1}
                total={3}
            />
            <div className={styles.segmentedButton}>
                <button
                    disabled
                    className={styles.connectionButton}
                >
                    <FormattedMessage
                        defaultMessage="Connecting..."
                        description="Label indicating that connection is in progress"
                        id="gui.connection.connecting-cancelbutton"
                    />
                </button>
                <button
                    className={styles.connectionButton}
                    onClick={props.onDisconnect}
                >
                    <img
                        className={styles.abortConnectingIcon}
                        src={closeIcon}
                    />
                </button>
            </div>
        </Box>
    </Box>
);

ConnectingStep.propTypes = {
    connectingMessage: PropTypes.node.isRequired,
    deviceImage: PropTypes.string.isRequired,
    onDisconnect: PropTypes.func
};

export default ConnectingStep;
