const PropTypes = require('prop-types');
const React = require('react');
const bindAll = require('lodash.bindall');
const PromptComponent = require('../components/prompt/prompt.jsx');

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
    title: PropTypes.string.isRequired
};

module.exports = Prompt;
