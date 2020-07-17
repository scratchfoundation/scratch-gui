import React from 'react';
import {shallow} from 'enzyme';
import SliderPrompt from '../../../src/containers/slider-prompt.jsx';
import SliderPromptComponent from '../../../src/components/slider-prompt/slider-prompt.jsx';

describe('Slider Prompt Container', () => {
    let onCancel;
    let onOk;

    beforeEach(() => {
        onCancel = jest.fn();
        onOk = jest.fn();
    });

    test('Min/max are shown with decimal when isDiscrete is false', () => {
        const wrapper = shallow(
            <SliderPrompt
                isDiscrete={false}
                maxValue={100}
                minValue={0}
                onCancel={onCancel}
                onOk={onOk}
            />
        );
        const componentProps = wrapper.find(SliderPromptComponent).props();
        expect(componentProps.minValue).toBe('0.00');
        expect(componentProps.maxValue).toBe('100.00');
    });

    test('Min/max are NOT shown with decimal when isDiscrete is true', () => {
        const wrapper = shallow(
            <SliderPrompt
                isDiscrete
                maxValue={100}
                minValue={0}
                onCancel={onCancel}
                onOk={onOk}
            />
        );
        const componentProps = wrapper.find(SliderPromptComponent).props();
        expect(componentProps.minValue).toBe('0');
        expect(componentProps.maxValue).toBe('100');
    });

    test('Entering a number with a decimal submits with isDiscrete=false', () => {
        const wrapper = shallow(
            <SliderPrompt
                isDiscrete
                maxValue={100}
                minValue={0}
                onCancel={onCancel}
                onOk={onOk}
            />
        );
        const componentProps = wrapper.find(SliderPromptComponent).props();
        componentProps.onChangeMin({target: {value: '1.0'}});
        componentProps.onOk();
        expect(onOk).toHaveBeenCalledWith(1, 100, false);
    });

    test('Entering integers submits with isDiscrete=true', () => {
        const wrapper = shallow(
            <SliderPrompt
                isDiscrete={false}
                maxValue={100.1}
                minValue={12.32}
                onCancel={onCancel}
                onOk={onOk}
            />
        );
        const componentProps = wrapper.find(SliderPromptComponent).props();
        componentProps.onChangeMin({target: {value: '1'}});
        componentProps.onChangeMax({target: {value: '2'}});
        componentProps.onOk();
        expect(onOk).toHaveBeenCalledWith(1, 2, true);
    });

    test('Enter button submits the form', () => {
        const wrapper = shallow(
            <SliderPrompt
                isDiscrete={false}
                maxValue={100.1}
                minValue={12.32}
                onCancel={onCancel}
                onOk={onOk}
            />
        );
        const componentProps = wrapper.find(SliderPromptComponent).props();
        componentProps.onChangeMin({target: {value: '1'}});
        componentProps.onChangeMax({target: {value: '2'}});
        componentProps.onKeyPress({key: 'Enter'});
        expect(onOk).toHaveBeenCalledWith(1, 2, true);
    });

    test('Validates number-ness before submitting', () => {
        const wrapper = shallow(
            <SliderPrompt
                isDiscrete={false}
                maxValue={100.1}
                minValue={12.32}
                onCancel={onCancel}
                onOk={onOk}
            />
        );
        const componentProps = wrapper.find(SliderPromptComponent).props();
        componentProps.onChangeMin({target: {value: 'hello'}});
        componentProps.onOk();
        expect(onOk).not.toHaveBeenCalled();
        expect(onCancel).toHaveBeenCalled();
    });
});
