import React from 'react';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SB3Downloader from './sb3-downloader.jsx';
import AlertComponent from '../components/alerts/alert.jsx';
import {openConnectionModal} from '../reducers/modals';
import {setConnectionModalExtensionId} from '../reducers/connection-modal';
import {manualUpdateProject} from '../reducers/project-state';

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
            onSaveNow,
            showDownload,
            showReconnect,
            showSaveNow
        } = this.props;
        return (
            <SB3Downloader>{(_, downloadProject) => (
                <AlertComponent
                    closeButton={closeButton}
                    content={content}
                    extensionName={extensionName}
                    iconSpinner={iconSpinner}
                    iconURL={iconURL}
                    level={level}
                    message={message}
                    showDownload={showDownload}
                    showReconnect={showReconnect}
                    showSaveNow={showSaveNow}
                    onCloseAlert={this.handleOnCloseAlert}
                    onDownload={downloadProject}
                    onReconnect={this.handleOnReconnect}
                    onSaveNow={onSaveNow}
                />
            )}</SB3Downloader>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onOpenConnectionModal: id => {
        dispatch(setConnectionModalExtensionId(id));
        dispatch(openConnectionModal());
    },
    onSaveNow: () => {
        dispatch(manualUpdateProject());
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
    onSaveNow: PropTypes.func,
    showDownload: PropTypes.bool,
    showReconnect: PropTypes.bool,
    showSaveNow: PropTypes.bool
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alert);
