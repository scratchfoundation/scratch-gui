import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';

import styles from './connection-modal.css';

const DeviceTile = props => (
    <Box className={styles.deviceTile}>
        <Box>
            <span>{props.name}</span>
            <Box className={styles.deviceTileWidgets}>
                <span>{props.RSSI}</span>
                <button
                    onClick={()=>props.onConnecting(props.peripheralId)}
                >
                    <FormattedMessage
                        defaultMessage="connect"
                        description=""
                        id="gui.connection.connect"
                    />
                </button>
            </Box>
        </Box>
    </Box>
);

DeviceTile.propTypes = {
    RSSI: PropTypes.number,
    name: PropTypes.string,
    onConnecting: PropTypes.function,
    peripheralId: PropTypes.string
};

export default DeviceTile;
