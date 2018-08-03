import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';
import helpIcon from './icons/help.svg';
import backIcon from './icons/back.svg';
import bluetoothIcon from './icons/bluetooth.svg';
import scratchLinkIcon from './icons/scratchlink.svg';

import styles from './connection-modal.css';

const UnavailableStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            <div className={styles.scratchLinkHelp}>
                <div className={styles.scratchLinkHelpStep}>
                    <div className={styles.helpStepNumber}>
                        {'1'}
                    </div>
                    <div className={styles.helpStepImage}>
                        <img
                            className={styles.scratchLinkIcon}
                            src={scratchLinkIcon}
                        />
                    </div>
                    <div className={styles.helpStepText}>
                        <FormattedMessage
                            defaultMessage="Make sure you have Scratch Link installed and running"
                            description="Message for getting Scratch Link installed"
                            id="gui.connection.unavailable.installscratchlink"
                        />
                    </div>
                </div>
                <div className={styles.scratchLinkHelpStep}>
                    <div className={styles.helpStepNumber}>
                        {'2'}
                    </div>
                    <div className={styles.helpStepImage}>
                        <img
                            className={styles.scratchLinkIcon}
                            src={bluetoothIcon}
                        />
                    </div>
                    <div className={styles.helpStepText}>
                        <FormattedMessage
                            defaultMessage="Check that Bluetooth is enabled"
                            description="Message for making sure Bluetooth is enabled"
                            id="gui.connection.unavailable.enablebluetooth"
                        />
                    </div>
                </div>
            </div>
        </Box>
        <Box className={styles.bottomArea}>
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
                        id="gui.connection.unavailable.tryagainbutton"
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
                        id="gui.connection.unavailable.helpbutton"
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
