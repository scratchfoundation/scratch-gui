const UPDATE_MONITORS = 'scratch-gui/monitors/UPDATE_MONITORS';
const REMOVE_MONITORS = 'scratch-gui/monitors/REMOVE_MONITORS';
const ADD_MONITORS = 'scratch-gui/monitors/ADD_MONITORS';

const initialState = [];

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    let newState;
    switch (action.type) {
    case ADD_MONITORS:
        for (let i = 0; i < action.monitors.length; i++) {
            for (let j = 0; j < state.length; j++) {
                if (action.monitors[i].id === state[j].id) {
                    // If the ID is already in the list, return instead of adding
                    // a duplicate to remain idempotent
                    return state;
                }
            }
        }
        return [...state, ...action.monitors];
    // Adds or updates monitors
    case UPDATE_MONITORS:
        newState = [...state];
        for (let i = 0; i < action.monitors.length; i++) {
            for (let j = 0; j < state.length; j++) {
                if (action.monitors[i].id === state[j].id) {
                    newState[j] = Object.assign({}, newState[j], action.monitors[i]);
                    continue;
                }
            }
        }
        return newState;
    // Removes monitors
    case REMOVE_MONITORS:
        newState = [...state];
        for (let i = 0; i < action.monitors.length; i++) {
            // Move backwards to keep indices aligned
            for (let j = state.length - 1; j >= 0; j--) {
                if (action.monitors[i].id === state[j].id) {
                    newState.splice(j, 1);
                    continue;
                }
            }
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
            throttle: 30
        }
    };
};

reducer.addMonitors = function (monitors) {
    return {
        type: ADD_MONITORS,
        monitors: monitors,
        meta: {
            throttle: 30
        }
    };
};

reducer.removeMonitors = function (monitors) {
    return {
        type: REMOVE_MONITORS,
        monitors: monitors,
        meta: {
            throttle: 30
        }
    };
};

module.exports = reducer;
