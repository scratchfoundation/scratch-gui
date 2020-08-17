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
            'handleKeyPress',
            'validates',
            'shouldBeDiscrete'
        ]);

        const {isDiscrete, minValue, maxValue} = this.props;
        this.state = {
            // For internal use, convert values to strings based on isDiscrete
            // This is because `<input />` always returns values as strings.
            minValue: isDiscrete ? minValue.toFixed(0) : minValue.toFixed(2),
            maxValue: isDiscrete ? maxValue.toFixed(0) : maxValue.toFixed(2)
        };
    }
    handleKeyPress (event) {
        if (event.key === 'Enter') this.handleOk();
    }
    handleOk () {
        const {minValue, maxValue} = this.state;
        if (!this.validates(minValue, maxValue)) {
            this.props.onCancel();
            return;
        }
        this.props.onOk(
            parseFloat(minValue),
            parseFloat(maxValue),
            this.shouldBeDiscrete(minValue, maxValue));
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
    shouldBeDiscrete (min, max) {
        return min.indexOf('.') + max.indexOf('.') === -2; // Both -1
    }
    validates (min, max) {
        return isFinite(min) && isFinite(max);
    }
    render () {
        return (
            <SliderPromptComponent
                maxValue={this.state.maxValue}
                minValue={this.state.minValue}
                onCancel={this.handleCancel}
                onChangeMax={this.handleChangeMax}
                onChangeMin={this.handleChangeMin}
                onKeyPress={this.handleKeyPress}
                onOk={this.handleOk}
            />
        );
    }
}

SliderPrompt.propTypes = {
    isDiscrete: PropTypes.bool,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired
};

SliderPrompt.defaultProps = {
    maxValue: 100,
    minValue: 0,
    isDiscrete: true
};

export default SliderPrompt;
