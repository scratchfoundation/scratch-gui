const SET_FONTS_LOADED = 'fontsLoaded/SET_FONTS_LOADED';

const initialState = false;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_FONTS_LOADED:
        return action.loaded;
    default:
        return state;
    }
};
const setFontsLoaded = () => ({
    type: SET_FONTS_LOADED,
    loaded: true
});

export {
    reducer as default,
    initialState as fontsLoadedInitialState,
    setFontsLoaded
};
