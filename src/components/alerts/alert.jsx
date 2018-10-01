import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

import Box from '../box/box.jsx';
import CloseButton from '../close-button/close-button.jsx';

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
            <FormattedMessage
                defaultMessage="Tutorials"
                description="Title for button to return to tutorials library"
                id="gui.cards.all-tutorials"
            />
        </div>
        <CloseButton
            size={CloseButton.SIZE_SMALL}
            onClick={onCloseAlert}
        />
    </Box>
);

AlertComponent.propTypes = {
    iconURL: PropTypes.string,
    message: PropTypes.string,
    onCloseAlert: PropTypes.func.isRequired
};

export default AlertComponent;
