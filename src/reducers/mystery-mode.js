const TOGGLE_MYSTERY_MODE = 'scratch-gui/mystery-mode/TOGGLE_MYSTERY_MODE';

const initialState = false;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case TOGGLE_MYSTERY_MODE:
        return !state;
    default:
        return state;
    }
};

const toggleMysteryMode = function () {
    return {
        type: TOGGLE_MYSTERY_MODE
    };
};

export {
    reducer as default,
    initialState as mysteryModeInitialState,
    toggleMysteryMode
};
