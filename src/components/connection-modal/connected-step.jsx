import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';
import bluetoothIcon from './icons/bluetooth-white.svg';
import styles from './connection-modal.css';
import classNames from 'classnames';

const ConnectedStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            <Box className={styles.centeredRow}>
                <div className={styles.peripheralActivity}>
                    <img
                        className={styles.peripheralActivityIcon}
                        src={props.connectionIconURL}
                    />
                    <img
                        className={styles.bluetoothConnectedIcon}
                        src={bluetoothIcon}
                    />
                </div>
            </Box>
        </Box>
        <Box className={styles.bottomArea}>
            <Box className={classNames(styles.bottomAreaItem, styles.instructions)}>
                <FormattedMessage
                    defaultMessage="Connected"
                    description="Message indicating that a device was connected"
                    id="gui.connection.connected"
                />
            </Box>
            <Dots
                success
                className={styles.bottomAreaItem}
                total={3}
            />
            <div className={classNames(styles.bottomAreaItem, styles.cornerButtons)}>
                <button
                    className={classNames(styles.redButton, styles.connectionButton)}
                    onClick={props.onDisconnect}
                >
                    <FormattedMessage
                        defaultMessage="Disconnect"
                        description="Button to disconnect the device"
                        id="gui.connection.disconnect"
                    />
                </button>
                <button
                    className={styles.connectionButton}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Go to Editor"
                        description="Button to return to the editor"
                        id="gui.connection.go-to-editor"
                    />
                </button>
            </div>
        </Box>
    </Box>
);

ConnectedStep.propTypes = {
    connectionIconURL: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    onDisconnect: PropTypes.func
};

export default ConnectedStep;
