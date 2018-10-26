import React from 'react';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import AlertComponent from '../components/alerts/alert.jsx';
import {openConnectionModal} from '../reducers/modals';
import {setConnectionModalExtensionId} from '../reducers/connection-modal';

class Alert extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOnCloseAlert',
            'handleOnReconnect'
        ]);
    }
    handleOnCloseAlert () {
        this.props.onCloseAlert(this.props.index);
    }
    handleOnReconnect () {
        this.props.onOpenConnectionModal('ev3')
        console.log('handleOnReconnect');
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

const mapStateToProps = state => ({
    state: state
});

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
    onOpenConnectionModal: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alert);
