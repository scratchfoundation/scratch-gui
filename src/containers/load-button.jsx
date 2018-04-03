import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import LoadButtonComponent from '../components/load-button/load-button.jsx';

import {
    openLoadingProject,
    closeLoadingProject
} from '../reducers/modals';

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
        this.props.openLoadingState();
        // Remove the hash if any (without triggering a hash change event or a reload)
        history.replaceState({}, document.title, '.');
        const reader = new FileReader();
        reader.onload = () => this.props.vm.loadProject(reader.result)
            .then(() => {
                this.props.closeLoadingState();
            })
            .catch(error => {
                this.setState({loadingError: true, errorMessage: error});
            });
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
            closeLoadingState, // eslint-disable-line no-unused-vars
            openLoadingState, // eslint-disable-line no-unused-vars
            vm, // eslint-disable-line no-unused-vars
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
    closeLoadingState: PropTypes.func,
    openLoadingState: PropTypes.func,
    vm: PropTypes.shape({
        loadProject: PropTypes.func
    })
};

const mapStateToProps = state => ({
    vm: state.vm
});

const mapDispatchToProps = dispatch => ({
    closeLoadingState: () => dispatch(closeLoadingProject()),
    openLoadingState: () => dispatch(openLoadingProject())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadButton);
