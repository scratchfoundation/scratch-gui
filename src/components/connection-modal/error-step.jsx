import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';
import helpIcon from './icons/help.svg';
import backIcon from './icons/back.svg';

import styles from './connection-modal.css';

const ErrorStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            <Box className={styles.centeredRow}>
                <div className={styles.deviceActivity}>
                    <img
                        className={styles.deviceActivityIcon}
                        src={props.deviceImage}
                    />
                </div>
            </Box>
        </Box>
        <Box className={styles.bottomArea}>
            <div className={styles.instructions}>
                <FormattedMessage
                    defaultMessage="Oops, looks like something went wrong."
                    description="The device connection process has encountered an error."
                    id="gui.connection.errorMessage"
                />
            </div>
            <Dots
                error
                total={3}
            />
            <Box className={styles.buttonRow}>
                <button
                    className={styles.connectionButton}
                    onClick={props.onScanning}
                >
                    <img
                        className={styles.buttonIconLeft}
                        src={backIcon}
                    />
                    <FormattedMessage
                        defaultMessage="Try again"
                        description="Button to initiate trying the device connection again after an error"
                        id="gui.connection.tryagainbutton"
                    />
                </button>
                <button
                    className={styles.connectionButton}
                    onClick={props.onHelp}
                >
                    <img
                        className={styles.buttonIconLeft}
                        src={helpIcon}
                    />
                    <FormattedMessage
                        defaultMessage="Help"
                        description="Button to view help content"
                        id="gui.connection.helpbutton"
                    />
                </button>
            </Box>
        </Box>
    </Box>
);

ErrorStep.propTypes = {
    deviceImage: PropTypes.string.isRequired,
    onHelp: PropTypes.func,
    onScanning: PropTypes.func
};

export default ErrorStep;
