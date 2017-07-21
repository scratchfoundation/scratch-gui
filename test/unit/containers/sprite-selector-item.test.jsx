/* eslint-env jest */
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux'; // eslint-disable-line no-unused-vars

import SpriteSelectorItem from '../../../src/containers/sprite-selector-item'; // eslint-disable-line no-unused-vars
import CloseButton from '../../../src/components/close-button/close-button'; // eslint-disable-line no-unused-vars

describe('SpriteSelectorItem Container', () => {
    const mockStore = configureStore();
    let className;
    let costumeURL;
    let name;
    let onClick;
    let onDeleteButtonClick;
    let selected;
    let id;
    let store;
    // Wrap this in a function so it gets test specific states and can be reused.
    const getContainer = function () {
        return <Provider store={store}><SpriteSelectorItem
            className={className}
            costumeURL={costumeURL}
            id={id}
            name={name}
            onClick={onClick}
            onDeleteButtonClick={onDeleteButtonClick}
            selected={selected}/></Provider>;
    };

    beforeEach(() => {
        store = mockStore();
        className = 'ponies';
        costumeURL = 'https://scratch.mit.edu/foo/bar/pony';
        id = 1337;
        name = 'Pony sprite';
        onClick = jest.fn();
        onDeleteButtonClick = jest.fn();
        selected = true;
        // Mock window.confirm() which is called when the close button is clicked.
        global.confirm = jest.fn(() => true);
    });

    test('should confirm if the user really wants to delete the sprite', () => {
        const wrapper = mount(getContainer());
        wrapper.find(CloseButton).simulate('click');
        expect(global.confirm).toHaveBeenCalled();
        expect(onDeleteButtonClick).toHaveBeenCalledWith(1337);
    });

    test('should not delete the sprite if the user cancels', () => {
        global.confirm = jest.fn(() => false);
        const wrapper = mount(getContainer());
        wrapper.find(CloseButton).simulate('click');
        expect(global.confirm).toHaveBeenCalled();
        expect(onDeleteButtonClick).not.toHaveBeenCalled();
    });
});
