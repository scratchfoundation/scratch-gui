import defaultsDeep from 'lodash.defaultsdeep';

import darkMode from './dark-mode';
import highContrast from './high-contrast';
import defaultColors from './default-colors';

const DEFAULT_THEME = 'standard';
const mergeWithDefaults = colors => defaultsDeep({}, colors, defaultColors);

const themeMap = {
    'dark-mode': mergeWithDefaults(darkMode),
    'high-contrast': mergeWithDefaults(highContrast),
    [DEFAULT_THEME]: defaultColors
};

const getColorsForTheme = theme => {
    const colors = themeMap[theme];

    if (!colors) {
        throw new Error(`Undefined theme ${theme}`);
    }

    return colors;
};

const themes = Object.keys(themeMap);

export {
    DEFAULT_THEME,
    defaultColors,
    getColorsForTheme,
    themes
};
