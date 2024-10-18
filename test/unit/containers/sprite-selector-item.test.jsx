import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import SpriteSelectorItemContainer from '../../../src/containers/sprite-selector-item';
import DeleteButton from '../../../src/components/delete-button/delete-button';
import DeleteConfirmationPrompt from '../../../src/components/delete-confirmation-prompt/delete-confirmation-prompt.jsx';
import VM from 'scratch-vm';

jest.mock('../../../src/components/delete-confirmation-prompt/delete-confirmation-prompt.jsx', () => jest.fn(() => null));
describe('SpriteSelectorItem Container', () => {
    const mockStore = configureStore();
    let className;
    let costumeURL;
    let name;
    let onClick;
    let dispatchSetHoveredSprite;
    let onDeleteButtonClick;
    let selected;
    let id;
    let store;
    let vm;
    // Wrap this in a function so it gets test specific states and can be reused.
    const getContainer = function (withDeleteConfirmation) {
        return (
            <Provider store={store}>
                <SpriteSelectorItemContainer
                    className={className}
                    costumeURL={costumeURL}
                    dispatchSetHoveredSprite={dispatchSetHoveredSprite}
                    id={id}
                    name={name}
                    selected={selected}
                    onClick={onClick}
                    onDeleteButtonClick={onDeleteButtonClick}
                    vm={vm}
                    withDeleteConfirmation={withDeleteConfirmation}
                />
            </Provider>
        );
    };

    beforeEach(() => {
        className = 'ponies';
        costumeURL = 'https://scratch.mit.edu/foo/bar/pony';
        id = 1337;
        name = 'Pony sprite';
        onClick = jest.fn();
        onDeleteButtonClick = jest.fn();
        dispatchSetHoveredSprite = jest.fn();
        selected = true;
        vm = new VM();
        store = mockStore({scratchGui: {
            hoveredTarget: {receivedBlocks: false, sprite: null},
            assetDrag: {dragging: false},
            vm
        }});
    });

    test('should delete the sprite, when called without `withDeleteConfirmation`', () => {
        const wrapper = mountWithIntl(getContainer());

        wrapper.find(DeleteButton).simulate('click');
        expect(DeleteConfirmationPrompt).not.toHaveBeenCalled();
        expect(onDeleteButtonClick).toHaveBeenCalledWith(1337);
    });

    test('should initiate sprite deletion, when called `withDeleteConfirmation`', () => {
        const wrapper = mountWithIntl(getContainer(true));

        expect(DeleteConfirmationPrompt).not.toHaveBeenCalled();

        wrapper.find(DeleteButton).simulate('click');

        expect(DeleteConfirmationPrompt).toHaveBeenCalled();
    });
});
