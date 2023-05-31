import cookie from 'cookie';

import {DEFAULT_THEME, HIGH_CONTRAST_THEME} from '.';

const PREFERS_HIGH_CONTRAST_QUERY = '(prefers-contrast: more)';
const COOKIE_KEY = 'scratchtheme';

// Dark mode isn't enabled yet
const isValidTheme = theme => [DEFAULT_THEME, HIGH_CONTRAST_THEME].includes(theme);

const systemPreferencesTheme = () => {
    if (window.matchMedia && window.matchMedia(PREFERS_HIGH_CONTRAST_QUERY).matches) return HIGH_CONTRAST_THEME;

    return DEFAULT_THEME;
};

const detectTheme = () => {
    const obj = cookie.parse(document.cookie) || {};
    const themeCookie = obj.scratchtheme;

    if (isValidTheme(themeCookie)) return themeCookie;

    // No cookie set. Fall back to system preferences
    return systemPreferencesTheme();
};

const persistTheme = theme => {
    if (!isValidTheme(theme)) {
        throw new Error(`Invalid theme: ${theme}`);
    }

    if (systemPreferencesTheme() === theme) {
        // Clear the cookie to represent using the system preferences
        document.cookie = `${COOKIE_KEY}=;path=/`;
        return;
    }

    const expires = new Date(new Date().setYear(new Date().getFullYear() + 1)).toUTCString();
    document.cookie = `${COOKIE_KEY}=${theme};expires=${expires};path=/`;
};

export {
    detectTheme,
    persistTheme
};
