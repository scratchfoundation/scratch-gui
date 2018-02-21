import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import platform from 'platform';

import ImportModalComponent from '../components/import-modal/import-modal.jsx';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';

import log from '../lib/log';

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
            this.setState({
                hasValidationError: true,
                errorMessage: `Uh oh, that link doesn't look quite right.`});
            log.info('Invalid link error');
        }
    }
    handleChange (e) {
        this.setState({inputValue: e.target.value});
    }
    validate (input) {
        const matches = input.match(/^(https:\/\/)?scratch\.mit\.edu\/projects\/(\d+)(\/?)$/);
        if (matches && matches.length > 0) {
            log.info(`Project ID: ${matches[2]}`);
            return matches[2];
        }
        return null;
    }
    handleCancel () {
        this.props.onCancel();
    }
    handleGoBack () {
        window.location.replace('https://scratch.mit.edu');
    }
    // TODO not sure if we need this, since it shouldn't be possible to bring up this
    // modal without first going through the preview modal
    supportedBrowser () {
        if (platform.name === 'IE') {
            return false;
        }
        return true;
    }
    render () {
        return (this.supportedBrowser() ?
            <ImportModalComponent
                errorMessage={this.state.errorMessage}
                hasValidationError={this.state.hasValidationError}
                inputValue={this.state.inputValue}
                placeholder="scratch.mit.edu/projects/123456789"
                onCancel={this.handleCancel}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                onViewProject={this.handleViewProject}
            /> :
            <BrowserModalComponent
                onBack={this.handleGoBack}
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
