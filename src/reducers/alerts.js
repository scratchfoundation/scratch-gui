const CLOSE_ALERT = 'scratch-gui/alerts/CLOSE_ALERT';
const SHOW_ALERT = 'scratch-gui/alerts/SHOW_ALERT';

const initialState = {
    visible: true,
    alertsList: []
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SHOW_ALERT: {
        const newList = state.alertsList.slice();
        newList.push({message: action.message});
        return Object.assign({}, state, {
            alertsList: newList
        });
    }
    case CLOSE_ALERT: {
        const newList = state.alertsList.slice();
        newList.splice(action.index, 1);
        return Object.assign({}, state, {
            alertsList: newList
        });
    }
    default:
        return state;
    }
};

const closeAlert = function (index) {
    return {
        type: CLOSE_ALERT,
        index
    };
};

const showAlert = function (message) {
    return {
        type: SHOW_ALERT,
        message
    };
};

export {
    reducer as default,
    initialState as alertsInitialState,
    closeAlert,
    showAlert
};
