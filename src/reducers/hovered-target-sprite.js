const SET_HOVERED_SPRITE = 'scratch-gui/hovered-target-sprite/SET_HOVERED_SPRITE';

const initialState = null;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_HOVERED_SPRITE:
        return action.spriteId;
    default:
        return state;
    }
};

const setHoveredSprite = function (spriteId) {
    return {
        type: SET_HOVERED_SPRITE,
        spriteId: spriteId,
        meta: {
            throttle: 30
        }
    };
};

export {
    reducer as default,
    setHoveredSprite
};
