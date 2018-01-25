import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import PromptComponent from '../components/prompt/prompt.jsx';

class Prompt extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOk',
            'handleCancel',
            'handleChange',
            'handleKeyPress'
        ]);
        this.state = {
            inputValue: ''
        };
    }
    handleKeyPress (event) {
        if (event.key === 'Enter') this.handleOk();
    }
    handleOk () {
        this.props.onOk(this.state.inputValue);
    }
    handleCancel () {
        this.props.onCancel();
    }
    handleChange (e) {
        this.setState({inputValue: e.target.value});
    }
    render () {
        return (
            <PromptComponent
                label={this.props.label}
                placeholder={this.props.placeholder}
                showMoreOptions={this.props.showMoreOptions}
                title={this.props.title}
                onCancel={this.handleCancel}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                onOk={this.handleOk}
            />
        );
    }
}

Prompt.propTypes = {
    label: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    showMoreOptions: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
};

export default Prompt;
