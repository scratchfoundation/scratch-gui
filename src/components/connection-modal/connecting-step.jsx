import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';

import styles from './connection-modal.css';

const ConnectingStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
        </Box>
        <Box className={styles.bottomArea}>
            <Box className={styles.instructions}>
                <FormattedMessage
                    defaultMessage="🔌connecting🔌"
                    description=""
                    id="gui.connection.connecting"
                />
            </Box>
            <Dots
                counter={2}
                total={3}
            />
            <button
                className={styles.blueButton}
                onClick={props.onAbortConnecting}
            >
                <FormattedMessage
                    defaultMessage="X"
                    description="Button to cancel connecting"
                    id="gui.connection.cancelbutton"
                />
            </button>
        </Box>
    </Box>
);

ConnectingStep.propTypes = {
    onAbortConnecting: PropTypes.func
};

export default ConnectingStep;
