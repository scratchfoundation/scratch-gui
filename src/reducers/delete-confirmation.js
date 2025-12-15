const SET_DELETE_PENDING = "scratch-gui/delete-confirmation/SET_DELETE_PENDING";
const CLEAR_DELETE_PENDING =
    "scratch-gui/delete-confirmation/CLEAR_DELETE_PENDING";

const initialState = {
    pendingId: null,
    onConfirm: null,
};

const reducer = function (state, action) {
    if (typeof state === "undefined") state = initialState;
    switch (action.type) {
        case SET_DELETE_PENDING:
            return Object.assign({}, state, {
                pendingId: action.id,
                onConfirm: action.onConfirm,
            });
        case CLEAR_DELETE_PENDING:
            return Object.assign({}, state, {
                pendingId: null,
                onConfirm: null,
            });
        default:
            return state;
    }
};

const setDeletePending = function (id, onConfirm) {
    return {
        type: SET_DELETE_PENDING,
        id: id,
        onConfirm: onConfirm,
    };
};

const clearDeletePending = function () {
    return {
        type: CLEAR_DELETE_PENDING,
    };
};

export {
    reducer as default,
    initialState as deleteConfirmationInitialState,
    setDeletePending,
    clearDeletePending,
};
