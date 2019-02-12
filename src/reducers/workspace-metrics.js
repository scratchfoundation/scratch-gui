const UPDATE_METRICS = 'scratch-gui/workspace-metrics/UPDATE_METRICS';

const initialState = {};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case UPDATE_METRICS:
        return Object.assign({}, state, {
            [action.targetID]: {
                scrollX: action.scrollX,
                scrollY: action.scrollY,
                scale: action.scale
            }
        });
    default:
        return state;
    }
};

const updateMetrics = function (metrics) {
    return {
        type: UPDATE_METRICS,
        ...metrics
    };
};

export {
    reducer as default,
    initialState as workspaceMetricsInitialState,
    updateMetrics
};
