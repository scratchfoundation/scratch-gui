import extensionData from '../lib/libraries/extensions/index.jsx';

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
        const newAlert = {message: action.data.message};
        const extensionId = action.data.extensionId;
        newAlert.showReconnect = false;
        if (extensionId) { // if it's an extension
            const extension = extensionData.find(ext => ext.extensionId === extensionId);
            if (extension && extension.name) {
                // TODO: is this the right place to assemble this message?
                newAlert.extensionId = extensionId;
                newAlert.message = `${newAlert.message} ${extension.name}.`;
                newAlert.showReconnect = true;
            }
            if (extension && extension.smallPeripheralImage) {
                newAlert.iconURL = extension.smallPeripheralImage;
            }
        }
        // TODO: add cases for other kinds of alerts here?
        newList.push(newAlert);
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

/**
 * Function to close an alert with the given index.
 *
 * @param {object} index - the index of the alert to close.
 * @return {object} - an object to be passed to the reducer.
 */
const closeAlert = function (index) {
    return {
        type: CLOSE_ALERT,
        index
    };
};

/**
 * Function to show an alert with the given input data.
 *
 * @param {object} data - data for the alert
 * @param {string} data.message - message for the alert
 * @param {string} data.extensionId - extension ID for the alert
 * @return {object} - an object to be passed to the reducer.
 */
const showAlert = function (data) {
    return {
        type: SHOW_ALERT,
        data
    };
};

export {
    reducer as default,
    initialState as alertsInitialState,
    closeAlert,
    showAlert
};
