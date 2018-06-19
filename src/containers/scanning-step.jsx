import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ScanningStepComponent from '../components/connection-modal/scanning-step.jsx';
import VM from 'scratch-vm';

class ScanningStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel'
        ]);
        this.state = {
            scanning: true,
            deviceList: []
        };
    }
    componentDidMount () {
        this.props.vm.startDeviceScan(this.props.extensionId);
        this.props.vm.on('PERIPHERAL_LIST_UPDATE', newList => {
            this.setState({deviceList: newList});
        });
    }
    componentWillUnmount () {
        // remove the listener
    }
    handleCancel () {
        this.props.onCancel();
    }
    handleScan () {
        this.props.onScan();
    }
    render () {
        return (
            <ScanningStepComponent
                deviceList={this.state.deviceList}
                phase={this.state.phase}
                title={this.props.extensionId}
                onCancel={this.handleCancel}
                onConnected={this.props.onConnected}
                onConnecting={this.props.onConnecting}
            />
        );
    }
}

ScanningStep.propTypes = {
    extensionId: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConnected: PropTypes.func.isRequired,
    onConnecting: PropTypes.func.isRequired,
    onScan: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default ScanningStep;
