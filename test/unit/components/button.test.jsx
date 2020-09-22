import React from 'react';
import {shallow} from 'enzyme';
import ButtonComponent from '../../../src/components/button/button';
import renderer from 'react-test-renderer';

describe('ButtonComponent', () => {
    test('matches snapshot', () => {
        const onClick = jest.fn();
        const component = renderer.create(
            <ButtonComponent onClick={onClick} />
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('triggers callback when clicked', () => {
        const onClick = jest.fn();
        const componentShallowWrapper = shallow(
            <ButtonComponent onClick={onClick} />
        );
        componentShallowWrapper.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });
});
