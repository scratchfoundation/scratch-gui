import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import platform from 'platform';

import PreviewModalComponent from '../components/preview-modal/preview-modal.jsx';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';

import {
    closePreviewInfo,
    openImportInfo
} from '../reducers/modals';

class PreviewModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleTryIt',
            'handleCancel',
            'handleViewProject'
        ]);

        this.state = {
            previewing: false
        };
    }
    handleTryIt () {
        this.setState({previewing: true});
        this.props.onTryIt();
    }
    handleCancel () {
        window.location.replace('https://scratch.mit.edu');
    }
    handleViewProject () {
        this.props.onViewProject();
    }
    supportedBrowser () {
        return !['IE', 'Opera', 'Opera Mini', 'Silk', 'Vivaldi'].includes(platform.name);
    }
    render () {
        return (this.supportedBrowser() ?
            <PreviewModalComponent
                previewing={this.state.previewing}
                onCancel={this.handleCancel}
                onTryIt={this.handleTryIt}
                onViewProject={this.handleViewProject}
            /> :
            <BrowserModalComponent
                onBack={this.handleCancel}
            />
        );
    }
}

PreviewModal.propTypes = {
    onTryIt: PropTypes.func,
    onViewProject: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onTryIt: () => {
        dispatch(closePreviewInfo());
    },
    onViewProject: () => {
        dispatch(closePreviewInfo());
        dispatch(openImportInfo());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviewModal);
