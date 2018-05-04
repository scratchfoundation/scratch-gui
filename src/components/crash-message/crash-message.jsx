/* eslint-disable react/jsx-no-literals */
/*
    @todo Rule is disabled because this component is rendered outside the
    intl provider right now so cannot be translated.
*/

import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';

import styles from './crash-message.css';
import reloadIcon from './reload.svg';

const CrashMessage = props => (
    <div className={styles.crashWrapper}>
        <Box className={styles.body}>
            <img
                className={styles.reloadIcon}
                src={reloadIcon}
            />
            <h2>
                Oops! Something went wrong.
            </h2>
            <p>
                We are so sorry, but it looks like Scratch has crashed. This bug has been
                automatically reported to the Scratch Team. Please refresh your page to try
                again.

            </p>
            <button
                className={styles.reloadButton}
                onClick={props.onReload}
            >
                Reload
            </button>
        </Box>
    </div>
);

CrashMessage.propTypes = {
    onReload: PropTypes.func.isRequired
};

export default CrashMessage;
