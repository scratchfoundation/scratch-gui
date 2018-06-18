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
    handleCancel () {
        this.props.onCancel();
    }
    render () {
        return (
            <ConnectionModalComponent
                phase={this.state.phase}
                title={this.props.id}
                vm={this.props.vm}
                onCancel={this.handleCancel}
            />
        );
    }
}

ConnectionModal.propTypes = {
    id: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default ConnectionModal;
