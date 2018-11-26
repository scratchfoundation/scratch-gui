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
        this.props.onOpenConnectionModal(this.props.extensionId);
        this.handleOnCloseAlert();
    }
    render () {
        const {
            closeButton,
            content,
            extensionName,
            index, // eslint-disable-line no-unused-vars
            level,
            iconSpinner,
            iconURL,
            message,
            showReconnect
        } = this.props;
        return (
            <AlertComponent
                closeButton={closeButton}
                content={content}
                extensionName={extensionName}
                iconSpinner={iconSpinner}
                iconURL={iconURL}
                level={level}
                message={message}
                showReconnect={showReconnect}
                onCloseAlert={this.handleOnCloseAlert}
                onReconnect={this.handleOnReconnect}
            />
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onOpenConnectionModal: id => {
        dispatch(setConnectionModalExtensionId(id));
        dispatch(openConnectionModal());
    }
});

Alert.propTypes = {
    closeButton: PropTypes.bool,
    content: PropTypes.element,
    extensionId: PropTypes.string,
    extensionName: PropTypes.string,
    iconSpinner: PropTypes.bool,
    iconURL: PropTypes.string,
    index: PropTypes.number,
    level: PropTypes.string.isRequired,
    message: PropTypes.string,
    onCloseAlert: PropTypes.func.isRequired,
    onOpenConnectionModal: PropTypes.func,
    showReconnect: PropTypes.bool
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alert);
