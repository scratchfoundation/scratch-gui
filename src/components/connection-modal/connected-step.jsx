import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';

import styles from './connection-modal.css';

// todo: update the flyout status button here?
// this.ScratchBlocks.updateStatusButton('microbit', this.ScratchBlocks.StatusButtonState.READY);

const ConnectedStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
        </Box>
        <Box className={styles.bottomArea}>
            <Box className={styles.instructions}>
                <FormattedMessage
                    defaultMessage="🔥connected🔥"
                    description="Button in prompt for starting a search"
                    id="gui.connection.search"
                />
            </Box>
            <Dots
                counter={3}
                total={3}
            />
        </Box>
    </Box>
);

ConnectedStep.propTypes = {
};

export default ConnectedStep;
