const UPDATE = 'scratch-gui/mic-indicator/UPDATE';

const initialState = false;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case UPDATE:
        return action.visible;
    default:
        return state;
    }
};

const updateMicIndicator = function (visible) {
    return {
        type: UPDATE,
        visible: visible
    };
};

export {
    reducer as default,
    initialState as micIndicatorInitialState,
    updateMicIndicator
};
