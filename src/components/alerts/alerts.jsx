import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';

import styles from './alert.css';

const Alerts = ({
    className,
    alertsList,
    onCloseAlert
}) => (
    <Box
        bounds="parent"
        className={classNames(className)}
    >
        {alertsList.map((a, index) => (
            <Box
                className={styles.alert}
                key={index}
            >
                <div className={styles.alertMessage}>
                    <img className={styles.alertIcon} src={a.iconURL} /> {a.message} {a.name}.
                </div>
                <Button
                    className={styles.alertRemoveButton}
                    onClick={() => onCloseAlert(index)}
                >
                    { /* eslint-disable react/jsx-no-literals */ }
                    x
                </Button>
            </Box>
        ))}
    </Box>
);

Alerts.propTypes = {
    alertsList: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    onCloseAlert: PropTypes.func.isRequired
};

export default Alerts;
