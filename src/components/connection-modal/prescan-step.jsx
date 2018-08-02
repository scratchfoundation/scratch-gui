import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';

import radarIcon from './icons/searching.png';
import bluetoothIcon from './icons/bluetooth-white.svg';

import styles from './connection-modal.css';

const PrescanStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            <Box className={styles.centeredRow}>
                <div className={styles.centeredRow}>
                    <img
                        className={styles.radar}
                        src={radarIcon}
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
                total={4}
            />
            <button
                className={styles.connectionButton}
                // onClick={props.onRefresh}
            >
                <FormattedMessage
                    defaultMessage="Search for WeDo"
                    description="Button in prompt for starting a search"
                    id="gui.connection.startSearch"
                />
            </button>
        </Box>
    </Box>
);

PrescanStep.propTypes = {
    connectingMessage: PropTypes.node.isRequired
};

export default PrescanStep;
