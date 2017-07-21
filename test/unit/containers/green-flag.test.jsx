/* eslint-env jest */
import React from 'react'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';
import GreenFlag from '../../../src/containers/green-flag'; // eslint-disable-line no-unused-vars
import renderer from 'react-test-renderer';
import VM from 'scratch-vm';

describe('GreenFlag Container', () => {
    let vm;
    beforeEach(() => {
        vm = new VM();
    });

    test('renders active state', () => {
        const component = renderer.create(
            <GreenFlag active={true} vm={vm}/>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('renders inactive state', () => {
        const component = renderer.create(
            <GreenFlag active={false} vm={vm}/>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('triggers onClick when active', () => {
        const onClick = jest.fn();
        const componentShallowWrapper = shallow(
            <GreenFlag active={true} onClick={onClick} vm={vm}/>
        );
        componentShallowWrapper.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });

    // @todo: Test for handles key events.
    // @todo: Test project run start.
    // @todo: Test project run stop.
});
