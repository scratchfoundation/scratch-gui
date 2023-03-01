import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl, intlShape, defineMessages} from 'react-intl';

import {updateMessage, updateWriter} from '../reducers/serial';

import SerialPaneComponent from '../components/serial-pane/serial-pane.jsx';
import {
    Command,
    EOL,
    FlowControl,
    MessageType,
    Parity
} from '../components/serial-info/serial-info.jsx';
import {STAGE_DISPLAY_SIZES} from '../lib/layout-constants';

const serial = window.navigator.serial;

const messages = defineMessages({
    wrongHEX: {
        id: 'gui.serialPane.wrongHEX',
        defaultMessage: 'Wrong HEX data: '
    }
});

class SerialPane extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeBaudRate',
            'handleChangeBufferSize',
            'handleChangeDataBits',
            'handleChangeEOL',
            'handleChangeFlowControl',
            'handleChangeMessageType',
            'handleChangeParity',
            'handleChangeStopBits',
            'handleClickClear',
            'handleClickCtrlC',
            'handleClickCtrlD',
            'handleConnectClick',
            'handleDisconnectClick',
            'hexReceived',
            'textReceived',
            'write'
        ]);

        this.state = {
            connected: false,
            baudRate: 115200,
            bufferSize: 255,
            dataBits: 8,
            eol: EOL.CRLF,
            flowControl: FlowControl.NONE,
            logs: [],
            messageType: MessageType.TEXT,
            parity: Parity.NONE,
            stopBits: 1
        };

        this._port = null;
        this._reader = null;
        this._readable = null;
        this._decoder = new TextDecoder();
        this._encoder = new TextEncoder();

        serial.addEventListener('disconnect', this.handleDisconnectClick);
    }
    componentWillUnmount () {
        this.handleDisconnectClick();
    }
    handleChangeBaudRate (baudRate) {
        this.setState({baudRate});
    }
    handleChangeBufferSize (bufferSize) {
        this.setState({bufferSize});
    }
    handleChangeDataBits (dataBits) {
        this.setState({dataBits});
    }
    handleChangeEOL (eol) {
        this.setState({eol});
    }
    handleChangeFlowControl (flowControl) {
        this.setState({flowControl});
    }
    handleChangeMessageType (messageType) {
        this.setState({messageType});
    }
    handleChangeParity (parity) {
        this.setState({parity});
    }
    handleChangeStopBits (stopBits) {
        this.setState({stopBits});
    }
    handleConnectClick () {
        const {
            baudRate,
            bufferSize,
            dataBits,
            flowControl,
            parity,
            stopBits
        } = this.state;
        serial.requestPort().then(port => {
            this._port = port;
            this._port
                .open({
                    baudRate,
                    bufferSize,
                    dataBits,
                    flowControl,
                    parity,
                    stopBits
                })
                .then(() => {
                    this.props.onWrite(this.write);
                    this._readable = this._port.readable;
                    this.readData(this.state.messageType);
                    this.setState({
                        connected: true
                    });
                });
        });
    }
    handleDisconnectClick () {
        if (this._reader) {
            this._reader.cancel();
        }
        this._reader = null;
        this._readable = null;

        setTimeout(() => {
            if (this._port) {
                this._port.close();
                this._port.forget();
                this._port = null;
            }
        }, 500);

        this.setState({
            connected: false
        });
        this.props.onWrite(null);
    }
    handleClickClear (e) {
        e.preventDefault();
        this.props.onMessage('\x1b[2J\x1b[H');
    }
    handleClickCtrlC (e) {
        e.preventDefault();
        this.sendCommand(Command.CTRL_C);
    }
    handleClickCtrlD (e) {
        e.preventDefault();
        this.sendCommand(Command.CTRL_D);
    }
    sendCommand (command) {
        if (!this._port || !this._port.writable) return;
        const writer = this._port.writable.getWriter();
        writer.write(this._encoder.encode(command));
        writer.releaseLock();
    }
    readData (type) {
        if (!this._readable) return;
        this._reader = this._readable.getReader();
        const dataReceived = type === MessageType.HEX ? this.hexReceived : this.textReceived;
        this._reader.read().then(dataReceived)
            .finally(() => {
                if (this._reader) {
                    this._reader.releaseLock();
                    this.readData(type);
                }
            });
    }
    hexReceived (data) {
        if (!this._reader) return;
        const {done, value} = data;
        if (done) return;
        const hex = Array.from(value).map(h => `0${h.toString(16)}`.toLocaleUpperCase().slice(-2));
        this.props.onMessage(`${hex.join(' ')} \r\n`);
        this.log(`x${hex.join(' x')}`);
        return this._reader.read().then(this.hexReceived);
    }
    textReceived (data) {
        if (!this._reader) return;
        const {done, value} = data;
        if (done) return;
        const text = this._decoder.decode(value);
        this.props.onMessage(text);
        this.log(text);
        return this._reader.read().then(this.textReceived);
    }
    write (data) {
        if (this.state.messageType === MessageType.HEX) {
            this.writeHEX(data);
        } else {
            this.writeText(data);
        }
    }
    writeText (text) {
        const value = `${text}${this.state.eol}`;
        if (value.length === 0) {
            this.props.onMessage('\x00');
            return;
        }
        this.writeData(this._encoder.encode(value));
        const eol = this.state.eol.replaceAll('\r', '\\r').replaceAll('\n', '\\n');
        this.log(text, {eol});
    }
    writeHEX (hex) {
        const eol = Array.from(this._encoder.encode(this.state.eol))
            .map(h => `0${h.toString(16)}`.slice(-2).toLocaleUpperCase());
        const value = `${hex.replace(/\s+/g, '')}${eol.join('')}`;
        if (/^[0-9A-Fa-f]+$/.test(value) && value.length % 2 === 0) {
            const data = [];
            for (let i = 0; i < value.length; i = i + 2) {
                const val = value.substring(i, i + 2);
                data.push(parseInt(val, 16));
            }
            this.writeData(Uint8Array.from(data));
            const text = data.map(h => `x${`0${h.toString(16)}`.slice(-2).toLocaleUpperCase()}`).join(' ');
            this.log(text, {
                eol: eol.length > 0 ? `x${eol.join(' x')}` : null
            });
            return;
        }
        const wrongMessage = this.props.intl.formatMessage(messages.wrongHEX);
        this.log(`${wrongMessage}${hex}`, {flag: '✕'});
        this.props.onMessage('\x00');
    }
    writeData (data) {
        if (!this._port || !this._port.writable) return;
        const writer = this._port.writable.getWriter();
        writer.write(data);
        writer.releaseLock();
    }
    log (value, options) {
        const now = new Date();
        const hour = `0${now.getHours()}`.slice(-2);
        const minute = `0${now.getMinutes()}`.slice(-2);
        const second = `0${now.getSeconds()}`.slice(-2);
        const millisecond = `00${now.getMilliseconds()}`.slice(-3);
        const logs = this.state.logs;
        const {
            flag,
            eol
        } = options || {};
        logs.unshift({
            timestamp: `${hour}:${minute}:${second}.${millisecond}`,
            flag: flag || (typeof eol === 'undefined' ? '↪' : '↩'),
            eol,
            value
        });
        this.setState({
            logs: [].concat(logs)
        });
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            onMessage,
            onWrite,
            /* eslint-enable no-unused-vars */
            ...componentProps
        } = this.props;

        return (
            <SerialPaneComponent
                {...this.state}
                {...componentProps}
                onChangeBaudRate={this.handleChangeBaudRate}
                onChangeBufferSize={this.handleChangeBufferSize}
                onChangeDataBits={this.handleChangeDataBits}
                onChangeEOL={this.handleChangeEOL}
                onChangeFlowControl={this.handleChangeFlowControl}
                onChangeMessageType={this.handleChangeMessageType}
                onChangeParity={this.handleChangeParity}
                onChangeStopBits={this.handleChangeStopBits}
                onClickClear={this.handleClickClear}
                onClickCtrlC={this.handleClickCtrlC}
                onClickCtrlD={this.handleClickCtrlD}
                onConnectClick={this.handleConnectClick}
                onDisconnectClick={this.handleDisconnectClick}
            />
        );
    }
}

SerialPane.propTypes = {
    intl: intlShape,
    isRtl: PropTypes.bool,
    onMessage: PropTypes.func,
    onWrite: PropTypes.func,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired
};

const mapStateToProps = state => ({
    isRtl: state.locales.isRtl
});

const mapDispatchToProps = dispatch => ({
    onMessage: message => dispatch(updateMessage(message)),
    onWrite: writer => dispatch(updateWriter(writer))
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(SerialPane));
