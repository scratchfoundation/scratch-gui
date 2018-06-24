import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ConnectionModalComponent from '../components/connection-modal/connection-modal.jsx';
import VM from 'scratch-vm';

class ConnectionModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel'
        ]);
        this.state = {
            phase: 'scanning'
        };
    }
    componentDidMount () {
        this.props.vm.on('PERIPHERAL_CONNECTED', () => {
            this.setState({
                phase: 'connected'
            });
        });
        this.props.vm.on('PERIPHERAL_ERROR', () => {
            this.setState({
                phase: 'error'
            });
        });
    }
    handleConnecting (peripheralId) {
        this.props.vm.connectToPeripheral(this.props.extensionId, peripheralId);
        this.setState({
            phase: 'connecting'
        });
    }
    handleConnected () {
        this.setState({
            phase: 'connected'
        });
    }
    handleCancel () {
        this.props.onCancel();
    }
    render () {
        return (
            <ConnectionModalComponent
                extensionId={this.props.extensionId}
                phase={this.state.phase}
                title={this.props.extensionId}
                vm={this.props.vm}
                onCancel={this.handleCancel}
                onConnected={this.handleConnected}
                onConnecting={this.handleConnecting.bind(this)}
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
