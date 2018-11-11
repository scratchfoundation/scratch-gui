import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import tabletFullScreen from '../lib/tablet-full-screen';

import PreviewModalComponent from '../components/preview-modal/preview-modal.jsx';

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
        // try to run in fullscreen mode on tablets.
        tabletFullScreen();
        this.props.onTryIt();
    }
    handleCancel () {
        window.location.replace('https://scratch.mit.edu');
    }
    handleViewProject () {
        this.props.onViewProject();
    }
    render () {
        return (
            <PreviewModalComponent
                isRtl={this.props.isRtl}
                previewing={this.state.previewing}
                onCancel={this.handleCancel}
                onTryIt={this.handleTryIt}
                onViewProject={this.handleViewProject}
            />
        );
    }
}

PreviewModal.propTypes = {
    isRtl: PropTypes.bool,
    onTryIt: PropTypes.func,
    onViewProject: PropTypes.func
};

const mapStateToProps = state => ({
    isRtl: state.locales.isRtl
});

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
