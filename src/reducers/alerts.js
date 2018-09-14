const CLOSE_ALERT = 'scratch-gui/alerts/CLOSE_ALERT';
const SHOW_ALERT = 'scratch-gui/alerts/SHOW_ALERT';

const initialState = {
    message: 'Peripheral error',
    visible: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SHOW_ALERT:
        return Object.assign({}, state, {
            visible: true
        });
    case CLOSE_ALERT:
        return Object.assign({}, state, {
            message: 'Closing alert!'
        });
    default:
        return state;
    }
};

const closeAlert = function () {
    return {type: CLOSE_ALERT};
};

const showAlert = function () {
    return {type: SHOW_ALERT};
};

export {
    reducer as default,
    initialState as alertsInitialState,
    closeAlert,
    showAlert
};
