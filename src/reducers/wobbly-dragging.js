const TOGGLE_WOBBLE = 'scratch-gui/mystery-mode/TOGGLE_WOBBLE';

const initialState = true;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case TOGGLE_WOBBLE:
        return !state;
    default:
        return state;
    }
};

const toggleWobblyDragging = function () {
    return {
        type: TOGGLE_WOBBLE
    };
};

export {
    reducer as default,
    initialState as wobblyDragInitialState,
    toggleWobblyDragging
};
