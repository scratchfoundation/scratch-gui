const UPDATE_MONITORS = 'scratch-gui/monitors/UPDATE_MONITORS';

const initialState = [];

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    // Adds or updates monitors
    case UPDATE_MONITORS:
        let newState = [...state];
        let updated = false;
        for (let i = 0; i < action.monitors.length; i++) {
            for (let j = 0; j < state.length; j++) {
                if (action.monitors[i].id == state[j].id) {
                    newState[j] = action.monitors[i];
                    updated = true;
                    continue;
                }
            }
            if (!updated) {
                newState.push(action.monitors[i]);
            }
            updated = false;
        }
        return newState;
    default:
        return state;
    }
};

reducer.updateMonitors = function (monitors) {
    return {
        type: UPDATE_MONITORS,
        monitors: monitors,
        meta: {
            throttle: 100
        }
    };
};

module.exports = reducer;
