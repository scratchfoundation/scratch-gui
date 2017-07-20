const UPDATE_MONITORS = 'scratch-gui/monitors/UPDATE_MONITORS';
import {OrderedMap} from 'immutable';

const initialState = OrderedMap();

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case UPDATE_MONITORS:
        return action.monitors;
    default:
        return state;
    }
};

reducer.updateMonitors = function (monitors) {
    return {
        type: UPDATE_MONITORS,
        monitors: monitors,
        meta: {
            throttle: 30
        }
    };
};

module.exports = reducer;
