import React from 'react';
import PropTypes from 'prop-types';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';

import styles from './alert.css';

const AlertComponent = ({
    iconURL,
    message,
    onCloseAlert
}) => (
    <Box
        className={styles.alert}
    >
        <div className={styles.alertMessage}>
            {iconURL ? (
                <img
                    className={styles.alertIcon}
                    src={iconURL}
                />
            ) : null}
            {message}
        </div>
        <Button
            className={styles.alertRemoveButton}
            onClick={onCloseAlert}
        >
            {'x'}
        </Button>
    </Box>
);

AlertComponent.propTypes = {
    iconURL: PropTypes.string,
    message: PropTypes.string,
    onCloseAlert: PropTypes.func.isRequired
};

export default AlertComponent;
