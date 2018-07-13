import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ScanningStepComponent from '../components/connection-modal/scanning-step.jsx';
import VM from 'scratch-vm';

class ScanningStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handlePeripheralListUpdate',
            'handlePeripheralScanTimeout',
            'handleRefresh'
        ]);
        this.state = {
            scanning: true,
            deviceList: []
        };
    }
    componentDidMount () {
        this.props.vm.startDeviceScan(this.props.extensionId);
        this.props.vm.on(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
        this.props.vm.on(
            'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
    }
    componentWillUnmount () {
        // @todo: stop the device scan here
        this.props.vm.removeListener(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
        this.props.vm.removeListener(
            'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
    }
    handlePeripheralScanTimeout () {
        this.setState({scanning: false});
    }
    handlePeripheralListUpdate (newList) {
        // TODO: sort peripherals by signal strength? so they don't jump around
        const peripheralArray = Object.keys(newList).map(id =>
            newList[id]
        );
        this.setState({deviceList: peripheralArray});
    }
    handleRefresh () {
        this.props.vm.startDeviceScan(this.props.extensionId);
        this.setState({
            scanning: true,
            deviceList: []
        });
    }
    render () {
        return (
            <ScanningStepComponent
                deviceList={this.state.deviceList}
                phase={this.state.phase}
                smallDeviceImage={this.props.smallDeviceImage}
                title={this.props.extensionId}
                onConnected={this.props.onConnected}
                onConnecting={this.props.onConnecting}
                onRefresh={this.handleRefresh}
            />
        );
    }
}

ScanningStep.propTypes = {
    extensionId: PropTypes.string.isRequired,
    onConnected: PropTypes.func.isRequired,
    onConnecting: PropTypes.func.isRequired,
    smallDeviceImage: PropTypes.string,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default ScanningStep;
