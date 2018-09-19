import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import Button from '../button/button.jsx';

import styles from './alert.css';

const Alerts = props => (
    <Box
        bounds="parent"
        className={styles.alertsContainer}
    >
        <Box
            className={styles.alert}
        >
            <div className={styles.alertMessage}>
                {props.message}
            </div>
            <Button
                className={styles.alertRemoveButton}
                onClick={props.onCloseAlert}
            >
                { /* eslint-disable react/jsx-no-literals */ }
                x
            </Button>
        </Box>
    </Box>
);

Alerts.propTypes = {
    message: PropTypes.string.isRequired,
    onCloseAlert: PropTypes.func.isRequired
};

export default Alerts;
