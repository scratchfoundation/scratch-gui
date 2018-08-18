import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import PromptComponent from '../components/prompt/prompt.jsx';

class Prompt extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOk',
            'handleOptionSelection',
            'handleCancel',
            'handleChange',
            'handleKeyPress'
        ]);
        this.state = {
            inputValue: '',
            optionSelection: null
        };
    }
    handleKeyPress (event) {
        if (event.key === 'Enter') this.handleOk();
    }
    handleOk () {
        this.props.onOk(this.state.inputValue, this.state.optionSelection);
    }
    handleCancel () {
        this.props.onCancel();
    }
    handleChange (e) {
        this.setState({inputValue: e.target.value});
    }
    handleOptionSelection (e) {
        this.setState({optionSelection: e.target.value});
    }
    render () {
        return (
            <PromptComponent
                isStage={this.props.isStage}
                label={this.props.label}
                placeholder={this.props.placeholder}
                showMoreOptions={this.props.showMoreOptions}
                title={this.props.title}
                onCancel={this.handleCancel}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                onOk={this.handleOk}
                onOptionSelection={this.handleOptionSelection}
            />
        );
    }
}

Prompt.propTypes = {
    isStage: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    showMoreOptions: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
};

export default Prompt;
