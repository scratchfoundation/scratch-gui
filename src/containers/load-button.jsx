import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import LoadButtonComponent from '../components/load-button/load-button.jsx';

class LoadButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setFileInput',
            'handleChange',
            'handleClick'
        ]);
    }
    handleChange (e) {
        const reader = new FileReader();
        reader.onload = () => this.props.loadProject(reader.result);
        reader.readAsText(e.target.files[0]);
    }
    handleClick () {
        this.fileInput.click();
    }
    setFileInput (input) {
        this.fileInput = input;
    }
    render () {
        const {
            loadProject, // eslint-disable-line no-unused-vars
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
    loadProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    loadProject: state.vm.fromJSON.bind(state.vm)
});

module.exports = connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(LoadButton);
