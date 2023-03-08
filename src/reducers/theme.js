import cookie from 'cookie';

import {DEFAULT_THEME, HIGH_CONTRAST_THEME} from '../lib/themes';

const SET_THEME = 'scratch-gui/theme/SET_THEME';

const detectTheme = () => {
    const obj = cookie.parse(document.cookie) || {};
    const themeCookie = obj.scratchtheme;

    if ([DEFAULT_THEME, HIGH_CONTRAST_THEME].includes(themeCookie)) return themeCookie;

    // No cookie set. Fall back to system preferences
    const prefersHighContrastQuery = '(prefers-contrast: more)';
    if (window.matchMedia(prefersHighContrastQuery).matches) return HIGH_CONTRAST_THEME;

    return DEFAULT_THEME;
};

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


const prefersDarkQuery = '(prefers-color-scheme: dark)';
const prefersHighContrastQuery = '(prefers-contrast: more)';

const getTheme = () => {
    const highContrast = window.matchMedia(prefersHighContrastQuery).matches;

    if (highContrast) return 'high-contrast';

    const dark = window.matchMedia(prefersDarkQuery).matches;

    if (dark) return 'dark-mode';

    return DEFAULT_THEME;
};
