/**
 * @fileoverview
 * Utility function to detect locale from the browser setting or paramenter on the URL.
 */

/**
 * look for language setting in the browser. Check against supported locales.
 * If there's a parameter in the URL, override the browser setting
 * @param {Array.string} supportedLocales An array of supported locale codes.
 * @return {string} the preferred locale
 */
const detectLocale = supportedLocales => {
    let locale = 'en'; // default
    let browserLocale = window.navigator.userLanguage || window.navigator.language;
    browserLocale = browserLocale.toLowerCase();
    // try to set locale from browserLocale
    if (supportedLocales.includes(browserLocale)) {
        locale = browserLocale;
    } else {
        browserLocale = browserLocale.split('-')[0];
        if (supportedLocales.includes(browserLocale)) {
            locale = browserLocale;
        }
    }

    if (window.location.search.indexOf('locale=') !== -1 ||
        window.location.search.indexOf('lang=') !== -1) {
        const urlLocale = window.location.search.match(/(?:locale|lang)=([\w-]+)/)[1].toLowerCase();
        if (supportedLocales.includes(urlLocale)) {
            locale = urlLocale;
        }
    }
    return locale;
};

export {
    detectLocale
};
