import React from 'react';
import {mountWithIntl, shallowWithIntl, componentWithIntl} from '../../helpers/intl-helpers.jsx';
import SpriteSelectorItemComponent from '../../../src/components/sprite-selector-item/sprite-selector-item';
import DeleteButton from '../../../src/components/delete-button/delete-button';

describe('SpriteSelectorItemComponent', () => {
    let className;
    let costumeURL;
    let name;
    let onClick;
    let onDeleteButtonClick;
    let selected;
    let number;
    let details;

    // Wrap this in a function so it gets test specific states and can be reused.
    const getComponent = function () {
        return (
            <SpriteSelectorItemComponent
                className={className}
                costumeURL={costumeURL}
                details={details}
                name={name}
                number={number}
                selected={selected}
                onClick={onClick}
                onDeleteButtonClick={onDeleteButtonClick}
            />
        );
    };

    beforeEach(() => {
        className = 'ponies';
        costumeURL = 'https://scratch.mit.edu/foo/bar/pony';
        name = 'Pony sprite';
        onClick = jest.fn();
        onDeleteButtonClick = jest.fn();
        selected = true;
        // Reset to undefined since they are optional props
        number = undefined; // eslint-disable-line no-undefined
        details = undefined; // eslint-disable-line no-undefined
    });

    test('matches snapshot when selected', () => {
        const component = componentWithIntl(getComponent());
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('matches snapshot when given a number and details to show', () => {
        number = 5;
        details = '480 x 360';
        const component = componentWithIntl(getComponent());
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('does not have a close box when not selected', () => {
        selected = false;
        const wrapper = shallowWithIntl(getComponent());
        expect(wrapper.find(DeleteButton).exists()).toBe(false);
    });

    test('triggers callback when Box component is clicked', () => {
        // Use `mount` here because of the way ContextMenuTrigger consumes onClick
        const wrapper = mountWithIntl(getComponent());
        wrapper.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });

    test('triggers callback when CloseButton component is clicked', () => {
        const wrapper = shallowWithIntl(getComponent());
        wrapper.find(DeleteButton).simulate('click');
        expect(onDeleteButtonClick).toHaveBeenCalled();
    });

    test('it has a context menu with delete menu item and callback', () => {
        const wrapper = mountWithIntl(getComponent());
        const contextMenu = wrapper.find('ContextMenu');
        expect(contextMenu.exists()).toBe(true);

        contextMenu.find('[children="delete"]').simulate('click');
        expect(onDeleteButtonClick).toHaveBeenCalled();
    });
});
