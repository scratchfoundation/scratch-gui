import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import SpriteSelectorItem from '../../../src/containers/sprite-selector-item';
import CloseButton from '../../../src/components/close-button/close-button';

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
    // Wrap this in a function so it gets test specific states and can be reused.
    const getContainer = function () {
        return (
            <Provider store={store}>
                <SpriteSelectorItem
                    className={className}
                    costumeURL={costumeURL}
                    dispatchSetHoveredSprite={dispatchSetHoveredSprite}
                    id={id}
                    name={name}
                    selected={selected}
                    onClick={onClick}
                    onDeleteButtonClick={onDeleteButtonClick}
                />
            </Provider>
        );
    };

    beforeEach(() => {
        store = mockStore({scratchGui: {
            hoveredTarget: {receivedBlocks: false, sprite: null},
            assetDrag: {dragging: false}
        }});
        className = 'ponies';
        costumeURL = 'https://scratch.mit.edu/foo/bar/pony';
        id = 1337;
        name = 'Pony sprite';
        onClick = jest.fn();
        onDeleteButtonClick = jest.fn();
        dispatchSetHoveredSprite = jest.fn();
        selected = true;
    });

    test('should delete the sprite', () => {
        const wrapper = mountWithIntl(getContainer());
        wrapper.find(CloseButton).simulate('click');
        expect(onDeleteButtonClick).toHaveBeenCalledWith(1337);
    });
});
