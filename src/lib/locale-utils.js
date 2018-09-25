// TODO: this probably should be coming from scratch-l10n
// Tracking in https://github.com/LLK/scratch-l10n/issues/32
const rtlLocales = ['he'];

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

const isWideLocale = locale => (
    wideLocales.indexOf(locale) !== -1
);

export {
    rtlLocales,
    wideLocales,
    isWideLocale
};
