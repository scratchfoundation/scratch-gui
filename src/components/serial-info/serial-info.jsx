import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';

import {injectIntl, intlShape, defineMessages, FormattedMessage} from 'react-intl';

import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants.js';
import {isWideLocale} from '../../lib/locale-utils.js';

import styles from './serial-info.css';

const BufferedInput = BufferedInputHOC(Input);

export const Command = {
    CTRL_C: '\u0003',
    CTRL_D: '\u0004'
};

export const EOL = {
    NONE: '',
    CRLF: '\r\n',
    LF: '\n',
    CR: '\r'
};

export const FlowControl = {
    NONE: 'none',
    HARDWARE: 'hardware'
};

export const MessageType = {
    TEXT: 'text',
    HEX: 'hex'
};

export const Parity = {
    NONE: 'none',
    EVEN: 'even',
    ODD: 'odd'
};

const messages = defineMessages({
    none: {
        id: 'gui.serialInfo.none',
        defaultMessage: 'None'
    },
    even: {
        id: 'gui.serialInfo.even',
        defaultMessage: 'Even'
    },
    odd: {
        id: 'gui.serialInfo.odd',
        defaultMessage: 'Odd'
    },
    hardware: {
        id: 'gui.serialInfo.hardware',
        defaultMessage: 'Hardware'
    },
    text: {
        id: 'gui.serialInfo.text',
        defaultMessage: 'Text'
    },
    hex: {
        id: 'gui.serialInfo.hex',
        defaultMessage: 'HEX'
    },
    crlf: {
        id: 'gui.serialInfo.crlf',
        defaultMessage: 'CRLF'
    },
    lf: {
        id: 'gui.serialInfo.lf',
        defaultMessage: 'LF'
    },
    cr: {
        id: 'gui.serialInfo.cr',
        defaultMessage: 'CR'
    }
});

class SerialInfo extends React.Component {
    shouldComponentUpdate (nextProps) {
        return (
            this.props.baudRate !== nextProps.baudRate ||
            this.props.bufferSize !== nextProps.bufferSize ||
            this.props.dataBits !== nextProps.dataBits ||
            this.props.disabled !== nextProps.disabled ||
            this.props.eol !== nextProps.eol ||
            this.props.flowControl !== nextProps.flowControl ||
            this.props.messageType !== nextProps.messageType ||
            this.props.parity !== nextProps.parity ||
            this.props.stageSize !== nextProps.stageSize ||
            this.props.stopBits !== nextProps.stopBits
        );
    }
    render () {
        const baudRateText = (
            <FormattedMessage
                defaultMessage="Baud rate"
                description="Serial info baud rate label"
                id="gui.serialInfo.baudRate"
            />
        );
        const dataBitsText = (
            <FormattedMessage
                defaultMessage="Data bits"
                description="Serial info data bits label"
                id="gui.serialInfo.dataBits"
            />
        );
        const stopBitsText = (
            <FormattedMessage
                defaultMessage="Stop bits"
                description="Serial info stop bits label"
                id="gui.serialInfo.stopBits"
            />
        );
        const parityText = (
            <FormattedMessage
                defaultMessage="Parity"
                description="Serial info parity label"
                id="gui.serialInfo.parity"
            />
        );
        const bufferSizeText = (
            <FormattedMessage
                defaultMessage="Buffer size"
                description="Serial info buffer size label"
                id="gui.serialInfo.bufferSize"
            />
        );
        const flowControlText = (
            <FormattedMessage
                defaultMessage="Flow control"
                description="Serial info flow control label"
                id="gui.serialInfo.flowControl"
            />
        );
        const sendTypeText = (
            <FormattedMessage
                defaultMessage="Send type"
                description="Serial info send message type label"
                id="gui.serialInfo.sendType"
            />
        );
        const receiveTypeText = (
            <FormattedMessage
                defaultMessage="Receive type"
                description="Serial info receive message type label"
                id="gui.serialInfo.receiveType"
            />
        );
        const eolText = (
            <FormattedMessage
                defaultMessage="EOL"
                description="Serial info eol label"
                id="gui.serialInfo.eol"
            />
        );

        const labelAbove = isWideLocale(this.props.intl.locale);

        const baudRateInput = (
            <BufferedInput
                className={classNames(styles.wide, {
                    [styles.columnInput]: labelAbove
                })}
                disabled={this.props.disabled}
                // placeholder={}
                tabIndex="0"
                type="text"
                value={this.props.baudRate}
                onSubmit={this.props.onChangeBaudRate}
            />
        );

        if (this.props.stageSize === STAGE_DISPLAY_SIZES.small) {
            return (
                <Box className={styles.serialInfo}>
                    <div className={classNames(styles.row, styles.rowPrimary, styles.wide)}>
                        <div className={classNames(styles.group, styles.wide)}>
                            <Label
                                secondary
                                above={labelAbove}
                                text={baudRateText}
                            >
                                {baudRateInput}
                            </Label>
                        </div>
                    </div>
                    <div className={classNames(styles.row, styles.rowSecondary, styles.wide)}>
                        <div className={classNames(labelAbove ? styles.column : styles.group)}>
                            <Label
                                secondary
                                text={eolText}
                            />
                            <div className={styles.radioWrapper}>
                                <div
                                    className={classNames(
                                        styles.radio,
                                        styles.radioFirst,
                                        styles.textWrapper,
                                        {
                                            [styles.isActive]: this.props.eol === EOL.NONE
                                        }
                                    )}
                                    tabIndex="0"
                                    onClick={this.props.onClickNoneEOL}
                                >
                                    {this.props.intl.formatMessage(messages.none)}
                                </div>
                                <div
                                    className={classNames(
                                        styles.radio,
                                        styles.radioMiddle,
                                        styles.textWrapper,
                                        {
                                            [styles.isActive]: this.props.eol === EOL.CRLF
                                        }
                                    )}
                                    tabIndex="0"
                                    onClick={this.props.onClickCRLF}
                                >
                                    {this.props.intl.formatMessage(messages.crlf)}
                                </div>
                                <div
                                    className={classNames(
                                        styles.radio,
                                        styles.radioMiddle,
                                        styles.textWrapper,
                                        {
                                            [styles.isActive]: this.props.eol === EOL.LF
                                        }
                                    )}
                                    tabIndex="0"
                                    onClick={this.props.onClickLF}
                                >
                                    {this.props.intl.formatMessage(messages.lf)}
                                </div>
                                <div
                                    className={classNames(
                                        styles.radio,
                                        styles.radioLast,
                                        styles.textWrapper,
                                        {
                                            [styles.isActive]: this.props.eol === EOL.CR
                                        }
                                    )}
                                    tabIndex="0"
                                    onClick={this.props.onClickCR}
                                >
                                    {this.props.intl.formatMessage(messages.cr)}
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            );
        }

        return (
            <Box className={styles.serialInfo}>
                <div className={classNames(styles.row, styles.rowPrimary)}>
                    <div className={styles.group}>
                        <Label
                            secondary
                            above={labelAbove}
                            text={baudRateText}
                        >
                            {baudRateInput}
                        </Label>
                    </div>
                    <div className={labelAbove ? styles.column : styles.group}>
                        <Label
                            secondary
                            text={dataBitsText}
                        />
                        <div className={styles.radioWrapper}>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioFirst,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.dataBits === 7 && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickDataBits7}
                            >
                                {`${7}`}
                            </div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioLast,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.dataBits === 8 && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickDataBits8}
                            >
                                {`${8}`}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.row, styles.rowPrimary)}>
                    <div className={labelAbove ? styles.column : styles.group}>
                        <Label
                            secondary
                            text={stopBitsText}
                        />
                        <div className={styles.radioWrapper}>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioFirst,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.stopBits === 1 && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickStopBits1}
                            >
                                {`${1}`}
                            </div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioLast,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.stopBits === 2 && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickStopBits2}
                            >
                                {`${2}`}
                            </div>
                        </div>
                    </div>
                    <div className={labelAbove ? styles.column : styles.group}>
                        <Label
                            secondary
                            text={bufferSizeText}
                        />
                        <BufferedInput
                            className={classNames({
                                [styles.columnInput]: labelAbove
                            })}
                            disabled={this.props.disabled}
                            // placeholder={}
                            tabIndex="0"
                            type="text"
                            value={this.props.bufferSize}
                            onSubmit={this.props.onChangeBufferSize}
                        />
                    </div>
                </div>
                <div className={classNames(styles.row, styles.rowPrimary)}>
                    <div className={classNames(labelAbove ? styles.column : styles.group)}>
                        <Label
                            secondary
                            text={parityText}
                        />
                        <div className={styles.radioWrapper}>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioFirst,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.parity === Parity.NONE && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickParityNone}
                            >
                                {this.props.intl.formatMessage(messages[Parity.NONE])}
                            </div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioMiddle,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.parity === Parity.EVEN && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickParityEven}
                            >
                                {this.props.intl.formatMessage(messages[Parity.EVEN])}
                            </div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioLast,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.parity === Parity.ODD && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickParityOdd}
                            >
                                {this.props.intl.formatMessage(messages[Parity.ODD])}
                            </div>
                        </div>
                    </div>
                    <div className={labelAbove ? styles.column : styles.group}>
                        <Label
                            secondary
                            text={flowControlText}
                        />
                        <div className={styles.radioWrapper}>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioFirst,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.flowControl === FlowControl.NONE && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickFlowControlNone}
                            >
                                {this.props.intl.formatMessage(messages.none)}
                            </div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioLast,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.flowControl === FlowControl.HARDWARE && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickFlowControlHardware}
                            >
                                {this.props.intl.formatMessage(messages.hardware)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.row, styles.rowSecondary)}>
                    <div className={classNames(labelAbove ? styles.column : styles.group)}>
                        <Label
                            secondary
                            text={this.props.disabled ? sendTypeText : receiveTypeText}
                        />
                        <div className={styles.radioWrapper}>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioFirst,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.messageType === MessageType.TEXT
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickMessageTypeText}
                            >
                                {this.props.intl.formatMessage(messages.text)}
                            </div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioLast,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.messageType === MessageType.HEX
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickMessageTypeHEX}
                            >
                                {this.props.intl.formatMessage(messages.hex)}
                            </div>
                        </div>
                    </div>
                    <div className={classNames(labelAbove ? styles.column : styles.group)}>
                        <Label
                            secondary
                            text={eolText}
                        />
                        <div className={styles.radioWrapper}>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioFirst,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.eol === EOL.NONE
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickNoneEOL}
                            >
                                {this.props.intl.formatMessage(messages.none)}
                            </div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioMiddle,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.eol === EOL.CRLF
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickCRLF}
                            >
                                {this.props.intl.formatMessage(messages.crlf)}
                            </div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioMiddle,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.eol === EOL.LF
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickLF}
                            >
                                {this.props.intl.formatMessage(messages.lf)}
                            </div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioLast,
                                    styles.textWrapper,
                                    {
                                        [styles.isActive]: this.props.eol === EOL.CR
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickCR}
                            >
                                {this.props.intl.formatMessage(messages.cr)}
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        );
    }
}

SerialInfo.propTypes = {
    intl: intlShape,
    baudRate: PropTypes.number,
    bufferSize: PropTypes.number,
    dataBits: PropTypes.number,
    disabled: PropTypes.bool,
    eol: PropTypes.string,
    flowControl: PropTypes.string,
    messageType: PropTypes.string,
    onChangeBaudRate: PropTypes.func,
    onChangeBufferSize: PropTypes.func,
    onClickDataBits8: PropTypes.func,
    onClickDataBits7: PropTypes.func,
    onClickNoneEOL: PropTypes.func,
    onClickCRLF: PropTypes.func,
    onClickLF: PropTypes.func,
    onClickCR: PropTypes.func,
    onClickFlowControlNone: PropTypes.func,
    onClickFlowControlHardware: PropTypes.func,
    onClickMessageTypeText: PropTypes.func,
    onClickMessageTypeHEX: PropTypes.func,
    onClickParityNone: PropTypes.func,
    onClickParityEven: PropTypes.func,
    onClickParityOdd: PropTypes.func,
    onClickStopBits1: PropTypes.func,
    onClickStopBits2: PropTypes.func,
    parity: PropTypes.string,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    stopBits: PropTypes.number
};

export default injectIntl(SerialInfo);
