import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import DeviceTile from './device-tile.jsx';
import Dots from './dots.jsx';

import radarIcon from './icons/searching.png';
import refreshIcon from './icons/refresh.svg';

import styles from './connection-modal.css';

const ScanningStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            {props.scanning ? (
                props.deviceList.length === 0 ? (
                    <div className={styles.activityAreaInfo}>
                        <div className={styles.centeredRow}>
                            <img
                                className={classNames(styles.radarSmall, styles.radarSpin)}
                                src={radarIcon}
                            />
                            <FormattedMessage
                                defaultMessage="Looking for devices"
                                description="Text shown while scanning for devices"
                                id="gui.connection.scanning.lookingfordevices"
                            />
                        </div>
                    </div>
                ) : (
                    <div className={styles.deviceTilePane}>
                        {props.deviceList.map(device =>
                            (<DeviceTile
                                key={device.peripheralId}
                                name={device.name}
                                peripheralId={device.peripheralId}
                                rssi={device.rssi}
                                smallDeviceImage={props.smallDeviceImage}
                                onConnecting={props.onConnecting}
                            />)
                        )}
                    </div>
                )
            ) : (
                <Box className={styles.instructions}>
                    <FormattedMessage
                        defaultMessage="No devices found"
                        description="Text shown when no devices could be found"
                        id="gui.connection.scanning.noDevicesFound"
                    />
                </Box>
            )}
        </Box>
        <Box className={styles.bottomArea}>
            <Box className={styles.instructions}>
                <FormattedMessage
                    defaultMessage="Select your device in the list above."
                    description="Prompt for choosing a device to connect to"
                    id="gui.connection.scanning.instructions"
                />
            </Box>
            <Dots
                counter={0}
                total={3}
            />
            <button
                className={styles.connectionButton}
                onClick={props.onRefresh}
            >
                <FormattedMessage
                    defaultMessage="Refresh"
                    description="Button in prompt for starting a search"
                    id="gui.connection.search"
                />
                <img
                    className={styles.buttonIconRight}
                    src={refreshIcon}
                />
            </button>
        </Box>
    </Box>
);

ScanningStep.propTypes = {
    deviceList: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        rssi: PropTypes.number,
        peripheralId: PropTypes.string
    })),
    onConnecting: PropTypes.func,
    onRefresh: PropTypes.func,
    scanning: PropTypes.bool.isRequired,
    smallDeviceImage: PropTypes.string
};

ScanningStep.defaultProps = {
    deviceList: [],
    scanning: true
};

export default ScanningStep;
