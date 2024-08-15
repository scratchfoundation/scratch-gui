const DRAG_UPDATE = 'scratch-gui/asset-drag/DRAG_UPDATE';

const initialState = {
    dragging: false,
    currentOffset: null,
    img: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case DRAG_UPDATE:
        return Object.assign({}, state, action.state);
    default:
        return state;
    }
};

const updateAssetDrag = function (state) {
    return {
        type: DRAG_UPDATE,
        state: state
    };
};

export {
    reducer as default,
    initialState as assetDragInitialState,
    updateAssetDrag
};
