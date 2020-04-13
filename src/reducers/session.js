const UPDATE_SESSION = 'session/UPDATE_SESSION';
const DELETE_SESSION = 'session/DELETE_SESSION';

const initState = {
    session: {}
};

const reducer = (state, action) => {
    if (typeof state === 'undefined') state = initState;
    switch (action.type) {
    case UPDATE_SESSION:
        return Object.assign({}, state, action.payload);
    case DELETE_SESSION:
        return Object.assign({}, state, action.payload);
    default:
        return state;
    }
};

const updateSession = obj => ({
    type: UPDATE_SESSION,
    payload: obj
});

const deleteSession = obj => ({
    type: DELETE_SESSION,
    payload: obj
});

export {
    reducer as default,
    updateSession,
    deleteSession
};
