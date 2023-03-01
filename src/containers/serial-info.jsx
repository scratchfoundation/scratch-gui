import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import SerialInfoComponent, {
    EOL,
    FlowControl,
    MessageType,
    Parity
} from '../components/serial-info/serial-info.jsx';

class SerialInfo extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickDataBits8',
            'handleClickDataBits7',
            'handleClickNoneEOL',
            'handleClickCRLF',
            'handleClickLF',
            'handleClickCR',
            'handleClickFlowControlNone',
            'handleClickFlowControlHardware',
            'handleClickMessageTypeText',
            'handleClickMessageTypeHEX',
            'handleClickParityNone',
            'handleClickParityEven',
            'handleClickParityOdd',
            'handleClickStopBits1',
            'handleClickStopBits2'
        ]);
    }
    handleClickDataBits8 (e) {
        e.preventDefault();
        this.props.onChangeDataBits(8);
    }
    handleClickDataBits7 (e) {
        e.preventDefault();
        this.props.onChangeDataBits(7);
    }
    handleClickNoneEOL (e) {
        e.preventDefault();
        this.props.onChangeEOL(EOL.NONE);
    }
    handleClickCRLF (e) {
        e.preventDefault();
        this.props.onChangeEOL(EOL.CRLF);
    }
    handleClickLF (e) {
        e.preventDefault();
        this.props.onChangeEOL(EOL.LF);
    }
    handleClickCR (e) {
        e.preventDefault();
        this.props.onChangeEOL(EOL.CR);
    }
    handleClickFlowControlNone (e) {
        e.preventDefault();
        this.props.onChangeFlowControl(FlowControl.NONE);
    }
    handleClickFlowControlHardware (e) {
        e.preventDefault();
        this.props.onChangeFlowControl(FlowControl.HARDWARE);
    }
    handleClickMessageTypeText (e) {
        e.preventDefault();
        this.props.onChangeMessageType(MessageType.TEXT);
    }
    handleClickMessageTypeHEX (e) {
        e.preventDefault();
        this.props.onChangeMessageType(MessageType.HEX);
    }
    handleClickParityNone (e) {
        e.preventDefault();
        this.props.onChangeParity(Parity.NONE);
    }
    handleClickParityEven (e) {
        e.preventDefault();
        this.props.onChangeParity(Parity.EVEN);
    }
    handleClickParityOdd (e) {
        e.preventDefault();
        this.props.onChangeParity(Parity.ODD);
    }
    handleClickStopBits1 (e) {
        e.preventDefault();
        this.props.onChangeStopBits(1);
    }
    handleClickStopBits2 (e) {
        e.preventDefault();
        this.props.onChangeStopBits(2);
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            onChangeDataBits,
            onChangeEOL,
            onChangeFlowControl,
            onChangeMessageType,
            onChangeParity,
            onChangeStopBits,
            /* eslint-disable no-unused-vars */
            ...componentProps
        } = this.props;
        return (
            <SerialInfoComponent
                {...componentProps}
                onClickNoneEOL={this.handleClickNoneEOL}
                onClickCRLF={this.handleClickCRLF}
                onClickLF={this.handleClickLF}
                onClickCR={this.handleClickCR}
                onClickDataBits8={this.handleClickDataBits8}
                onClickDataBits7={this.handleClickDataBits7}
                onClickFlowControlNone={this.handleClickFlowControlNone}
                onClickFlowControlHardware={this.handleClickFlowControlHardware}
                onClickMessageTypeText={this.handleClickMessageTypeText}
                onClickMessageTypeHEX={this.handleClickMessageTypeHEX}
                onClickParityNone={this.handleClickParityNone}
                onClickParityEven={this.handleClickParityEven}
                onClickParityOdd={this.handleClickParityOdd}
                onClickStopBits1={this.handleClickStopBits1}
                onClickStopBits2={this.handleClickStopBits2}
            />
        );
    }
}

SerialInfo.propTypes = {
    onChangeDataBits: PropTypes.func,
    onChangeEOL: PropTypes.func,
    onChangeFlowControl: PropTypes.func,
    onChangeMessageType: PropTypes.func,
    onChangeParity: PropTypes.func,
    onChangeStopBits: PropTypes.func
};

export default SerialInfo;
