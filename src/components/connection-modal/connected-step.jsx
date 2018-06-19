import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';

import styles from './connection-modal.css';

// todo: update the flyout status button here?
// this.ScratchBlocks.updateStatusButton('microbit', this.ScratchBlocks.StatusButtonState.READY);

const ConnectedStep = props => (
    <Box className={styles.body}>
        <Box className={styles.buttonRow}>
            <button
                className={styles.searchButton}
                onClick={props.onSearch}
            >
                <FormattedMessage
                    defaultMessage="🔥connected🔥"
                    description="Button in prompt for starting a search"
                    id="gui.connection.search"
                />
            </button>
        </Box>
    </Box>
);

ConnectedStep.propTypes = {
};

export default ConnectedStep;
