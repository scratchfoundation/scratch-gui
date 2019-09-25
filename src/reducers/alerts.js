import alertsData from '../lib/alerts/index.jsx';
import {AlertTypes, AlertLevels} from '../lib/alerts/index.jsx';
import extensionData from '../lib/libraries/extensions/index.jsx';

const SHOW_ALERT = 'scratch-gui/alerts/SHOW_ALERT';
const SHOW_EXTENSION_ALERT = 'scratch-gui/alerts/SHOW_EXTENSION_ALERT';
const CLOSE_ALERT = 'scratch-gui/alerts/CLOSE_ALERT';
const CLOSE_ALERTS_WITH_ID = 'scratch-gui/alerts/CLOSE_ALERTS_WITH_ID';
const CLOSE_ALERT_WITH_ID = 'scratch-gui/alerts/CLOSE_ALERT_WITH_ID';

/**
 * Initial state of alerts reducer
 *
 * {bool} visible - whether the alerts are visible
 * {array} alertsList - list of alerts, each with properties:
 *  * alertType (required): one of AlertTypes
 *  * closeButton (optional): bool indicating that we should show close button
 *  * content (optional): react element (a <FormattedMessage />)
 *  * extentionId (optional): id string that identifies the extension
 *  * iconURL (optional): string
 *  * level (required): string, one of AlertLevels
 *  * message (optional): string
 *  * showReconnect (optional): bool
 */
const initialState = {
    visible: true,
    alertsList: []
};

const filterPopupAlerts = alertsList => (
    alertsList.filter(curAlert => (
        curAlert.alertType === AlertTypes.STANDARD ||
        curAlert.alertType === AlertTypes.EXTENSION
    ))
);

const filterInlineAlerts = alertsList => (
    alertsList.filter(curAlert => (
        curAlert.alertType === AlertTypes.INLINE
    ))
);

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SHOW_ALERT: { // intended to show standard and inline alerts, but not extensions
        const alertId = action.alertId;
        if (alertId) {
            const newAlert = {
                alertId: alertId,
                level: AlertLevels.WARN // default level
            };
            const alertData = alertsData.find(thisAlertData => thisAlertData.alertId === alertId);
            if (alertData) {
                const newList = state.alertsList.filter(curAlert => (
                    !alertData.clearList || alertData.clearList.indexOf(curAlert.alertId) === -1
                ));
                if (action.data && action.data.message) {
                    newAlert.message = action.data.message;
                }

                newAlert.alertType = alertData.alertType || AlertTypes.STANDARD;
                newAlert.closeButton = alertData.closeButton;
                newAlert.content = alertData.content;
                newAlert.iconURL = alertData.iconURL;
                newAlert.iconSpinner = alertData.iconSpinner;
                newAlert.level = alertData.level;
                newAlert.showDownload = alertData.showDownload;
                newAlert.showSaveNow = alertData.showSaveNow;

                newList.push(newAlert);
                return Object.assign({}, state, {
                    alertsList: newList
                });
            }
        }
        return state; // if alert not found, show nothing
    }
    case SHOW_EXTENSION_ALERT: {
        const extensionId = action.data.extensionId;
        if (extensionId) {
            const extension = extensionData.find(ext => ext.extensionId === extensionId);
            if (extension) {
                const newList = state.alertsList.slice();
                const newAlert = {
                    alertType: AlertTypes.EXTENSION,
                    closeButton: true,
                    extensionId: extensionId,
                    extensionName: extension.name,
                    iconURL: extension.connectionSmallIconURL,
                    level: AlertLevels.WARN,
                    showReconnect: true
                };
                newList.push(newAlert);

                return Object.assign({}, state, {
                    alertsList: newList
                });
            }
        }
        return state; // if alert not found, show nothing
    }
    case CLOSE_ALERT_WITH_ID:
    case CLOSE_ALERT: {
        if (action.alertId) {
            action.index = state.alertsList.findIndex(a => a.alertId === action.alertId);
            if (action.index === -1) return state;
        }
        const newList = state.alertsList.slice();
        newList.splice(action.index, 1);
        return Object.assign({}, state, {
            alertsList: newList
        });
    }
    case CLOSE_ALERTS_WITH_ID: {
        return Object.assign({}, state, {
            alertsList: state.alertsList.filter(curAlert => (
                curAlert.alertId !== action.alertId
            ))
        });
    }
    default:
        return state;
    }
};

/**
 * Action creator to close an alert with the given index.
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
 * Action creator to close all alerts with a given ID.
 *
 * @param {string} alertId - id string of the alert to close
 * @return {object} - an object to be passed to the reducer.
 */
const closeAlertsWithId = function (alertId) {
    return {
        type: CLOSE_ALERTS_WITH_ID,
        alertId
    };
};

/**
 * Action creator to close a single alert with a given ID.
 *
 * @param {string} alertId - id string of the alert to close
 * @return {object} - an object to be passed to the reducer.
 */
const closeAlertWithId = function (alertId) {
    return {
        type: CLOSE_ALERT_WITH_ID,
        alertId
    };
};

/**
 * Action creator to show an alert with the given alertId.
 *
 * @param {string} alertId - id string of the alert to show
 * @return {object} - an object to be passed to the reducer.
 */
const showStandardAlert = function (alertId) {
    return {
        type: SHOW_ALERT,
        alertId
    };
};

/**
 * Action creator to show an alert with the given input data.
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

/**
 * Function to dispatch showing an alert, with optional
 * timeout to make it close/go away.
 *
 * @param {object} dispatch - dispatch function
 * @param {string} alertId - the ID of the alert
 */
const showAlertWithTimeout = function (dispatch, alertId) {
    const alertData = alertsData.find(thisAlertData => thisAlertData.alertId === alertId);
    if (alertData) {
        dispatch(showStandardAlert(alertId));
        if (alertData.maxDisplaySecs) {
            setTimeout(() => {
                dispatch(closeAlertsWithId(alertId));
            }, alertData.maxDisplaySecs * 1000);
        }
    }
};

export {
    reducer as default,
    initialState as alertsInitialState,
    closeAlert,
    closeAlertWithId,
    filterInlineAlerts,
    filterPopupAlerts,
    showAlertWithTimeout,
    showExtensionAlert,
    showStandardAlert
};
