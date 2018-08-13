import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import ImportModalComponent from '../components/import-modal/import-modal.jsx';

import {
    closeImportInfo,
    openPreviewInfo
} from '../reducers/modals';

class ImportModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleViewProject',
            'handleCancel',
            'handleChange',
            'handleGoBack',
            'handleKeyPress'
        ]);

        this.state = {
            inputValue: '',
            hasValidationError: false,
            errorMessage: ''
        };
    }
    handleKeyPress (event) {
        if (event.key === 'Enter') this.handleViewProject();
    }
    handleViewProject () {
        const inputValue = this.state.inputValue;
        const projectId = this.validate(inputValue);

        if (projectId) {
            const projectLink = document.createElement('a');
            document.body.appendChild(projectLink);
            projectLink.href = `#${projectId}`;
            projectLink.click();
            document.body.removeChild(projectLink);
            this.props.onViewProject();
        } else {
            this.setState({
                hasValidationError: true,
                errorMessage: `invalidFormatError`});
        }
    }
    handleChange (e) {
        this.setState({inputValue: e.target.value, hasValidationError: false});
    }
    validate (input) {
        const urlMatches = input.match(/^(?:https?:\/\/)?scratch\.mit\.edu\/projects\/(\d+)/);
        if (urlMatches && urlMatches.length > 0) {
            return urlMatches[1];
        }
        const projectIdMatches = input.match(/^#?(\d+)$/);
        if (projectIdMatches && projectIdMatches.length > 0) {
            return projectIdMatches[1];
        }
        return null;
    }
    handleCancel () {
        this.props.onCancel();
    }
    handleGoBack () {
        this.props.onBack();
    }
    render () {
        return (
            <ImportModalComponent
                errorMessage={this.state.errorMessage}
                hasValidationError={this.state.hasValidationError}
                inputValue={this.state.inputValue}
                isRtl={this.props.isRtl}
                placeholder="scratch.mit.edu/projects/123456789"
                onCancel={this.handleCancel}
                onChange={this.handleChange}
                onGoBack={this.handleGoBack}
                onKeyPress={this.handleKeyPress}
                onViewProject={this.handleViewProject}
            />
        );
    }
}

ImportModal.propTypes = {
    isRtl: PropTypes.bool,
    onBack: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onViewProject: PropTypes.func
};

const mapStateToProps = state => ({
    isRtl: state.locales.isRtl
});

const mapDispatchToProps = dispatch => ({
    onBack: () => {
        dispatch(closeImportInfo());
        dispatch(openPreviewInfo());
    },
    onCancel: () => {
        dispatch(closeImportInfo());
    },
    onViewProject: () => {
        dispatch(closeImportInfo());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImportModal);
