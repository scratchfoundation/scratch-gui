const UPDATE_DIMENSIONS = 'scratch-gui/workspace-metrics/UPDATE_DIMENSIONS';
const UPDATE_METRICS = 'scratch-gui/workspace-metrics/UPDATE_METRICS';

const initialState = {
    dimensions: {
        width: 0,
        height: 0
    },
    targets: {}
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case UPDATE_DIMENSIONS:
        return Object.assign({}, state, {
            dimensions: {
                width: action.width,
                height: action.height
            }
        });
    case UPDATE_METRICS:
        return Object.assign({}, state, {
            targets: Object.assign({}, state.targets, {
                [action.targetID]: {
                    scrollX: action.scrollX,
                    scrollY: action.scrollY,
                    scale: action.scale
                }
            })
        });
    default:
        return state;
    }
};

const updateDimensions = function (dimensions) {
    return {
        type: UPDATE_DIMENSIONS,
        ...dimensions
    };
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
