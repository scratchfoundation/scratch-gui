const CLOSE_ALERT = 'scratch-gui/alerts/CLOSE_ALERT';

const initialState = {
    message: 'testing alerts!!',
    visible: true
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case CLOSE_ALERT:
        return Object.assign({}, state, {
            message: 'closing alert!'
        });
    default:
        return state;
    }
};

const closeAlert = function () {
    return {type: CLOSE_ALERT};
};

export {
    reducer as default,
    initialState as alertsInitialState,
    closeAlert
};
