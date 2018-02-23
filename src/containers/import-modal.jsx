import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import ImportModalComponent from '../components/import-modal/import-modal.jsx';

import {
    closeImportInfo
} from '../reducers/modals';

class ImportModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleViewProject',
            'handleCancel',
            'handleKeyPress',
            'handleChange'
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
            // TODO handle error messages and error states
            this.setState({
                hasValidationError: true,
                errorMessage: `invalidFormatError`});
        }
    }
    handleChange (e) {
        this.setState({inputValue: e.target.value, hasValidationError: false});
    }
    validate (input) {
        const urlMatches = input.match(/^(https:\/\/)?scratch\.mit\.edu\/projects\/(\d+)(\/?|(\/#((editor)|(fullscreen)|(player)))?)$/);
        if (urlMatches && urlMatches.length > 0) {
            return urlMatches[2];
        }
        const projectIdMatches = input.match(/^(#?)(\d+)$/);
        if (projectIdMatches && projectIdMatches.length > 0) {
            return projectIdMatches[2];
        }
        return null;
    }
    handleCancel () {
        this.props.onCancel();
    }
    handleGoBack () {
        // TODO what should the go back button actually do? Should it bring the preview modal
        // back up or just close this modal, or go back to scratch?
        window.location.replace('https://scratch.mit.edu');
    }
    // TODO not sure if we need this, since it shouldn't be possible to bring up this
    // modal without first going through the preview modal
    render () {
        return (
            <ImportModalComponent
                errorMessage={this.state.errorMessage}
                hasValidationError={this.state.hasValidationError}
                inputValue={this.state.inputValue}
                placeholder="scratch.mit.edu/projects/123456789"
                onCancel={this.handleCancel}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                onViewProject={this.handleViewProject}
            />
        );
    }
}

ImportModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onViewProject: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onViewProject: () => {
        dispatch(closeImportInfo());
    },
    onCancel: () => {
        dispatch(closeImportInfo());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImportModal);
