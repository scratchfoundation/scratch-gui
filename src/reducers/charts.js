const UPDATE_CHARTS = 'scratch-gui/charts/UPDATE_CHARTS';
import {OrderedMap} from 'immutable';

const initialState = OrderedMap();

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case UPDATE_CHARTS:
        return action.charts;
    default:
        return state;
    }
};

const updateCharts = function (charts) {
    return {
        type: UPDATE_CHARTS,
        charts: charts,
    };
};

export {
    reducer as default,
    initialState as chartsInitialState,
    updateCharts
};
