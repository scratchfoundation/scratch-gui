import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';

import styles from './connection-modal.css';

const ErrorStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
        </Box>
        <Box className={styles.bottomArea}>
            <div className={styles.instructions}>
                <FormattedMessage
                    defaultMessage="Oops, looks like something went wrong."
                    description="The device connection process has encountered an error."
                    id="gui.connection.errorMessage"
                />
            </div>
            <Box className={styles.buttonRow}>
                <button
                    className={styles.blueButton}
                    onClick={props.onSearch}
                >
                    <FormattedMessage
                        defaultMessage="Try again"
                        description="Button to initiate trying the device connection again after an error"
                        id="gui.connection.tryagainbutton"
                    />
                </button>
                <button
                    className={styles.blueButton}
                    onClick={props.onSearch}
                >
                    <FormattedMessage
                        defaultMessage="Help"
                        description="Button to go to help content"
                        id="gui.connection.helpbutton"
                    />
                </button>
            </Box>
        </Box>
    </Box>
);

ErrorStep.propTypes = {
};

export default ErrorStep;
