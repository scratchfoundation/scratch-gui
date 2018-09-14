const CLOSE_ALERT = 'scratch-gui/alerts/CLOSE_ALERT';
const VIEW_ALERT = 'scratch-gui/alerts/VIEW_ALERT';

const initialState = {
    message: 'testing alerts!!',
    visible: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case VIEW_ALERT:
        return Object.assign({}, state, {
            visible: true
        });
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

const viewAlert = function () {
    return {type: VIEW_ALERT};
};

export {
    reducer as default,
    initialState as alertsInitialState,
    closeAlert,
    viewAlert
};
