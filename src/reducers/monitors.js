const UPDATE_MONITORS = 'scratch-gui/monitors/UPDATE_MONITORS';

const initialState = [];

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    // Adds or updates monitors
    case UPDATE_MONITORS:
        return [...action.monitors, ...state];
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
