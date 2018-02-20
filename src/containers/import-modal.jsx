import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import platform from 'platform';
// import RegExp from 'regex';

import ImportModalComponent from '../components/import-modal/import-modal.jsx';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';

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
            inputValue: ''
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
            this.handleCancel();
        } else {
            console.log("Error")
        }

        // window.
        // this.setState({previewing: true});
        // this.props.onViewProject();
    }
    handleChange (e) {
        this.setState({inputValue: e.target.value});
    }
    validate (input) {
        //const regex1 = RegExp(
        //const regex2 = RegExp('^scratch.mit.edu/projects/');
        const matches = input.match(/^(https:\/\/)?scratch\.mit\.edu\/projects\/(\d+)(\/?)$/);
        if (matches != null && matches.length > 0) {
            console.log("Project ID: " + matches[2]);
            return matches[2];
        }
        return null;
    }
    handleCancel () {
        // this.setState({previewing: false});
        this.props.onCancel();
    }
    handleGoBack () {
        window.location.replace('https://scratch.mit.edu');
    }
    supportedBrowser () {
        if (platform.name === 'IE') {
            return false;
        }
        return true;
    }
    render () {
        return (this.supportedBrowser() ?
            <ImportModalComponent
                onCancel={this.handleCancel}
                onViewProject={this.handleViewProject}
                placeholder='scratch.mit.edu/projects/123456789'
                onKeyPress={this.handleKeyPress}
                onChange={this.handleChange}
            /> :
            <BrowserModalComponent
                onBack={this.handleGoBack}
            />
        );
    }
}

ImportModal.propTypes = {
    onViewProject: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
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
