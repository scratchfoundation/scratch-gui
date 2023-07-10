import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ScanningStepComponent from '../components/connection-modal/scanning-step.jsx';
import VM from 'scratch-vm';

/**
 * Scan for a peripheral and allow the user to choose from a list of those discovered.
 * Does not support "prescan" and "pressbutton" phases.
 */
class ScanningStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handlePeripheralListUpdate',
            'handlePeripheralScanTimeout',
            'handleUserPickedPeripheral',
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
        this.props.vm.on(
            'USER_PICKED_PERIPHERAL', this.handleUserPickedPeripheral);
    }
    componentWillUnmount () {
        // @todo: stop the peripheral scan here
        this.props.vm.removeListener(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
        this.props.vm.removeListener(
            'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
        this.props.vm.removeListener(
            'USER_PICKED_PERIPHERAL', this.handleUserPickedPeripheral);
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
    handleUserPickedPeripheral (newList) {
        const peripheralArray = Object.keys(newList).map(id =>
            newList[id]
        );
        this.setState({peripheralList: peripheralArray});
        if (peripheralArray.length > 0) {
            this.props.onConnecting(peripheralArray[0].peripheralId);
        }
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
                onUpdatePeripheral={this.props.onUpdatePeripheral}
            />
        );
    }
}

ScanningStep.propTypes = {
    connectionSmallIconURL: PropTypes.string,
    extensionId: PropTypes.string.isRequired,
    onConnected: PropTypes.func.isRequired,
    onConnecting: PropTypes.func.isRequired,
    onUpdatePeripheral: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default ScanningStep;
