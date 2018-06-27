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
    }
    componentWillUnmount () {
        // @todo: stop the device scan here
        this.props.vm.removeListener(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
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
    vm: PropTypes.instanceOf(VM).isRequired
};

export default ScanningStep;
