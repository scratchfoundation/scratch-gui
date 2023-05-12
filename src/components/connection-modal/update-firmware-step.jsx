import 'regenerator-runtime/runtime';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import bindAll from 'lodash.bindall';
import keyMirror from 'keymirror';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';
import backIcon from './icons/back.svg';

import styles from './connection-modal.css';

/** @enum{string} UPDATE_ACTIVITY */
const UPDATE_ACTIVITY = keyMirror({
    getReady: null,
    sendFirmware: null,
    results: null
});

class UpdateFirmwareStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleUpdateFirmware'
        ]);
        this.state = {
            /**
             * @type {UPDATE_ACTIVITY}
             */
            activity: UPDATE_ACTIVITY.getReady,
            progress: 0
        };
    }

    async handleUpdateFirmware () {
        this.setState({
            activity: UPDATE_ACTIVITY.sendFirmware,
            progress: 0
        });
        const results = await this.props.onSendFirmware(progress => {
            this.setState({progress});
        });
        this.setState({
            activity: UPDATE_ACTIVITY.results,
            results
        });
    }

    renderGetReady () {
        return (<Box className={styles.activityArea}>
            <Box className={styles.centeredRow}>
                <FormattedMessage
                    defaultMessage="This will update your {extensionName} to work with Scratch."
                    description="Introduction to the firmware update process for a peripheral"
                    id="gui.connection.updateFirmware.introduction"
                    values={{
                        extensionName: this.props.name
                    }}
                />
            </Box>
            <Box className={styles.centeredRow}>
                {
                    // The instructions for getting the peripheral ready for the update process will vary depending on
                    // the peripheral. Should we get this from the extension somehow?
                }
                <FormattedMessage
                    defaultMessage="Please connect your {extensionName} to this device using a USB cable."
                    description="Instructions to connect the micro:bit to the computer for the firmware update process"
                    id="gui.connection.updateFirmware.microBitConnect"
                    values={{
                        extensionName: this.props.name
                    }}
                />
            </Box>
            <Box className={styles.centeredRow}>
                <FormattedMessage
                    defaultMessage="Please don't disconnect, reset, or turn off your {extensionName} during the update."
                    description="Notice to not disrupt the firmware update process"
                    id="gui.connection.updateFirmware.doNotDisconnect"
                    values={{
                        extensionName: this.props.name
                    }}
                />
            </Box>
        </Box>);
    }

    renderSendFirmware () {
        return (<Box className={styles.activityArea}>
            <p>{'Sending update...'}</p>
            <progress
                max="1"
                value={this.state.progress}
            />
        </Box>);
    }

    renderResults () {
        return (<Box className={styles.activityArea}>
            <p>{'Results'}</p>
        </Box>);
    }

    render () {
        return (
            <Box className={styles.body}>
                {(this.state.activity === UPDATE_ACTIVITY.getReady) && this.renderGetReady()}
                {(this.state.activity === UPDATE_ACTIVITY.sendFirmware) && this.renderSendFirmware()}
                {(this.state.activity === UPDATE_ACTIVITY.results) && this.renderResults()}
                <Box className={styles.bottomArea}>
                    <Dots
                        className={styles.bottomAreaItem}
                        total={3}
                    />
                    <Box className={classNames(styles.bottomAreaItem, styles.buttonRow)}>
                        <button
                            className={styles.connectionButton}
                            onClick={this.props.onScanning}
                            disabled={this.state.activity === UPDATE_ACTIVITY.sendFirmware}
                        >
                            <img
                                className={classNames(styles.buttonIconLeft, styles.buttonIconBack)}
                                src={backIcon}
                            />
                            <FormattedMessage
                                defaultMessage="Go back"
                                description="Button to leave the firmware update process"
                                id="gui.connection.updateFirmware.goBackButton"
                            />
                        </button>
                        <button
                            className={styles.connectionButton}
                            onClick={this.handleUpdateFirmware}
                            disabled={this.state.activity !== UPDATE_ACTIVITY.getReady}
                        >
                            <FormattedMessage
                                defaultMessage="Update now"
                                description="Button to start the firmware update"
                                id="gui.connection.updateFirmware.updateNowButton"
                            />
                        </button>
                    </Box>
                </Box>
            </Box>
        );
    }
}

UpdateFirmwareStep.propTypes = {
    name: PropTypes.string.isRequired,
    onScanning: PropTypes.func.isRequired,
    onSendFirmware: PropTypes.func.isRequired
};

export default UpdateFirmwareStep;
