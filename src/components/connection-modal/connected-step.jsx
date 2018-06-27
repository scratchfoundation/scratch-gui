import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';

import styles from './connection-modal.css';
import classNames from 'classnames';

// todo: update the flyout status button here?
// this.ScratchBlocks.updateStatusButton('microbit', this.ScratchBlocks.StatusButtonState.READY);

const ConnectedStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea} />
        <Box className={styles.bottomArea}>
            <Box className={styles.instructions}>
                <FormattedMessage
                    defaultMessage="Connected"
                    description=""
                    id="gui.connection.connected"
                />
            </Box>
            <Dots
                counter={3}
                total={3}
            />
            <div className={styles.cornerButtons}>
                <button
                    className={classNames(styles.redButton, styles.connectionButton)}
                    onClick={props.onDisconnect}
                >
                    <FormattedMessage
                        defaultMessage="disconnect"
                        description="Disconnect the "
                        id="gui.connection.disconnect"
                    />
                </button>
                <button
                    className={styles.connectionButton}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="go to editor"
                        description=""
                        id="gui.connection.go to editor"
                    />
                </button>
            </div>
        </Box>
    </Box>
);

ConnectedStep.propTypes = {
};

export default ConnectedStep;
