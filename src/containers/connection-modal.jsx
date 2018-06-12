import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ConnectionModalComponent from '../components/connection-modal/connection-modal.jsx';

class ConnectionModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel'
        ]);
    }
    handleCancel () {
        this.props.onCancel();
    }
    render () {
        return (
            <ConnectionModalComponent
                title={this.props.title}
                onCancel={this.handleCancel}
            />
        );
    }
}

ConnectionModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default ConnectionModal;
