import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ConnectionModalComponent from '../components/connection-modal/connection-modal.jsx';
import VM from 'scratch-vm';

class ConnectionModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleScanning',
            'handleConnected',
            'handleConnecting',
            'handleDisconnect',
            'handleError'
        ]);
        this.state = {
            phase: 'scanning'
        };
    }
    componentDidMount () {
        this.props.vm.on('PERIPHERAL_CONNECTED', this.handleConnected);
        this.props.vm.on('PERIPHERAL_ERROR', this.handleError);

        // Check if we're already connected
        if (this.props.vm.getPeripheralIsConnected(this.props.extensionId)) {
            this.handleConnected();
        }

    }
    componentWillUnmount () {
        this.props.vm.removeListener('PERIPHERAL_CONNECTED', this.handleConnected);
        this.props.vm.removeListener('PERIPHERAL_ERROR', this.handleError);
    }
    handleScanning () {
        this.setState({
            phase: 'scanning'
        });
    }
    handleConnecting (peripheralId) {
        this.props.vm.connectToPeripheral(this.props.extensionId, peripheralId);
        this.setState({
            phase: 'connecting'
        });
    }
    handleDisconnect () {
        this.props.onStatusButtonUpdate(this.props.extensionId, 'not ready');
        this.props.vm.disconnectExtensionSession(this.props.extensionId);
        this.props.onCancel();
    }
    handleCancel () {
        // If we're not connected to a device, close the websocket so we stop scanning.
        if (!this.props.vm.getPeripheralIsConnected(this.props.extensionId)) {
            this.props.vm.disconnectExtensionSession(this.props.extensionId);
        }
        this.props.onCancel();
    }
    handleError () {
        this.props.onStatusButtonUpdate(this.props.extensionId, 'not ready');
        this.setState({
            phase: 'error'
        });
    }
    handleConnected () {
        this.props.onStatusButtonUpdate(this.props.extensionId, 'ready');
        this.setState({
            phase: 'connected'
        });
    }
    handleHelp () {
        // @todo: implement the help button
    }
    render () {
        return (
            <ConnectionModalComponent
                extensionId={this.props.extensionId}
                phase={this.state.phase}
                title={this.props.extensionId}
                vm={this.props.vm}
                onCancel={this.props.onCancel}
                onConnected={this.handleConnected}
                onConnecting={this.handleConnecting}
                onDisconnect={this.handleDisconnect}
                onHelp={this.handleHelp}
                onScanning={this.handleScanning}
            />
        );
    }
}

ConnectionModal.propTypes = {
    extensionId: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onStatusButtonUpdate: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default ConnectionModal;
