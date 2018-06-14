import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';

import styles from './connection-modal.css';

const ScanningStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            {props.searching ? (
                props.devices.length === 0 ? (
                    <div>search icon here</div>
                ) : (
                    props.devices.map(device => (
                        <div>{device.name}</div>
                    ))
                )
            ) : (
                <div>No devices found, click on this hyperlink right now</div>
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
                onClick={props.onSearch}
            >
                <FormattedMessage
                    defaultMessage="scanning"
                    description="Button in prompt for starting a search"
                    id="gui.connection.search"
                />
            </button>
        </Box>
    </Box>
);

ScanningStep.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
    })),
    searching: PropTypes.bool.isRequired
};

ScanningStep.defaultProps = {
    devices: [],
    searching: true
};

export default ScanningStep;
