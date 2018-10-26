import React from 'react';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import AlertComponent from '../components/alerts/alert.jsx';
import {openConnectionModal} from '../reducers/modals';
import {setConnectionModalExtensionId} from '../reducers/connection-modal';

class Alert extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOnCloseAlert'
        ]);
    }
    handleOnCloseAlert () {
        this.props.onCloseAlert(this.props.index);
    }
    handleOnReconnect () {
        // this.props.vm.emit('')
        console.log('hello');
    }
    render () {
        const {
            index, // eslint-disable-line no-unused-vars
            iconURL,
            message
        } = this.props;
        return (
            <AlertComponent
                iconURL={iconURL}
                message={message}
                onCloseAlert={this.handleOnCloseAlert}
                onReconnect={this.handleOnReconnect}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onOpenConnectionModal: id => {
        dispatch(setConnectionModalExtensionId(id));
        dispatch(openConnectionModal());
    }
});

Alert.propTypes = {
    iconURL: PropTypes.string,
    index: PropTypes.number,
    message: PropTypes.string,
    onCloseAlert: PropTypes.func.isRequired,
    onOpenConnectionModal: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default connect(
    mapDispatchToProps
)(Alerts);
