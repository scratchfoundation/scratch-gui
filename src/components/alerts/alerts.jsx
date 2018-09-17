import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';

import styles from './alert.css';

// this is a functional component, declared with arrow syntax
const Alerts = props => (
    <Box
        bounds="parent"
    >
        <div className={styles.alertContainer}>
            <div className={styles.alert}>
                {props.message}
            </div>
            <div
                className={styles.removeButton}
                onClick={props.onCloseAlert}
            >
                { /* eslint-disable react/jsx-no-literals */ }
                x
            </div>
        </div>
    </Box>
);

Alerts.propTypes = {
    message: PropTypes.string.isRequired,
    onCloseAlert: PropTypes.func.isRequired
};

export default Alerts;
