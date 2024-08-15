import React from 'react';
import {shallow} from 'enzyme';
import ToggleButtons from '../../../src/components/toggle-buttons/toggle-buttons';

describe('ToggleButtons', () => {
    test('renders multiple buttons', () => {
        const component = shallow(<ToggleButtons
            buttons={[
                {
                    title: 'Button 1',
                    handleClick: () => {},
                    icon: 'Button 1 icon'
                },
                {
                    title: 'Button 2',
                    handleClick: () => {},
                    icon: 'Button 2 icon'
                }
            ]}
        />);

        const buttons = component.find('button');

        expect(buttons).toHaveLength(2);
        expect(buttons.get(0).props.title).toBe('Button 1');
        expect(buttons.get(1).props.title).toBe('Button 2');
    });

    test('calls correct click handler', () => {
        const onClick1 = jest.fn();
        const onClick2 = jest.fn();
        const component = shallow(<ToggleButtons
            buttons={[
                {
                    title: 'Button 1',
                    handleClick: onClick1,
                    icon: 'Button 1 icon'
                },
                {
                    title: 'Button 2',
                    handleClick: onClick2,
                    icon: 'Button 2 icon'
                }
            ]}
        />);
        const button2 = component.find('button[title="Button 2"]');
        button2.simulate('click');

        expect(onClick2).toHaveBeenCalled();
        expect(onClick1).not.toHaveBeenCalled();
    });
});
