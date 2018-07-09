import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import Box from '../box/box.jsx';

import styles from './connection-modal.css';

class DeviceTile extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleConnecting'
        ]);
    }
    handleConnecting () {
        this.props.onConnecting(this.props.peripheralId);
    }
    render () {
        return (
            <Box className={styles.deviceTile}>
                <Box>
                    <span>{this.props.name}</span>
                    <Box className={styles.deviceTileWidgets}>
                        <span className={styles.signalStrengthText}>{this.props.rssi}</span>
                        <button
                            onClick={this.handleConnecting}
                        >
                            <FormattedMessage
                                defaultMessage="Connect"
                                description="Button to start connecting to a specific device"
                                id="gui.connection.connect"
                            />
                        </button>
                    </Box>
                </Box>
            </Box>
        );
    }
}

DeviceTile.propTypes = {
    name: PropTypes.string,
    onConnecting: PropTypes.func,
    peripheralId: PropTypes.string,
    rssi: PropTypes.number
};

export default DeviceTile;
