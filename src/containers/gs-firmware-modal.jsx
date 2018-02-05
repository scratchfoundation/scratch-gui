import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import GsFirmwareModalComponent from '../components/gs-firmware-modal/gs-firmware-modal.jsx';

import {
    closeFirmware
} from '../reducers/modals';

class GsFirmwareModal extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleKeyPress',
            'handleOk',
            'handleChangePort',
            'handleChangeBoard',
            'handleChangeVersion',
            'handleChangeArduinoType',
            'handleOkAdvanced',
            'handleChangeBaudRate',
        ]);
        this.state = {
            selectValuePort: '',
            selectValueBoard: '',
            selectValueVersion: '',
            portList: [],
            mainBoard: [],
            version: [],
            Okdisabled: false,
            // 高级模式
            selectValueArduinoType: '',
            selectValueBaudRate: '',
            arduinoType: [
                {k: 'uno', v: 'Arduino Uno'},
                {k: 'mega', v: 'Arduino Mega'},
                {k: 'leonardo', v: 'Arduino Leonardo'},
                {k: 'nano', v: 'Arduino Nano'}
            ],
            baudRate: [
                9600,
                115200
            ]
        };
        this.config = {};
    }

    async componentDidMount() {
        const mainBoard = [];
        const config = await SEP.App.getHexFiles();
        config.forEach((item) => {
            mainBoard.push({k: item.type, v: item.name});
        });
        this.setState({
            portList: await SEP.RobotManage.getPortList(),
            mainBoard: mainBoard,
            config: config
        });
    }

    handleCancel (e) {
        e.stopPropagation();
        this.props.onClose();
    }
    handleKeyPress (event) {
        if (event.key === 'Enter') this.handleOk();
    }
    async handleOk () {
        if (this.state.selectValuePort && this.state.mainBoard && this.state.version) {
            const filename = this.state.selectValueVersion;
            if (SEP.RobotManage.getCurrentRobot()) {
                SEP.RobotManage.removeAll();
            }
            this.setState({
                Okdisabled: true
            });
            SEP.RobotManage.updateHex(filename, this.state.selectValuePort, 'mega', (res) => {
                if (res) {
                    this.setState({
                        Okdisabled: false
                    });
                }
            });
        }

    }
    handleChangePort (e) {
        this.setState({selectValuePort: e.target.value});
    }
    handleChangeBoard (e) {
        let version = [];
        if (e.target.value) {
            this.state.config.forEach((item) => {
                if (item.type === e.target.value) {
                    version = item.version;
                }
            })
        }
        this.setState({
            selectValueBoard: e.target.value,
            version: version
        });
    }
    handleChangeVersion (e) {
        this.setState({selectValueVersion: e.target.value});
    }

    handleChangeArduinoType (e) {
        this.setState({selectValueArduinoType: e.target.value});
    }

    handleChangeBaudRate (e) {
        this.setState({selectValueBaudRate: e.target.value});
    }

    async handleOkAdvanced () {
        if (this.state.selectValuePort && this.state.selectValueArduinoType && this.state.selectValueBaudRate) {
            const filename = await SEP.App.openFile();
            if (SEP.RobotManage.getCurrentRobot()) {
                SEP.RobotManage.removeAll();
            }
            this.setState({
                Okdisabled: true
            });
            SEP.RobotManage.updateHex(filename, this.state.selectValuePort, this.state.selectValueArduinoType, (res) => {
                if (res) {
                    this.setState({
                        Okdisabled: false
                    });
                }
            });
        }
    }

    render() {
        return (
            <GsFirmwareModalComponent
                onChangePort={this.handleChangePort}
                onChangeBoard={this.handleChangeBoard}
                onChangeVersion={this.handleChangeVersion}
                handleKeyPress={this.handleKeyPress}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                portList={this.state.portList}
                mainBoard={this.state.mainBoard}
                version={this.state.version}
                Okdisabled={this.state.Okdisabled}
                onChangeArduinoType={this.handleChangeArduinoType}
                onChangeBaudRate={this.handleChangeBaudRate}
                onOkAdvanced={this.handleOkAdvanced}
                arduinoType={this.state.arduinoType}
                baudRate={this.state.baudRate}
                inputRef={this.setFileInput}
            />
        )
    }
}

GsFirmwareModal.propTypes = {
    onClose: PropTypes.func
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeFirmware());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GsFirmwareModal);
