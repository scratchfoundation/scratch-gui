import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ScanningStepComponent, {PHASES} from '../components/connection-modal/auto-scanning-step.jsx';
import VM from 'scratch-vm';

class AutoScanningStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handlePeripheralListUpdate',
            'handlePeripheralScanTimeout',
            'handleStartScan',
            'handleRefresh'
        ]);
        this.state = {
            phase: PHASES.prescan
        };
    }
    componentWillUnmount () {
        // @todo: stop the device scan here
        this.unbindPeripheralUpdates();
    }
    handlePeripheralScanTimeout () {
        this.setState({
            phase: PHASES.notfound
        });
        this.unbindPeripheralUpdates();
    }
    handlePeripheralListUpdate (newList) {
        // TODO: sort peripherals by signal strength? so they don't jump around
        const peripheralArray = Object.keys(newList).map(id =>
            newList[id]
        );
        if (peripheralArray.length > 0) {
            this.props.onConnecting(peripheralArray[0].peripheralId);
        }
    }
    bindPeripheralUpdates () {
        this.props.vm.on(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
        this.props.vm.on(
            'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
    }
    unbindPeripheralUpdates () {
        this.props.vm.removeListener(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
        this.props.vm.removeListener(
            'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
    }
    handleRefresh () {
        // @todo: stop the device scan here, it is more important for auto scan
        // due to timeout and cancellation
        this.setState({
            phase: PHASES.prescan
        });
        this.unbindPeripheralUpdates();
    }
    handleStartScan () {
        this.bindPeripheralUpdates();
        this.props.vm.startDeviceScan(this.props.extensionId);
        this.setState({
            phase: PHASES.pressbutton
        });

    }
    render () {
        return (
            <ScanningStepComponent
                deviceButtonImage={this.props.deviceButtonImage}
                phase={this.state.phase}
                title={this.props.extensionId}
                onRefresh={this.handleRefresh}
                onStartScan={this.handleStartScan}
            />
        );
    }
}

AutoScanningStep.propTypes = {
    deviceButtonImage: PropTypes.string,
    extensionId: PropTypes.string.isRequired,
    onConnecting: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default AutoScanningStep;
