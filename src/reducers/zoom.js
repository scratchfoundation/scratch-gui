const SET_ZOOMED = 'scratch-gui/Zoomed/SET_ZOOMED';
const defaultZoomed = false;
const initialState = defaultZoomed;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_ZOOMED:
        return action.isZoomed;
    default:
        return state;
    }
};
const setZoomed = function (isZoomed) {
    return {
        type: SET_ZOOMED,
        isZoomed: isZoomed
    };
};
export {
    reducer as default,
    setZoomed
};
