import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import styles from './alert.css';

// this is a functional component, declared with arrow syntax
const Alerts = props => (
    <Draggable
        bounds="parent"
    >
        <div className={styles.alertContainer}>
            <div className={styles.alert}>
                {props.message}
            </div>
            <div
                className={styles.button}
                onClick={props.onReconnect}
            >
                Reconnect
            </div>
            <div
                className={styles.removeButton}
                onClick={props.onCloseAlert}
            >
                x
            </div>
        </div>
    </Draggable>
);

Alerts.propTypes = {
    message: PropTypes.string.isRequired,
    onCloseAlert: PropTypes.func.isRequired,
    onReconnect: PropTypes.func.isRequired
};

export default Alerts;
