import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {connect} from 'react-redux';
import {injectIntl, intlShape, defineMessages} from 'react-intl';
import {Terminal} from 'xterm';
import {WebglAddon} from 'xterm-addon-webgl';
import {FitAddon} from 'xterm-addon-fit';

import SerialMonitorComponent from '../components/serial-monitor/serial-monitor.jsx';
import {STAGE_DISPLAY_SIZES} from '../lib/layout-constants';

import 'xterm/css/xterm.css';

const messages = defineMessages({
    waitConnect: {
        id: 'gui.serialMonitor.waitConnect',
        defaultMessage: 'Waiting for connect...',
        description: 'Placeholder text for serial monitor'
    }
});

const BASE_THEME = {
    foreground: '#f8f8f8',
    background: '#2d2e2c',
    selection: '#5da5d533',
    black: '#1e1e1d',
    brightblack: '#262625',
    red: '#ce5c5c',
    brightred: '#ff7272',
    green: '#5bcc5b',
    brightgreen: '#72ff72',
    yellow: '#cccc5b',
    brightyellow: '#ffff72',
    blue: '#5d5dd3',
    brightblue: '#7279ff',
    magenta: '#bc5ed1',
    brightmagenta: '#e572ff',
    cyan: '#5da5d5',
    brightcyan: '#72f0ff',
    white: '#f8f8f8',
    brightwhite: '#ffffff'
};

const DEFAULT_OPTIONS = {
    fontFamily: '"Cascadia Code", Menlo, monospace',
    cursorBlink: false,
    fontSize: 12,
    lineHeight: 1.2,
    allowProposedApi: true,
    disableStdin: true,
    theme: BASE_THEME
};

class SerialMonitor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleData'
        ]);
        this.terminal = document.createElement('div');
        this._lines = [];
        this._lastLine = '';
        this._command = '';
        this._lastCommand = '';
    }
    componentDidMount () {
        this.newTerminal();
    }
    shouldComponentUpdate (nextProps) {
        if (this._term) {
            const connected = typeof nextProps.onSend === 'function';
            this._term.options.disableStdin = !connected;
            this._term.options.cursorBlink = connected;
            if (this.props.onSend !== nextProps.onSend) {
                if (connected) {
                    this._lastLine = '';
                    this._lines.length = 0;
                    this._term.clear();
                    this._term.focus();
                    this.saveCursor();
                } else {
                    this._command = '';
                    this._lastLine = '';
                    this.writeWait();
                    this.saveCursor();
                }
            }
            if (
                this.props.message &&
                nextProps.message &&
                this.props.message.timestamp !== nextProps.message.timestamp
            ) {
                this.recoverCursor();
                const message = nextProps.message.value;
                const lines = message.split(/\r?\n|(?<!\n)\r/);
                lines[0] = this._lastLine + lines[0];
                this._command = '';
                this._lastLine = lines.pop();
                this._lines.push(...lines);
                this._term.write('\x1b[K');
                this._term.write(message);
                this.saveCursor();
            }
        }

        return this.props.isFullScreen !== nextProps.isFullScreen ||
            this.props.stageSize !== nextProps.stageSize;
    }
    componentDidUpdate () {
        this._term.options.fontSize = DEFAULT_OPTIONS.fontSize;
        if (this.props.isFullScreen) {
            this._term.options.fontSize = DEFAULT_OPTIONS.fontSize + 3;
        }

        this._fitAddon.fit();
        this._term.focus();

        this._term.clear();
        this._term.write('\x1b[H');
        this._lines.forEach(val => this._term.writeln(val));
        this._term.write(this._lastLine);
        this.saveCursor();
        this._term.write(this._command);
        this._term.scrollToBottom();
    }
    componentWillUnmount () {
        this._term.dispose();
    }
    newTerminal () {
        if (this._term) return;

        this._term = new Terminal(DEFAULT_OPTIONS);
        this._term.open(this.terminal);
        this._term.onData(this.handleData);

        this._term.loadAddon(new WebglAddon());
        this._fitAddon = new FitAddon();
        this._term.loadAddon(this._fitAddon);
        this._fitAddon.fit();

        this._term.focus();
        this._term.blur();

        this.writeWait();
    }
    handleData (e) {
        switch (e) {
        case '\r': // Enter
            this.sendCommand();
            this._command = '';
            break;
        case '\u007F': // Backspace (DEL)
            if (this._command.length > 0) {
                if (this._term._core.buffer.x === 0) {
                    this._term.write(`\x1b[1A\x1b[${this._term.cols}C`);
                }
                this._term.write('\b \b');
                this._command = this._command.substring(0, this._command.length - 1);
            }
            break;
        default: // Print all other characters
            if (
                (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E)) ||
                e >= '\u00a0'
            ) {
                this._command += e;
                if (this._term._core.buffer.x === this._term.cols - 1) {
                    this._term.write(`\x1b[1B\x1b[${this._term.cols}D`);
                }
                this._term.write(e);
            }
        }
    }
    saveCursor () {
        this._term.write('\x1b[s');
    }
    recoverCursor () {
        this._term.write('\x1b[u');
    }
    writeWait () {
        this.writeln(`\x1b[36m${this.props.intl.formatMessage(messages.waitConnect)}\x1b[0m`);
        this.writeln('');
    }
    writeln (line) {
        this._term.writeln(this._lastLine + line);
        this._lines.push(line);
        this._lastLine = '';
    }
    sendCommand () {
        const command = this._command.trim();
        this._lastCommand = command;
        this._term.writeln('');
        this.props.onSend(command);
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            message,
            onSend,
            /* eslint-enable no-unused-vars */
            ...componentProps
        } = this.props;
        return (
            <SerialMonitorComponent
                terminal={this.terminal}
                {...componentProps}
            />
        );
    }
}

SerialMonitor.propTypes = {
    message: PropTypes.shape(PropTypes.objectOf({
        value: PropTypes.string,
        timestamp: PropTypes.number
    })),
    isFullScreen: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
    onSend: PropTypes.func,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    isFullScreen: state.scratchGui.mode.isFullScreen,
    message: state.scratchGui.serial.message,
    onSend: state.scratchGui.serial.writer
});

const mapDispatchToProps = () => ({});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(SerialMonitor));
