import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import Box from '../box/box.jsx';
import CloseButton from '../close-button/close-button.jsx';
import Spinner from '../spinner/spinner.jsx';
import {AlertLevels} from '../../lib/alerts/index.jsx';

import styles from './alert.css';

const closeButtonColors = {
    [AlertLevels.SUCCESS]: CloseButton.COLOR_GREEN,
    [AlertLevels.WARN]: CloseButton.COLOR_ORANGE
};

const AlertComponent = ({
    content,
    iconSpinner,
    iconURL,
    level,
    message,
    onCloseAlert,
    onReconnect,
    showReconnect
}) => (
    <Box
        className={classNames(styles.alert, styles[level])}
    >
        <div className={styles.alertMessage}>
            {/* TODO: implement Rtl handling */}
            <div className={styles.alertIcon}>
                {iconSpinner && (
                    <Spinner />
                )}
                {iconURL && (
                    <img src={iconURL} />
                )}
            </div>
            <div>
                {message}
                &nbsp;
                {content}
            </div>
        </div>
        {showReconnect ? (
            <button
                className={styles.connectionButton}
                onClick={onReconnect}
            >
                <FormattedMessage
                    defaultMessage="Reconnect"
                    description="Button to reconnect the device"
                    id="gui.connection.reconnect"
                />
            </button>
        ) : null}
        <Box
            className={styles.alertCloseButtonContainer}
        >
            <CloseButton
                className={classNames(styles.alertCloseButton)}
                color={closeButtonColors[level]}
                size={CloseButton.SIZE_LARGE}
                onClick={onCloseAlert}
            />
        </Box>
    </Box>
);

AlertComponent.propTypes = {
    content: PropTypes.element,
    iconSpinner: PropTypes.bool,
    iconURL: PropTypes.string,
    level: PropTypes.string,
    message: PropTypes.string,
    onCloseAlert: PropTypes.func.isRequired,
    onReconnect: PropTypes.func,
    showReconnect: PropTypes.bool
};

AlertComponent.defaultProps = {
    level: AlertLevels.WARN
};

export default AlertComponent;
