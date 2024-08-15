import defaultsDeep from 'lodash.defaultsdeep';
import {defineMessages} from 'react-intl';

import {
    blockColors as darkModeBlockColors,
    extensions as darkModeExtensions
} from './dark';
import {
    blockColors as highContrastBlockColors,
    extensions as highContrastExtensions
} from './high-contrast';
import {blockColors as defaultColors} from './default';

import defaultIcon from './default/icon.svg';
import highContrastIcon from './high-contrast/icon.svg';

const DEFAULT_THEME = 'default';
const HIGH_CONTRAST_THEME = 'high-contrast';
const DARK_THEME = 'dark';

const mergeWithDefaults = colors => defaultsDeep({}, colors, defaultColors);

const messages = defineMessages({
    [DEFAULT_THEME]: {
        id: 'gui.theme.default',
        defaultMessage: 'Original',
        description: 'label for original theme'
    },
    [DARK_THEME]: {
        id: 'gui.theme.dark',
        defaultMessage: 'Dark',
        description: 'label for dark mode theme'
    },
    [HIGH_CONTRAST_THEME]: {
        id: 'gui.theme.highContrast',
        defaultMessage: 'High Contrast',
        description: 'label for high theme'
    }
});

const themeMap = {
    [DEFAULT_THEME]: {
        blocksMediaFolder: 'blocks-media/default',
        colors: defaultColors,
        extensions: {},
        label: messages[DEFAULT_THEME],
        icon: defaultIcon
    },
    [DARK_THEME]: {
        blocksMediaFolder: 'blocks-media/default',
        colors: mergeWithDefaults(darkModeBlockColors),
        extensions: darkModeExtensions,
        label: messages[DARK_THEME]
    },
    [HIGH_CONTRAST_THEME]: {
        blocksMediaFolder: 'blocks-media/high-contrast',
        colors: mergeWithDefaults(highContrastBlockColors),
        extensions: highContrastExtensions,
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
