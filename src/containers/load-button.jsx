import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import LoadButtonComponent from '../components/load-button/load-button.jsx';
import {setProjectData} from '../reducers/vm';

class LoadButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setFileInput',
            'handleChange',
            'handleClick'
        ]);
        this.state = {
            loadingError: false,
            errorMessage: ''
        };
    }
    handleChange (e) {
        const reader = new FileReader();
        reader.onload = () => this.props.setNewProjectData(reader.result, null);
        reader.readAsArrayBuffer(e.target.files[0]);
    }
    handleClick () {
        this.fileInput.click();
    }
    setFileInput (input) {
        this.fileInput = input;
    }
    render () {
        if (this.state.loadingError) throw new Error(`Failed to load project: ${this.state.errorMessage}`);
        const {
            setNewProjectData, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <LoadButtonComponent
                inputRef={this.setFileInput}
                onChange={this.handleChange}
                onClick={this.handleClick}
                {...props}
            />
        );
    }
}

LoadButton.propTypes = {
    setNewProjectData: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    setNewProjectData: (projectData, projectId) => dispatch(setProjectData(projectData, projectId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadButton);
