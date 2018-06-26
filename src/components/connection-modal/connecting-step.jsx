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
                    description="Button in prompt for starting a search"
                    id="gui.connection.search"
                />
            </Box>
            <Dots
                counter={2}
                total={3}
            />
        </Box>
    </Box>
);

ConnectingStep.propTypes = {
};

export default ConnectingStep;
