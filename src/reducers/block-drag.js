const BLOCK_DRAG_UPDATE = 'scratch-gui/block-drag/BLOCK_DRAG_UPDATE';

const initialState = false;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case BLOCK_DRAG_UPDATE:
        return action.areBlocksOverGui;
    default:
        return state;
    }
};

const updateBlockDrag = function (areBlocksOverGui) {
    return {
        type: BLOCK_DRAG_UPDATE,
        areBlocksOverGui: areBlocksOverGui,
        meta: {
            throttle: 30
        }
    };
};

export {
    reducer as default,
    initialState as blockDragInitialState,
    updateBlockDrag
};
