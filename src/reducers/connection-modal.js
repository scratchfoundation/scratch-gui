const SET_ID = 'scratch-gui/connection-modal/setId';

const initialState = {
    extensionId: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_ID:
        return Object.assign({}, state, {
            extensionId: action.extensionId
        });
    default:
        return state;
    }
};

const setConnectionModalExtensionId = function (extensionId) {
    return {
        type: SET_ID,
        extensionId: extensionId
    };
};

export {
    reducer as default,
    initialState as connectionModalInitialState,
    setConnectionModalExtensionId
};
