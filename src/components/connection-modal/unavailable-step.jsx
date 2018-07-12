import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';
import helpIcon from './icons/help.svg';
import backIcon from './icons/back.svg';
import scratchLinkIcon from './icons/scratch-link.png';

import styles from './connection-modal.css';

const UnavailableStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            <Box className={styles.centeredRow}>
                <div className={styles.deviceActivity}>
                    <img
                        className={styles.scratchLinkIcon}
                        src={scratchLinkIcon}
                    />
                </div>
            </Box>
        </Box>
        <Box className={styles.bottomArea}>
            <div className={styles.instructions}>
                <FormattedMessage
                    defaultMessage="Please start Scratch Link and turn on Bluetooth."
                    description="Scratch link is not installed message"
                    id="gui.connection.unavailableMessage"
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

UnavailableStep.propTypes = {
    onHelp: PropTypes.func,
    onScanning: PropTypes.func
};

export default UnavailableStep;
