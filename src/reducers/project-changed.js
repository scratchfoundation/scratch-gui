const SET_PROJECT_CHANGED = 'scratch-gui/project-changed/SET_PROJECT_CHANGED';

const initialState = false;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_PROJECT_CHANGED:
        return action.changed;
    default:
        return state;
    }
};
const setProjectChanged = () => ({
    type: SET_PROJECT_CHANGED,
    changed: true
});
const setProjectUnchanged = () => ({
    type: SET_PROJECT_CHANGED,
    changed: false
});

export {
    reducer as default,
    initialState as projectChangedInitialState,
    setProjectChanged,
    setProjectUnchanged
};
