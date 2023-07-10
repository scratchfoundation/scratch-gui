import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ScanningStepComponent, {PHASES} from '../components/connection-modal/auto-scanning-step.jsx';
import VM from 'scratch-vm';

/**
 * Scan for a peripheral and automatically connect to the first one found.
 * Supports "prescan" and "pressbutton" phases.
 * The "prescan" phase displays a message like "Have your device nearby, then begin searching" and waits for the user
 * to choose to continue.
 * The "pressbutton" phase displays a message like "Press the button on your device" until the scan finds a result,
 * which in the case of an external peripheral list is when the user has chosen a peripheral.
 */
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
        // @todo: stop the peripheral scan here
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

        // USER_PICKED_PERIPHERAL means the user picked the peripheral outside of this UI, say through the Android
        // CDM, in which case it'll pass a list of exactly one peripheral which we should connect to. If the user
        // canceled the CDM dialog, we'll get an empty list and we shouldn't connect. That already matches the
        // behavior of handlePeripheralListUpdate, so we just reuse that handler.
        this.props.vm.on(
            'USER_PICKED_PERIPHERAL', this.handlePeripheralListUpdate);
    }
    unbindPeripheralUpdates () {
        this.props.vm.removeListener(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
        this.props.vm.removeListener(
            'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
        this.props.vm.removeListener(
            'USER_PICKED_PERIPHERAL', this.handlePeripheralListUpdate);
    }
    handleRefresh () {
        // @todo: stop the peripheral scan here, it is more important for auto scan
        // due to timeout and cancellation
        this.setState({
            phase: PHASES.prescan
        });
        this.unbindPeripheralUpdates();
    }
    handleStartScan () {
        this.bindPeripheralUpdates();
        this.props.vm.scanForPeripheral(this.props.extensionId);
        this.setState({
            phase: PHASES.pressbutton
        });

    }
    render () {
        return (
            <ScanningStepComponent
                connectionIconURL={this.props.connectionIconURL}
                connectionTipIconURL={this.props.connectionTipIconURL}
                phase={this.state.phase}
                title={this.props.extensionId}
                onRefresh={this.handleRefresh}
                onStartScan={this.handleStartScan}
                onUpdatePeripheral={this.props.onUpdatePeripheral}
                prescanMessage={this.props.prescanMessage}
                scanBeginMessage={this.props.scanBeginMessage}
            />
        );
    }
}

AutoScanningStep.propTypes = {
    connectionIconURL: PropTypes.string,
    connectionTipIconURL: PropTypes.string,
    extensionId: PropTypes.string.isRequired,
    onConnecting: PropTypes.func.isRequired,
    onUpdatePeripheral: PropTypes.func,
    prescanMessage: PropTypes.node,
    scanBeginMessage: PropTypes.node,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default AutoScanningStep;
