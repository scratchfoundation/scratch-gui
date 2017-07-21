/* eslint-env jest */
const React = require('react'); // eslint-disable-line no-unused-vars
const {shallow} = require('enzyme');
const ButtonComponent = require('../../../src/components/button/button'); // eslint-disable-line no-unused-vars
const renderer = require('react-test-renderer');

describe('ButtonComponent', () => {
    test('matches snapshot', () => {
        const onClick = jest.fn();
        const component = renderer.create(
            <ButtonComponent onClick={onClick}/>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('triggers callback when clicked', () => {
        const onClick = jest.fn();
        const componentShallowWrapper = shallow(
            <ButtonComponent onClick={onClick}/>
        );
        componentShallowWrapper.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });
});
