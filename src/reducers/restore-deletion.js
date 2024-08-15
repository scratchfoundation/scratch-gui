const RESTORE_UPDATE = 'scratch-gui/restore-deletion/RESTORE_UPDATE';

const initialState = {
    restoreFun: null,
    deletedItem: ''
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case RESTORE_UPDATE:
        return Object.assign({}, state, action.state);
    default:
        return state;
    }
};

const setRestore = function (state) {
    return {
        type: RESTORE_UPDATE,
        state: {
            restoreFun: state.restoreFun,
            deletedItem: state.deletedItem
        }
    };
};

export {
    reducer as default,
    initialState as restoreDeletionInitialState,
    setRestore
};
