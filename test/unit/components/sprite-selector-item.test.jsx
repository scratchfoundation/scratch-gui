/* eslint-env jest */
import React from 'react'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';
// eslint-disable-next-line no-unused-vars
import SpriteSelectorItemComponent from '../../../src/components/sprite-selector-item/sprite-selector-item';
import CostumeCanvas from '../../../src/components/costume-canvas/costume-canvas';
import CloseButton from '../../../src/components/close-button/close-button'; // eslint-disable-line no-unused-vars
import renderer from 'react-test-renderer';

describe('SpriteSelectorItemComponent', () => {
    let className;
    let costumeURL;
    let name;
    let onClick;
    let onDeleteButtonClick;
    let selected;

    // Wrap this in a function so it gets test specific states and can be reused.
    const getComponent = function () {
        return <SpriteSelectorItemComponent
            className={className}
            costumeURL={costumeURL}
            name={name}
            onClick={onClick}
            onDeleteButtonClick={onDeleteButtonClick}
            selected={selected}/>;
    };

    beforeEach(() => {
        className = 'ponies';
        costumeURL = 'https://scratch.mit.edu/foo/bar/pony';
        name = 'Pony sprite';
        onClick = jest.fn();
        onDeleteButtonClick = jest.fn();
        selected = true;
    });

    test('matches snapshot when selected', () => {
        const component = renderer.create(getComponent());
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('does not have a close box when not selected', () => {
        selected = false;
        const componentShallowWrapper = shallow(getComponent());
        expect(componentShallowWrapper.find(CloseButton).exists()).toBe(false);
    });

    test('triggers callback when Box component is clicked', () => {
        const componentShallowWrapper = shallow(getComponent());
        componentShallowWrapper.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });

    test('triggers callback when CloseButton component is clicked', () => {
        const componentShallowWrapper = shallow(getComponent());
        componentShallowWrapper.find(CloseButton).simulate('click');
        expect(onDeleteButtonClick).toHaveBeenCalled();
    });

    test('creates a CostumeCanvas when a costume url is defined', () => {
        const componentShallowWrapper = shallow(getComponent());
        expect(componentShallowWrapper.find(CostumeCanvas).exists()).toBe(true);
    });

    test('does not create a CostumeCanvas when a costume url is null', () => {
        costumeURL = null;
        const componentShallowWrapper = shallow(getComponent());
        expect(componentShallowWrapper.find(CostumeCanvas).exists()).toBe(false);
    });
});
