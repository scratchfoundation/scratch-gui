const CLOSE_ALERT = 'scratch-gui/alerts/CLOSE_ALERT';
const SHOW_ALERT = 'scratch-gui/alerts/SHOW_ALERT';
const ON_RECONNECT = 'scratch-gui/alerts/ON_RECONNECT';

const initialState = {
    message: 'Alert',
    visible: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SHOW_ALERT:
        return Object.assign({}, state, {
            visible: true,
            message: action.message
        });
    case CLOSE_ALERT:
        return Object.assign({}, state, {
            visible: false
        });
    case ON_RECONNECT:
        return Object.assign({}, state, {
            visible: false
        });
    default:
        return state;
    }
};

const closeAlert = function () {
    return {type: CLOSE_ALERT};
};

const showAlert = function (message) {
    return {
        type: SHOW_ALERT,
        message
    };
};

const onReconnect = function () {
    return {type: ON_RECONNECT};
};

export {
    reducer as default,
    initialState as alertsInitialState,
    closeAlert,
    showAlert,
    onReconnect
};
