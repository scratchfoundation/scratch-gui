import alertsData from '../lib/alerts/index.jsx';
import {AlertLevels} from '../lib/alerts/index.jsx';
import extensionData from '../lib/libraries/extensions/index.jsx';

const SHOW_STANDARD_ALERT = 'scratch-gui/alerts/SHOW_STANDARD_ALERT';
const SHOW_EXTENSION_ALERT = 'scratch-gui/alerts/SHOW_EXTENSION_ALERT';
const CLOSE_ALERT = 'scratch-gui/alerts/CLOSE_ALERT';

const initialState = {
    visible: true,
    // list of alerts, each with properties:
    // * content (optional): react element (a <FormattedMessage />)
    // * extentionId (optional): id string that identifies the extension
    // * iconURL (optional): string
    // * level (required): string, one of AlertLevels
    // * message (optional): string
    alertsList: []
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SHOW_STANDARD_ALERT: {
        const alertId = action.alertId;
        if (alertId) {
            const newAlert = {
                alertId: alertId,
                level: AlertLevels.WARN // default level
            };
            const alertData = alertsData.find(thisAlertData => thisAlertData.alertId === alertId);
            if (alertData) {
                let newList = state.alertsList.slice();
                newList = newList.filter(curAlert => (
                    !alertData.clearList || alertData.clearList.indexOf(curAlert.alertId)
                ));
                if (action.data && action.data.message) {
                    newAlert.message = action.data.message;
                }

                newAlert.content = alertData.content;
                newAlert.iconURL = alertData.iconURL;
                newAlert.iconSpinner = alertData.iconSpinner;
                newAlert.level = alertData.level;
                newList.push(newAlert);

                return Object.assign({}, state, {
                    alertsList: newList
                });
            }
        }
        return state; // if alert not found, show nothing
    }
    case SHOW_EXTENSION_ALERT: {
        const newList = state.alertsList.slice();
        const newAlert = {
            message: action.data.message,
            level: AlertLevels.WARN
        };
        const extensionId = action.data.extensionId;
        newAlert.showReconnect = false;
        newAlert.extensionId = extensionId;
        if (extensionId) { // if it's an extension
            const extension = extensionData.find(ext => ext.extensionId === extensionId);
            if (extension) {
                newAlert.showReconnect = true;
                if (extension.name) {
                    newAlert.content = extension.name;
                }
                if (extension.smallPeripheralImage) {
                    newAlert.iconURL = extension.smallPeripheralImage;
                }
            }
        }
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
 * Function to show an alert with the given alertId.
 *
 * @param {string} alertId - id string of the alert to show
 * @return {object} - an object to be passed to the reducer.
 */
const showStandardAlert = function (alertId) {
    return {
        type: SHOW_STANDARD_ALERT,
        alertId
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
const showExtensionAlert = function (data) {
    return {
        type: SHOW_EXTENSION_ALERT,
        data
    };
};

export {
    reducer as default,
    initialState as alertsInitialState,
    closeAlert,
    showExtensionAlert,
    showStandardAlert
};
