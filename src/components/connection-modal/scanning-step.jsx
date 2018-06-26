import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import DeviceTile from './device-tile.jsx';
import Dots from './dots.jsx';

import styles from './connection-modal.css';

const ScanningStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            {props.scanning ? (
                props.deviceList.length === 0 ? (
                    <div className={styles.activityAreaInfo}>
                        <FormattedMessage
                            defaultMessage="Looking for devices"
                            description=""
                            id="gui.connection.scanning.lookingfordevices"
                        />
                    </div>
                ) : (
                    <Box className={styles.deviceTilePane}>
                        {props.deviceList.map(device =>
                            (<DeviceTile
                                RSSI={device.RSSI}
                                key={device.peripheralId}
                                name={device.name}
                                peripheralId={device.peripheralId}
                                onConnecting={props.onConnecting}
                            />)
                        )}
                    </Box>
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
        <Box className={styles.bottomArea}>
            <Box className={styles.instructions}>
                <FormattedMessage
                    defaultMessage="Select your device in the list above."
                    description=""
                    id="gui.connection.scanning.instructions"
                />
            </Box>
            <Dots
                counter={1}
                total={3}
            />
            <Box className={styles.buttonRow}>
                <button
                    className={styles.blueButton}
                    onClick={props.onConnecting}
                >
                    <FormattedMessage
                        defaultMessage="refresh"
                        description="Button in prompt for starting a search"
                        id="gui.connection.search"
                    />
                </button>
            </Box>
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
    scanning: PropTypes.bool.isRequired
};

ScanningStep.defaultProps = {
    deviceList: [],
    scanning: true
};

export default ScanningStep;
