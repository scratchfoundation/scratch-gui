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
            peripheralList: []
        };
    }
    componentDidMount () {
        this.props.vm.scanForPeripheral(this.props.extensionId);
        this.props.vm.on(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
        this.props.vm.on(
            'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
    }
    componentWillUnmount () {
        // @todo: stop the peripheral scan here
        this.props.vm.removeListener(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
        this.props.vm.removeListener(
            'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
    }
    handlePeripheralScanTimeout () {
        this.setState({
            scanning: false,
            peripheralList: []
        });
    }
    handlePeripheralListUpdate (newList) {
        // TODO: sort peripherals by signal strength? so they don't jump around
        const peripheralArray = Object.keys(newList).map(id =>
            newList[id]
        );
        this.setState({peripheralList: peripheralArray});
    }
    handleRefresh () {
        this.props.vm.scanForPeripheral(this.props.extensionId);
        this.setState({
            scanning: true,
            peripheralList: []
        });
    }
    render () {
        return (
            <ScanningStepComponent
                connectionSmallIconURL={this.props.connectionSmallIconURL}
                peripheralList={this.state.peripheralList}
                phase={this.state.phase}
                scanning={this.state.scanning}
                title={this.props.extensionId}
                onConnected={this.props.onConnected}
                onConnecting={this.props.onConnecting}
                onRefresh={this.handleRefresh}
            />
        );
    }
}

ScanningStep.propTypes = {
    connectionSmallIconURL: PropTypes.string,
    extensionId: PropTypes.string.isRequired,
    onConnected: PropTypes.func.isRequired,
    onConnecting: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default ScanningStep;
