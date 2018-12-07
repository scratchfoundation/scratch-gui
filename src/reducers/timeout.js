const SET_AUTOSAVE_TIMEOUT_ID = 'timeout/SET_AUTOSAVE_TIMEOUT_ID';

const initialState = {
    autoSaveTimeoutId: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_AUTOSAVE_TIMEOUT_ID:
        return Object.assign({}, state, {
            autoSaveTimeoutId: action.id
        });
    default:
        return state;
    }
};
const setAutoSaveTimeoutId = id => ({
    type: SET_AUTOSAVE_TIMEOUT_ID,
    id
});

export {
    reducer as default,
    initialState as timeoutInitialState,
    setAutoSaveTimeoutId
};
