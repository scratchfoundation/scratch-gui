import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import Button from '../button/button.jsx';

import styles from './alert.css';

const Alerts = ({
    className,
    message,
    onCloseAlert
}) => (
    <Box
        bounds="parent"
        className={classNames(styles.alertsContainer, className)}
    >
        <Box
            className={styles.alert}
        >
            <div className={styles.alertMessage}>
                {message}
            </div>
            <Button
                className={styles.alertRemoveButton}
                onClick={onCloseAlert}
            >
                { /* eslint-disable react/jsx-no-literals */ }
                x
            </Button>
        </Box>
    </Box>
);

Alerts.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string.isRequired,
    onCloseAlert: PropTypes.func.isRequired
};

export default Alerts;
