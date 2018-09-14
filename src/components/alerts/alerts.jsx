import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import styles from './alert.css';

// this is a functional component, declared with arrow syntax
const Alerts = props => (
    <Draggable
        bounds="parent"
        position={{x: 550, y: 0}}
    >
        <div className={styles.alertContainer}>
            <div className={styles.alert}>
                {props.message}
            </div>
        </div>
    </Draggable>
);

Alerts.propTypes = {
    message: PropTypes.string.isRequired
};

export default Alerts;
