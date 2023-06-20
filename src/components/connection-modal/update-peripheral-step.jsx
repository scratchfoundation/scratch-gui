import 'regenerator-runtime/runtime';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import bindAll from 'lodash.bindall';
import keyMirror from 'keymirror';

import BalancedFormattedMessage from '../../containers/balanced-formatted-message.jsx';
import Box from '../box/box.jsx';
import ProgressRingComponent from '../progress-ring/progress-ring.jsx';

import backIcon from './icons/back.svg';
import sendUpdateIcon from './icons/send-update.svg';
import sendUpdateGlyph from './icons/send-update-white.svg';

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
            progressPercentage: 0,

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
                // On my computer, I get a progress update every 0.005% or so.
                // Rendering the progress ring is a little expensive, so filtering updates here reduces the CPU load.
                // Updating every 1% doesn't look very smooth, but 0.5% (1/200) looks good to me.
                this.setState({progressPercentage: Math.floor(progress * 200) / 2});
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
            <Box className={styles.scratchLinkHelp}>
                <Box className={styles.scratchLinkHelpStep}>
                    <Box className={styles.helpStepNumber}>
                        {'1'}
                    </Box>
                    <img
                        className={styles.helpStepImage}
                        src={this.props.connectionSmallIconURL}
                    />
                    {
                        // The instructions for getting the peripheral ready for the update process will vary
                        // depending on the peripheral. Should we get this from the extension somehow?
                    }
                    <FormattedMessage
                        className={styles.helpStepText}
                        defaultMessage="Connect your {extensionName} to this device using a USB cable."
                        description="Instructions to connect the micro:bit to the computer for the update process"
                        id="gui.connection.updatePeripheral.microBitConnect"
                        values={{
                            extensionName: this.props.name
                        }}
                    />
                </Box>
                <Box className={styles.scratchLinkHelpStep}>
                    <Box className={styles.helpStepNumber}>
                        {'2'}
                    </Box>
                    <img
                        className={styles.helpStepImage}
                        src={sendUpdateIcon}
                    />
                    <FormattedMessage
                        defaultMessage="Press &quot;Do Update&quot; and allow the update to complete."
                        description="Instructions to press the button to begin the update process"
                        id="gui.connection.updatePeripheral.pressUpdate"
                    />
                </Box>
            </Box>
        </Box>);
    }

    renderSendUpdate () {
        return (<Box className={styles.activityArea}>
            <ProgressRingComponent
                sizePx={36}
                value={this.state.progressPercentage}
                max={100}
            />
            <FormattedMessage
                defaultMessage="Updating {progressPercentage}%"
                description="Progress message while updating the peripheral"
                id="gui.connection.updatePeripheral.progress"
                values={{
                    progressPercentage: Math.floor(this.state.progressPercentage)
                }}
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
            resultsContent = (<BalancedFormattedMessage
                defaultMessage="Please visit this link to update your micro:bit firmware: {microBitFirmwareLink}"
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
            resultsContent = (
                <Box className={styles.scratchLinkError}>
                    <FormattedMessage
                        className={styles.centeredRow}
                        defaultMessage="Update failed."
                        description="Message to indicate that the peripheral update failed"
                        id="gui.connection.updatePeripheral.updateFailed"
                    />
                    <textarea
                        className={styles.scratchLinkErrorDetails}
                        readOnly
                    >
                        {this.state.err.message}
                    </textarea>
                </Box>
            );
        }
        return (<Box className={styles.activityArea}>
            {resultsContent}
        </Box>);
    }

    render () {
        const showGetReady = this.state.activity === UPDATE_ACTIVITY.getReady;
        const showSendUpdate = this.state.activity === UPDATE_ACTIVITY.sendUpdate;
        const showResults = this.state.activity === UPDATE_ACTIVITY.results;
        const showBadResults = showResults && !!this.state.err;
        return (
            <Box className={styles.body}>
                {showGetReady && this.renderGetReady()}
                {showSendUpdate && this.renderSendUpdate()}
                {showResults && this.renderResults()}
                <Box className={styles.bottomArea}>
                    {!showResults &&
                        <BalancedFormattedMessage
                            className={styles.bottomAreaItem}
                            defaultMessage={'Do not leave or reload Scratch or disconnect your {extensionName} ' +
                                'until the update is complete.'}
                            description="Notice to not disrupt the peripheral update process"
                            id="gui.connection.updatePeripheral.doNotDisconnect"
                            values={{
                                extensionName: this.props.name
                            }}
                        />
                    }
                    {!showSendUpdate &&
                        <Box className={classNames(styles.bottomAreaItem, styles.buttonRow)}>
                            <button
                                className={styles.connectionButton}
                                onClick={this.props.onScanning}
                            >
                                <img
                                    className={classNames(styles.buttonIconLeft, styles.buttonIconBack)}
                                    src={backIcon}
                                />
                                <FormattedMessage
                                    defaultMessage="Go Back"
                                    description="Button to leave the peripheral update process"
                                    id="gui.connection.updatePeripheral.goBackButton"
                                />
                            </button>
                            {(showGetReady || showBadResults) &&
                                <button
                                    className={styles.connectionButton}
                                    onClick={this.handleSendUpdate}
                                >
                                    {showGetReady &&
                                        <FormattedMessage
                                            defaultMessage="Do Update"
                                            description="Button to start the peripheral update"
                                            id="gui.connection.updatePeripheral.updateNowButton"
                                        />
                                    }
                                    {showBadResults &&
                                        <FormattedMessage
                                            defaultMessage="Try Again"
                                            description="Button to try the peripheral update again"
                                            id="gui.connection.updatePeripheral.updateAgainButton"
                                        />
                                    }
                                    <img
                                        className={styles.buttonIconRight}
                                        src={sendUpdateGlyph}
                                    />
                                </button>
                            }
                        </Box>
                    }
                </Box>
            </Box>
        );
    }
}

UpdatePeripheralStep.propTypes = {
    connectionSmallIconURL: PropTypes.string,
    name: PropTypes.string.isRequired,
    onScanning: PropTypes.func.isRequired,
    onSendPeripheralUpdate: PropTypes.func.isRequired
};

export default UpdatePeripheralStep;
