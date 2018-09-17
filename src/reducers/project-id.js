const SET_PROJECT_ID = 'scratch-gui/project-id/SET_PROJECT_ID';

const initialState = null;

const newDefaultProjectId = 0; // hardcoded id of default project

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case SET_PROJECT_ID:
        // debugger;
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

const setNewDefaultProject = function () {
    return {
        type: SET_PROJECT_ID,
        id: newDefaultProjectId
    };
};

export {
    reducer as default,
    initialState as projectIdInitialState,
    newDefaultProjectId,
    setProjectId,
    setNewDefaultProject
};
