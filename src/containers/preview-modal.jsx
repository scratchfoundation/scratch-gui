import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import tabletFullScreen from '../lib/tablet-full-screen';

import PreviewModalComponent from '../components/preview-modal/preview-modal.jsx';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';
import supportedBrowser from '../lib/supported-browser';

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

    /**
     * Conditionally returns an intro modal depending on the hideIntro prop
     * @returns { React.Component | null } null if hideIntro is true, the intro modal component otherwise
     */
    introIfShown () {
        if (this.props.hideIntro) {
            return null; // If hideIntro is true, the intro modal should not appear
        }

        // otherwise, show the intro modal
        return (<PreviewModalComponent
            isRtl={this.props.isRtl}
            previewing={this.state.previewing}
            onCancel={this.handleCancel}
            onTryIt={this.handleTryIt}
            onViewProject={this.handleViewProject}
        />);
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
        return (supportedBrowser() ?
            this.introIfShown() :
            <BrowserModalComponent
                isRtl={this.props.isRtl}
                onBack={this.handleCancel}
            />
        );
    }
}

PreviewModal.propTypes = {
    hideIntro: PropTypes.bool,
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
