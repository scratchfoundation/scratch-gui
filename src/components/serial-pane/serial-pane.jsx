import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import Box from '../box/box.jsx';
import ActionMenu from '../action-menu/action-menu.jsx';
import SerialInfo from '../../containers/serial-info.jsx';
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants';

import connectIcon from './icon-connect.svg';
import disconnectIcon from './icon-disconnect.svg';
import clearIcon from './icon-clear.svg';
import sendIcon from './icon-send.svg';

import styles from './serial-pane.css';

const messages = defineMessages({
    connect: {
        id: 'gui.serialPanel.connect',
        defaultMessage: 'Connect'
    },
    disconnect: {
        id: 'gui.serialPanel.disconnect',
        defaultMessage: 'Disonnect'
    },
    clear: {
        id: 'gui.serialPanel.clear',
        defaultMessage: 'Clear all'
    },
    ctrlC: {
        id: 'gui.serialPanel.ctrlC',
        defaultMessage: 'Send Ctrl+C'
    },
    ctrlD: {
        id: 'gui.serialPanel.ctrlD',
        defaultMessage: 'Send Ctrl+D'
    }
});

const SerialPaneComponent = ({
    baudRate,
    bufferSize,
    connected,
    dataBits,
    eol,
    flowControl,
    intl,
    isRtl,
    logs,
    messageType,
    parity,
    stopBits,
    onChangeBaudRate,
    onChangeBufferSize,
    onChangeDataBits,
    onChangeEOL,
    onChangeFlowControl,
    onChangeMessageType,
    onChangeParity,
    onChangeStopBits,
    onClickClear,
    onClickCtrlC,
    onClickCtrlD,
    onConnectClick,
    onDisconnectClick,
    stageSize,
    ...componentProps
}) => (
    <Box
        className={styles.serialPane}
        {...componentProps}
    >
        <SerialInfo
            baudRate={baudRate}
            bufferSize={bufferSize}
            dataBits={dataBits}
            disabled={connected}
            eol={eol}
            flowControl={flowControl}
            logs={logs}
            messageType={messageType}
            parity={parity}
            stopBits={stopBits}
            onChangeBaudRate={onChangeBaudRate}
            onChangeBufferSize={onChangeBufferSize}
            onChangeDataBits={onChangeDataBits}
            onChangeEOL={onChangeEOL}
            onChangeFlowControl={onChangeFlowControl}
            onChangeMessageType={onChangeMessageType}
            onChangeParity={onChangeParity}
            onChangeStopBits={onChangeStopBits}
            stageSize={stageSize}
        />

        <Box
            className={classNames(styles.logsWrapper, {
                [styles.smallWrapper]: stageSize === STAGE_DISPLAY_SIZES.small
            })}
        >
            {logs.map((log, index) => (
                <div
                    className={styles.logItem}
                    key={index}
                >
                    <div className={styles.flagText}>{log.flag}</div>
                    <div className={styles.valueText}>
                        {stageSize === STAGE_DISPLAY_SIZES.small ? <div>{log.timestamp}</div> : null}
                        {log.value.split(/\r?\n|(?<!\n)\r/).map((v, i) => (
                            <div key={i}>{v}</div>
                        ))}
                        {log.eol ? <div>{`➥ ${log.eol}`}</div> : null}
                    </div>
                    {stageSize === STAGE_DISPLAY_SIZES.small ? null : (
                        <div className={styles.timestampText}>{log.timestamp}</div>
                    )}
                </div>
            ))}
        </Box>

        {connected ? (
            <ActionMenu
                className={classNames(styles.addButton, styles.warning)}
                img={clearIcon}
                moreButtons={[{
                    title: intl.formatMessage(messages.disconnect),
                    img: disconnectIcon,
                    onClick: onDisconnectClick
                }, {
                    title: intl.formatMessage(messages.ctrlC),
                    img: sendIcon,
                    onClick: onClickCtrlC
                }, {
                    title: intl.formatMessage(messages.ctrlD),
                    img: sendIcon,
                    onClick: onClickCtrlD
                }]}
                title={intl.formatMessage(messages.clear)}
                tooltipPlace={isRtl ? 'right' : 'left'}
                onClick={onClickClear}
            />
        ) : (
            <ActionMenu
                className={styles.addButton}
                img={connectIcon}
                title={intl.formatMessage(messages.connect)}
                tooltipPlace={isRtl ? 'right' : 'left'}
                onClick={onConnectClick}
            />
        )}
    </Box>
);

SerialPaneComponent.propTypes = {
    baudRate: PropTypes.number,
    bufferSize: PropTypes.number,
    connected: PropTypes.bool,
    dataBits: PropTypes.number,
    disabled: PropTypes.bool,
    eol: PropTypes.string,
    flowControl: PropTypes.string,
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    logs: PropTypes.arrayOf(PropTypes.shape(PropTypes.object)),
    messageType: PropTypes.string,
    onChangeBaudRate: PropTypes.func,
    onChangeBufferSize: PropTypes.func,
    onChangeDataBits: PropTypes.func,
    onChangeEOL: PropTypes.func,
    onChangeFlowControl: PropTypes.func,
    onChangeMessageType: PropTypes.func,
    onChangeParity: PropTypes.func,
    onChangeStopBits: PropTypes.func,
    onClickClear: PropTypes.func,
    onClickCtrlC: PropTypes.func,
    onClickCtrlD: PropTypes.func,
    onConnectClick: PropTypes.func,
    onDisconnectClick: PropTypes.func,
    parity: PropTypes.string,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    stopBits: PropTypes.number
};

export default injectIntl(SerialPaneComponent);
