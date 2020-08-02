/**
 * @fileoverview
 * Utility functions related to localization specific to the GUI
 */

const wideLocales = [
    'ab',
    'ca',
    'de',
    'el',
    'it',
    'ja',
    'ja-Hira',
    'ko',
    'hu',
    'ru',
    'vi'
];

/**
 * Identify the languages where translations are too long to fit in fixed width parts of the gui.
 * @param {string} locale The current locale.
 * @return {bool} true if translations in this language are too long
 */

const isWideLocale = locale => (
    wideLocales.indexOf(locale) !== -1
);

export {
    wideLocales,
    isWideLocale
};
