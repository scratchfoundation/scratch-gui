// TODO: add tests of extension alerts

/* eslint-env jest */
import {AlertTypes, AlertLevels} from '../../../src/lib/alerts/index.jsx';
import alertsReducer, {
    closeAlert,
    closeAlertWithId,
    filterInlineAlerts,
    filterPopupAlerts,
    showStandardAlert
} from '../../../src/reducers/alerts';

test('initialState', () => {
    let defaultState;
    /* alertsReducer(state, action) */
    expect(alertsReducer(defaultState, {type: 'anything'})).toBeDefined();
    expect(alertsReducer(defaultState, {type: 'anything'}).visible).toBe(true);
    expect(alertsReducer(defaultState, {type: 'anything'}).alertsList).toEqual([]);
});

test('create one standard alert', () => {
    let defaultState;
    const action = showStandardAlert('creating');
    const resultState = alertsReducer(defaultState, action);
    expect(resultState.alertsList.length).toBe(1);
    expect(resultState.alertsList[0].alertId).toBe('creating');
    expect(resultState.alertsList[0].alertType).toBe(AlertTypes.STANDARD);
    expect(resultState.alertsList[0].level).toBe(AlertLevels.SUCCESS);
});

test('add several standard alerts', () => {
    const initialState = {
        visible: true,
        alertsList: [
            {
                alertId: 'saving',
                alertType: AlertTypes.INLINE,
                level: AlertLevels.SUCCESS,
                content: null,
                iconURL: '/no_image_here.jpg'
            }
        ]
    };
    const action = showStandardAlert('creating');
    let resultState = alertsReducer(initialState, action);
    resultState = alertsReducer(resultState, action);
    resultState = alertsReducer(resultState, action);
    expect(resultState.alertsList.length).toBe(1);
    expect(resultState.alertsList[0].alertType).toBe(AlertTypes.STANDARD);
    expect(resultState.alertsList[0].iconURL).not.toBe('/no_image_here.jpg');
    expect(resultState.alertsList[0].alertId).toBe('creating');
});

test('create one inline alert message', () => {
    let defaultState;
    const action = showStandardAlert('saving');
    const resultState = alertsReducer(defaultState, action);
    expect(resultState.alertsList.length).toBe(1);
    expect(resultState.alertsList[0].alertId).toBe('saving');
    expect(resultState.alertsList[0].alertType).toBe(AlertTypes.INLINE);
    expect(resultState.alertsList[0].level).toBe(AlertLevels.INFO);
});

test('can close alerts by index', () => {
    const initialState = {
        visible: true,
        alertsList: [
            {
                alertId: 'saving',
                alertType: AlertTypes.INLINE,
                level: AlertLevels.SUCCESS,
                content: null,
                iconURL: '/no_image_here.jpg'
            }
        ]
    };
    const closeAction = closeAlert(0);
    let resultState = alertsReducer(initialState, closeAction);
    expect(resultState.alertsList.length).toBe(0);
    const createAction = showStandardAlert('creating');
    resultState = alertsReducer(resultState, createAction);
    expect(resultState.alertsList.length).toBe(1);
    resultState = alertsReducer(initialState, closeAction);
    expect(resultState.alertsList.length).toBe(0);
    resultState = alertsReducer(resultState, createAction);
});

test('can close a single alert by id', () => {
    const initialState = {
        visible: true,
        alertsList: [
            {alertId: 'saving'},
            {alertId: 'creating'},
            {alertId: 'saving'},
            {alertId: 'saving'}
        ]
    };
    const closeAction = closeAlertWithId('saving');
    let resultState = alertsReducer(initialState, closeAction);
    expect(resultState.alertsList.map(a => a.alertId)).toEqual([
        'creating', 'saving', 'saving'
    ]);
    resultState = alertsReducer(resultState, closeAction);
    expect(resultState.alertsList.map(a => a.alertId)).toEqual([
        'creating', 'saving'
    ]);
    resultState = alertsReducer(resultState, closeAction);
    expect(resultState.alertsList.map(a => a.alertId)).toEqual([
        'creating'
    ]);
    resultState = alertsReducer(resultState, closeAction);
    expect(resultState.alertsList.map(a => a.alertId)).toEqual([
        'creating'
    ]);
});

test('related alerts can clear each other', () => {
    const initialState = {
        visible: true,
        alertsList: [
            {
                alertId: 'saving',
                alertType: AlertTypes.INLINE,
                level: AlertLevels.SUCCESS,
                content: null,
                iconURL: '/no_image_here.jpg'
            },
            {
                alertId: 'creating',
                alertType: AlertTypes.STANDARD,
                level: AlertLevels.SUCCESS,
                content: null,
                iconURL: '/no_image_here.jpg'
            }
        ]
    };
    const action = showStandardAlert('saveSuccess');
    const resultState = alertsReducer(initialState, action);
    expect(resultState.alertsList.length).toBe(2);
    expect(resultState.alertsList[0].alertId).toBe('creating');
    expect(resultState.alertsList[1].alertId).toBe('saveSuccess');
});

test('several related alerts can be cleared at once', () => {
    const initialState = {
        visible: true,
        alertsList: []
    };
    const createAction = showStandardAlert('creating');
    let resultState = alertsReducer(initialState, createAction);
    resultState = alertsReducer(resultState, createAction);
    resultState = alertsReducer(resultState, createAction);
    const createSuccessAction = showStandardAlert('createSuccess');
    resultState = alertsReducer(resultState, createSuccessAction);
    expect(resultState.alertsList.length).toBe(1);
    expect(resultState.alertsList[0].alertId).toBe('createSuccess');
});

test('filterInlineAlerts only returns inline type alerts', () => {
    const alerts = [
        {
            alertId: 'extension',
            alertType: AlertTypes.EXTENSION
        },
        {
            alertId: 'inline',
            alertType: AlertTypes.INLINE
        },
        {
            alertId: 'standard',
            alertType: AlertTypes.STANDARD
        },
        {
            alertId: 'non-existent type',
            alertType: 'wirly-burly'
        }
    ];

    const filtered = filterInlineAlerts(alerts);
    expect(filtered.length).toEqual(1);
    expect(filtered[0].alertId).toEqual('inline');
});

test('filterPopupAlerts returns standard and extension type alerts', () => {
    const alerts = [
        {
            alertId: 'extension',
            alertType: AlertTypes.EXTENSION
        },
        {
            alertId: 'inline',
            alertType: AlertTypes.INLINE
        },
        {
            alertId: 'standard',
            alertType: AlertTypes.STANDARD
        },
        {
            alertId: 'non-existent type',
            alertType: 'wirly-burly'
        }
    ];

    const filtered = filterPopupAlerts(alerts);
    expect(filtered.length).toEqual(2);
    expect(filtered[0].alertId).toEqual('extension');
    expect(filtered[1].alertId).toEqual('standard');
});
