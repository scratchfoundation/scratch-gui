import defaultsDeep from 'lodash.defaultsdeep';
import {defineMessages} from 'react-intl';

import darkMode from './dark-mode';
import highContrast from './high-contrast';
import defaultColors from './default-colors';

import defaultIcon from './standard.svg';
import highContrastIcon from './high-contrast.svg';

const DEFAULT_THEME = 'default';
const HIGH_CONTRAST_THEME = 'high-contrast';
const DARK_THEME = 'dark';

const mergeWithDefaults = colors => defaultsDeep({}, colors, defaultColors);

const messages = defineMessages({
    [DEFAULT_THEME]: {
        id: 'gui.theme.default',
        defaultMessage: 'Default',
        description: 'label for default theme'
    },
    [DARK_THEME]: {
        id: 'gui.theme.dark',
        defaultMessage: 'Dark',
        description: 'label for dark mode theme'
    },
    [HIGH_CONTRAST_THEME]: {
        id: 'gui.theme.highContrast',
        defaultMessage: 'High Text Contrast',
        description: 'label for high constast theme'
    }
});

const themeMap = {
    [DEFAULT_THEME]: {
        colors: defaultColors,
        label: messages[DEFAULT_THEME],
        icon: defaultIcon
    },
    [DARK_THEME]: {
        colors: mergeWithDefaults(darkMode),
        label: messages[DARK_THEME]
    },
    [HIGH_CONTRAST_THEME]: {
        colors: mergeWithDefaults(highContrast),
        label: messages[HIGH_CONTRAST_THEME],
        icon: highContrastIcon
    }
};

const getColorsForTheme = theme => {
    const themeInfo = themeMap[theme];

    if (!themeInfo) {
        throw new Error(`Undefined theme ${theme}`);
    }

    return themeInfo.colors;
};

export {
    DEFAULT_THEME,
    DARK_THEME,
    HIGH_CONTRAST_THEME,
    defaultColors,
    getColorsForTheme,
    themeMap
};
