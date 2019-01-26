import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import SliderPromptComponent from '../components/slider-prompt/slider-prompt.jsx';

class SliderPrompt extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOk',
            'handleCancel',
            'handleChangeMin',
            'handleChangeMax',
            'handleKeyPress'
        ]);
        this.state = {
            minValue: 0,
            maxValue: 100
        };
    }
    handleKeyPress (event) {
        if (event.key === 'Enter') this.handleOk();
    }
    handleFocus (event) {
        event.target.select();
    }
    handleOk () {
        this.props.onOk(this.state.minValue, this.state.maxValue);
    }
    handleCancel () {
        this.props.onCancel();
    }
    handleChangeMin (e) {
        this.setState({minValue: e.target.value});
    }
    handleChangeMax (e) {
        this.setState({maxValue: e.target.value});
    }
    render () {
        return (
            <SliderPromptComponent
                defaultMaxValue={this.props.defaultMaxValue}
                defaultMinValue={this.props.defaultMinValue}
                onCancel={this.handleCancel}
                onChangeMax={this.handleChangeMax}
                onChangeMin={this.handleChangeMin}
                onFocus={this.handleFocus}
                onKeyPress={this.handleKeyPress}
                onOk={this.handleOk}
            />
        );
    }
}

SliderPrompt.propTypes = {
    defaultMaxValue: PropTypes.number,
    defaultMinValue: PropTypes.number,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired
};

export default SliderPrompt;
