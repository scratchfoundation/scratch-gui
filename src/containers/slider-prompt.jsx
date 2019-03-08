import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import SliderPromptComponent from '../components/slider-prompt/slider-prompt.jsx';
import log from '../lib/log';

class SliderPrompt extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOk',
            'handleCancel',
            'handleChangeMin',
            'handleChangeMax',
            'handleKeyPress',
            'validate',
            'checkMustDecimal',
            'floaty'
        ]);
        this.state = {
            minValue: this.props.defaultMinValue,
            maxValue: this.props.defaultMaxValue
        };
        this.decimal = false;
    }
    handleKeyPress (event) {
        if (event.key === 'Enter') this.handleOk();
    }
    handleFocus (event) {
        event.target.select();
    }
    handleOk () {
        if (!this.validate()) {
            this.props.onCancel();
            return;
        }
        this.props.onOk(this.state.minValue, this.state.maxValue,
            this.checkMustDecimal(this.state.minValue, this.state.maxValue));
    }
    handleCancel () {
        this.props.onCancel();
    }
    floaty (value) {
        const decimal = this.checkMustDecimal(this.state.minValue, this.state.maxValue) || !this.props.isDiscrete;
        return `${value}${Number.isInteger(parseFloat(value)) && decimal ? '.0' : ''}`;
    }
    validate () {
        log.log(`${this.state.minValue} ${this.state.maxValue}`);
        return isFinite(this.state.minValue) && isFinite(this.state.maxValue);
    }
    checkMustDecimal (min, max) {
        if (min === '' || max === '') return false;
        return this.decimal ||
               !Number.isInteger(parseFloat(min)) ||
               !Number.isInteger(parseFloat(max));
    }
    handleChangeMin (e) {
        this.decimal = e.target.value.includes('.');
        this.setState({minValue: e.target.value ? e.target.value : 0});
    }
    handleChangeMax (e) {
        this.decimal = e.target.value.includes('.');
        this.setState({maxValue: e.target.value ? e.target.value : 0});
    }
    render () {
        return (
            <SliderPromptComponent
                defaultMaxValue={this.floaty(this.props.defaultMaxValue)}
                defaultMinValue={this.floaty(this.props.defaultMinValue)}
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
    isDiscrete: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired
};

export default SliderPrompt;
