import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ConnectionModalComponent from '../components/connection-modal/connection-modal.jsx';
import VM from 'scratch-vm';

class ConnectionModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAbortConnecting',
            'handleConnected',
            'handleConnecting',
            'handleError'
        ]);
        this.state = {
            phase: 'scanning'
        };
    }
    componentDidMount () {
        this.props.vm.on('PERIPHERAL_CONNECTED', this.handleConnected);
        this.props.vm.on('PERIPHERAL_ERROR', this.handleError);
    }
    componentWillUnmount () {
        this.props.vm.removeListener('PERIPHERAL_CONNECTED', this.handleConnected);
        this.props.vm.removeListener('PERIPHERAL_ERROR', this.handleError);
    }
    handleConnecting (peripheralId) {
        this.props.vm.connectToPeripheral(this.props.extensionId, peripheralId);
        this.setState({
            phase: 'connecting'
        });
    }
    handleError () {
        this.setState({
            phase: 'error'
        });
    }
    handleAbortConnecting () {
        // @todo: abort the current device connection process in the VM
        this.setState({
            phase: 'scanning'
        });
    }
    handleConnected () {
        this.setState({
            phase: 'connected'
        });
    }
    render () {
        return (
            <ConnectionModalComponent
                extensionId={this.props.extensionId}
                phase={this.state.phase}
                title={this.props.extensionId}
                vm={this.props.vm}
                onAbortConnecting={this.handleAbortConnecting}
                onCancel={this.props.onCancel}
                onConnected={this.handleConnected}
                onConnecting={this.handleConnecting}
            />
        );
    }
}

ConnectionModal.propTypes = {
    extensionId: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default ConnectionModal;
