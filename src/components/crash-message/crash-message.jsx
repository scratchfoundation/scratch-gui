import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import {FormattedMessage} from 'react-intl';

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
                <FormattedMessage
                    defaultMessage="Oops! Something went wrong."
                    description="Unhandled error title"
                    id="gui.crashMessage.title"
                />
            </h2>
            <p>
                { /* eslint-disable max-len */ }
                <FormattedMessage
                    defaultMessage="We are so sorry, but it looks like Scratch has crashed. This bug has been automatically reported to the Scratch Team. Please refresh your page to try again."
                    description="Unhandled error description"
                    id="gui.crashMessage.description"
                />
                { /* eslint-enable max-len */ }
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
