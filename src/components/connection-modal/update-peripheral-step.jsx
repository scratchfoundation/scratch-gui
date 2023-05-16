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
    sendUpdate: null,
    results: null
});

const microBitFirmwareUrl = 'https://microbit.org/get-started/user-guide/firmware/';

class UpdatePeripheralStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSendUpdate'
        ]);
        this.state = {
            /** @type {UPDATE_ACTIVITY} */
            activity: UPDATE_ACTIVITY.getReady,

            /** @type {number} */
            progress: 0,

            /** @type {Error?} */
            err: null,

            /** @type {any} */
            res: null
        };
    }

    async handleSendUpdate () {
        this.setState({
            activity: UPDATE_ACTIVITY.sendUpdate,
            progress: 0,
            err: null,
            res: null
        });
        try {
            const res = await this.props.onSendPeripheralUpdate(progress => {
                this.setState({progress});
            });
            this.setState({
                activity: UPDATE_ACTIVITY.results,
                res
            });
        } catch (err) {
            this.setState({
                activity: UPDATE_ACTIVITY.results,
                err
            });
        }
    }

    renderGetReady () {
        return (<Box className={styles.activityArea}>
            <Box className={styles.centeredRow}>
                <FormattedMessage
                    defaultMessage="This will update your {extensionName} to work with Scratch."
                    description="Introduction to the peripheral update process"
                    id="gui.connection.updatePeripheral.introduction"
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
                    description="Instructions to connect the micro:bit to the computer for the update process"
                    id="gui.connection.updatePeripheral.microBitConnect"
                    values={{
                        extensionName: this.props.name
                    }}
                />
            </Box>
            <Box className={styles.centeredRow}>
                <FormattedMessage
                    defaultMessage="Please don't disconnect, reset, or turn off your {extensionName} during the update."
                    description="Notice to not disrupt the peripheral update process"
                    id="gui.connection.updatePeripheral.doNotDisconnect"
                    values={{
                        extensionName: this.props.name
                    }}
                />
            </Box>
        </Box>);
    }

    renderSendUpdate () {
        return (<Box className={styles.activityArea}>
            <p>{'Sending update...'}</p>
            <progress
                max="1"
                value={this.state.progress}
            />
        </Box>);
    }

    renderResults () {
        let resultsContent;
        if (this.state.err === null) {
            resultsContent = (<FormattedMessage
                defaultMessage="Update successful!"
                description="Message to indicate that the peripheral update was successful"
                id="gui.connection.updatePeripheral.updateSuccessful"
            />);
        } else if (this.state.err.message === 'No valid interfaces found.') {
            // this is a special case where the micro:bit's communication firmware is too old to support WebUSB
            resultsContent = (<FormattedMessage
                defaultMessage="Please visit {microBitFirmwareLink} to update your micro:bit firmware."
                description="Message to indicate that the special micro:bit interface firmware needs to be updated"
                id="gui.connection.updatePeripheral.updateMicroBitFirmware"
                values={{
                    microBitFirmwareLink: <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={microBitFirmwareUrl}
                    >
                        {microBitFirmwareUrl}
                    </a>
                }}
            />);
        } else {
            resultsContent = (<FormattedMessage
                defaultMessage="Update failed. Error: {errorMessage}"
                description="Message to indicate that the peripheral update failed"
                id="gui.connection.updatePeripheral.updateFailed"
                values={{
                    errorMessage: this.state.err.message
                }}
            />);
        }
        return (<Box className={styles.activityArea}>
            {resultsContent}
        </Box>);
    }

    render () {
        return (
            <Box className={styles.body}>
                {(this.state.activity === UPDATE_ACTIVITY.getReady) && this.renderGetReady()}
                {(this.state.activity === UPDATE_ACTIVITY.sendUpdate) && this.renderSendUpdate()}
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
                            disabled={this.state.activity === UPDATE_ACTIVITY.sendUpdate}
                        >
                            <img
                                className={classNames(styles.buttonIconLeft, styles.buttonIconBack)}
                                src={backIcon}
                            />
                            <FormattedMessage
                                defaultMessage="Go back"
                                description="Button to leave the peripheral update process"
                                id="gui.connection.updatePeripheral.goBackButton"
                            />
                        </button>
                        <button
                            className={styles.connectionButton}
                            onClick={this.handleSendUpdate}
                            disabled={this.state.activity !== UPDATE_ACTIVITY.getReady}
                        >
                            <FormattedMessage
                                defaultMessage="Update now"
                                description="Button to start the peripheral update"
                                id="gui.connection.updatePeripheral.updateNowButton"
                            />
                        </button>
                    </Box>
                </Box>
            </Box>
        );
    }
}

UpdatePeripheralStep.propTypes = {
    name: PropTypes.string.isRequired,
    onScanning: PropTypes.func.isRequired,
    onSendPeripheralUpdate: PropTypes.func.isRequired
};

export default UpdatePeripheralStep;
