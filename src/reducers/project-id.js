const SET_PROJECT_ID = 'scratch-gui/project-id/SET_PROJECT_ID';

const initialState = 0;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case SET_PROJECT_ID:
        return action.id;
    default:
        return state;
    }
};

const setProjectId = function (id) {
    return {
        type: SET_PROJECT_ID,
        id: id
    };
};

export {
    reducer as default,
    initialState as projectIdInitialState,
    setProjectId
};
