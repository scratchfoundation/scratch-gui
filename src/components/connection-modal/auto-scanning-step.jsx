import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import keyMirror from 'keymirror';
import classNames from 'classnames';

import BalancedFormattedMessage from '../../containers/balanced-formatted-message.jsx';
import Box from '../box/box.jsx';
import Dots from './dots.jsx';

import closeIcon from '../close-button/icon--close.svg';

import backIcon from './icons/back.svg';
import bluetoothIcon from './icons/bluetooth-white.svg';
import enterUpdateIcon from './icons/enter-update.svg';
import radarIcon from './icons/searching.png';
import warningIcon from './icons/warning.svg';

import styles from './connection-modal.css';

const PHASES = keyMirror({
    prescan: null,
    pressbutton: null,
    notfound: null
});

const AutoScanningStep = props => {
    // Offer to update both during scan and after a failed scan, as long there's an update function.
    // It's possible the scan will find "some" device but not the desired device,
    // so don't limit the update offer to just the PHASES.notfound case.
    const showUpdate = !!(props.onUpdatePeripheral &&
        (props.phase === PHASES.pressbutton || props.phase === PHASES.notfound));
    return (<Box className={styles.body}>
        <Box className={styles.activityArea}>
            <div className={styles.activityAreaInfo}>
                <div className={styles.centeredRow}>
                    {props.phase === PHASES.prescan && (
                        <React.Fragment>
                            <img
                                className={styles.radarBig}
                                src={radarIcon}
                            />
                            <img
                                className={styles.bluetoothCenteredIcon}
                                src={bluetoothIcon}
                            />
                        </React.Fragment>
                    )}
                    {props.phase === PHASES.pressbutton && (
                        <React.Fragment>
                            <img
                                className={classNames(styles.radarBig, styles.radarSpin)}
                                src={radarIcon}
                            />
                            <img
                                className={styles.connectionTipIcon}
                                src={props.connectionTipIconURL}
                            />
                        </React.Fragment>
                    )}
                    {props.phase === PHASES.notfound && (
                        <React.Fragment>
                            <img
                                className={styles.helpStepImage}
                                src={warningIcon}
                            />
                            <FormattedMessage
                                className={styles.helpStepText}
                                defaultMessage="No devices found"
                                description="Text shown when no devices could be found"
                                id="gui.connection.auto-scanning.noPeripheralsFound"
                            />
                        </React.Fragment>
                    )}
                </div>
            </div>
        </Box>
        <Box className={styles.bottomArea}>
            <Box className={classNames(styles.bottomAreaItem, styles.instructions)}>
                {props.phase === PHASES.prescan && (
                    <FormattedMessage
                        defaultMessage="Have your device nearby, then begin searching."
                        description="Prompt for beginning the search"
                        id="gui.connection.auto-scanning.prescan"
                    />
                )}
                {props.phase === PHASES.pressbutton && (
                    <FormattedMessage
                        defaultMessage="Press the button on your device."
                        description="Prompt for pushing the button on the device"
                        id="gui.connection.auto-scanning.pressbutton"
                    />
                )}
            </Box>
            {showUpdate && (
                <Box className={classNames(styles.bottomAreaItem, styles.instructions)}>
                    <BalancedFormattedMessage
                        defaultMessage="If you don't see your device, you may need to update it to work with Scratch."
                        description="Prompt for updating a peripheral device"
                        id="gui.connection.auto-scanning.updatePeripheralPrompt"
                    />
                </Box>
            )}
            <Dots
                className={styles.bottomAreaItem}
                counter={0}
                total={3}
            />
            <Box className={classNames(styles.bottomAreaItem, styles.buttonRow)}>
                {props.phase === PHASES.prescan && (
                    <button
                        className={styles.connectionButton}
                        onClick={props.onStartScan}
                    >
                        <FormattedMessage
                            defaultMessage="Start Searching"
                            description="Button in prompt for starting a search"
                            id="gui.connection.auto-scanning.start-search"
                        />
                    </button>
                )}
                {props.phase === PHASES.pressbutton && (
                    <div className={styles.segmentedButton}>
                        <button
                            disabled
                            className={styles.connectionButton}
                        >
                            <FormattedMessage
                                defaultMessage="Searching..."
                                description="Label indicating that search is in progress"
                                id="gui.connection.connecting-searchbutton"
                            />
                        </button>
                        <button
                            className={styles.connectionButton}
                            onClick={props.onRefresh}
                        >
                            <img
                                className={styles.abortConnectingIcon}
                                src={closeIcon}
                            />
                        </button>
                    </div>
                )}
                {props.phase === PHASES.notfound && (
                    <button
                        className={styles.connectionButton}
                        onClick={props.onRefresh}
                    >
                        <img
                            className={styles.buttonIconLeft}
                            src={backIcon}
                        />
                        <FormattedMessage
                            defaultMessage="Try again"
                            description="Button in prompt for trying a device search again"
                            id="gui.connection.auto-scanning.try-again"
                        />
                    </button>
                )}
                {showUpdate && (
                    <button
                        className={classNames(styles.bottomAreaItem, styles.connectionButton)}
                        onClick={props.onUpdatePeripheral}
                    >
                        <FormattedMessage
                            defaultMessage="Update my Device"
                            description="Button to enter the peripheral update mode"
                            id="gui.connection.auto-scanning.updatePeripheralButton"
                        />
                        <img
                            className={styles.buttonIconRight}
                            src={enterUpdateIcon}
                        />
                    </button>
                )}
            </Box>
        </Box>
    </Box>);
};

AutoScanningStep.propTypes = {
    connectionTipIconURL: PropTypes.string,
    onRefresh: PropTypes.func,
    onStartScan: PropTypes.func,
    onUpdatePeripheral: PropTypes.func,
    phase: PropTypes.oneOf(Object.keys(PHASES))
};

AutoScanningStep.defaultProps = {
    phase: PHASES.prescan
};

export {
    AutoScanningStep as default,
    PHASES
};
