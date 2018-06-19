import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import DeviceTile from './device-tile.jsx';

import styles from './connection-modal.css';

const ScanningStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            {props.scanning ? (
                props.deviceList.length === 0 ? (
                    <div>{'👀Scanning👀'}</div>
                ) : (
                    props.deviceList.map(device =>
                        (<DeviceTile
                            RSSI={device.RSSI}
                            key={device.peripheralId}
                            name={device.name}
                            peripheralId={device.peripheralId}
                            onConnecting={props.onConnecting}
                        />)
                    )
                )
            ) : (
                <Box className={styles.instructions}>
                    <FormattedMessage
                        defaultMessage="No devices found"
                        description=""
                        id="gui.connection.scanning.noDevicesFound"
                    />
                </Box>
            )}
        </Box>
        <Box className={styles.instructions}>
            <FormattedMessage
                defaultMessage="Select your device in the list above."
                description=""
                id="gui.connection.scanning.instructions"
            />
        </Box>
        <Box className={styles.buttonRow}>
            <button
                className={styles.searchButton}
                onClick={props.onScan}
            >
                <FormattedMessage
                    defaultMessage="refresh"
                    description="Button in prompt for starting a search"
                    id="gui.connection.search"
                />
            </button>
        </Box>
    </Box>
);

ScanningStep.propTypes = {
    deviceList: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        RSSI: PropTypes.number,
        peripheralId: PropTypes.string
    })),
    onConnecting: PropTypes.function,
    onScan: PropTypes.function,
    scanning: PropTypes.bool.isRequired
};

ScanningStep.defaultProps = {
    deviceList: [],
    scanning: true
};

export default ScanningStep;
