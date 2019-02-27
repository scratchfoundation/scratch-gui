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
            'handleChangeDecimalOption',
            'handleKeyPress'
        ]);
        this.state = {
            decimalSelected: this.props.defaultDecimal,
            minValue: this.props.defaultMinValue,
            maxValue: this.props.defaultMaxValue,
            mustDecimal: this.checkMustDecimal(this.props.defaultMinValue, this.props.defaultMaxValue)
        };
    }
    handleKeyPress (event) {
        if (event.key === 'Enter') this.handleOk();
    }
    handleFocus (event) {
        event.target.select();
    }
    handleOk () {
        this.props.onOk(this.state.minValue, this.state.maxValue,
            (this.state.decimalSelected || this.state.mustDecimal));
    }
    handleCancel () {
        this.props.onCancel();
    }
    checkMustDecimal (min, max) {
        if (min === '' || max === '') return false;
        return !Number.isInteger(parseFloat(min)) || !Number.isInteger(parseFloat(max));
    }
    handleChangeMin (e) {
        this.setState({
            minValue: parseFloat(e.target.value),
            mustDecimal: this.checkMustDecimal(e.target.value, this.state.maxValue)
        });
    }
    handleChangeMax (e) {
        this.setState({
            maxValue: parseFloat(e.target.value),
            mustDecimal: this.checkMustDecimal(this.state.minValue, e.target.value)
        });
    }
    handleChangeDecimalOption (e) {
        this.setState({decimalSelected: e.target.checked});
    }
    render () {
        return (
            <SliderPromptComponent
                decimalSelected={this.state.decimalSelected}
                defaultDecimal={this.props.defaultDecimal}
                defaultMaxValue={this.props.defaultMaxValue}
                defaultMinValue={this.props.defaultMinValue}
                mustDecimal={this.state.mustDecimal}
                onCancel={this.handleCancel}
                onChangeMax={this.handleChangeMax}
                onChangeMin={this.handleChangeMin}
                onDecimalOptionChange={this.handleChangeDecimalOption}
                onFocus={this.handleFocus}
                onKeyPress={this.handleKeyPress}
                onOk={this.handleOk}
            />
        );
    }
}

SliderPrompt.propTypes = {
    defaultDecimal: PropTypes.bool,
    defaultMaxValue: PropTypes.number,
    defaultMinValue: PropTypes.number,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired
};

export default SliderPrompt;
