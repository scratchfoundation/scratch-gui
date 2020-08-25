const BLOCK_UPDATE = 'scratch-gui/artie-api/BLOCK_DRAG_UPDATE';

const initialState = false;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case BLOCK_UPDATE:
        return action.blocks;
    default:
        return state;
    }
};

const updateArtieBlock = function (blocks) {
    return {
        type: BLOCK_UPDATE,
        blocks: blocks,
        meta: {
            throttle: 30
        }
    };
};

export {
    reducer as default,
    initialState as blockArtieInitialState,
    updateArtieBlock
};
