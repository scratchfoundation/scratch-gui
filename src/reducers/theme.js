import {detectTheme} from '../lib/themes/themePersistance';

const SET_THEME = 'scratch-gui/theme/SET_THEME';

const initialState = {
    theme: detectTheme()
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_THEME:
        return {...state, theme: action.theme};
    default:
        return state;
    }
};

const setTheme = theme => ({
    type: SET_THEME,
    theme
});

export {
    reducer as default,
    initialState as themeInitialState,
    setTheme
};
