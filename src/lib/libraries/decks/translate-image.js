/**
 * @fileoverview
 * Utility functions for handling tutorial images in multiple languages
 */

import {enImages as defaultImages} from './en-steps.js';

let savedImages = {};
let savedLocale = '';

const loadSpanish = () =>
    import(/* webpackChunkName: "es-steps" */ './es-steps.js')
        .then(({esImages: imageData}) => imageData);

const loadSimplifiedChinese = () =>
    import(/* webpackChunkName: "zh_CN-steps" */ './zh_CN-steps.js')
        .then(({zhCnImages: imageData}) => imageData);

const loadTraditionalChinese = () =>
    import(/* webpackChunkName: "zh_TW-steps" */ './zh_TW-steps.js')
        .then(({zhTwImages: imageData}) => imageData);

const loadTurkish = () =>
    import(/* webpackChunkName: "tr-steps" */ './tr-steps.js')
        .then(({trImages: imageData}) => imageData);

const loadFrench = () =>
    import(/* webpackChunkName: "fr-steps" */ './fr-steps.js')
        .then(({frImages: imageData}) => imageData);

const loadPortugueseBrazilian = () =>
    import(/* webpackChunkName: "pt_BR-steps" */ './pt_BR-steps.js')
        .then(({ptBrImages: imageData}) => imageData);

const loadArabic = () =>
    import(/* webpackChunkName: "ar-steps" */ './ar-steps.js')
        .then(({arImages: imageData}) => imageData);

const loadAmharic = () =>
    import(/* webpackChunkName: "am-steps" */ './am-steps.js')
        .then(({amImages: imageData}) => imageData);

const loadKiswahili = () =>
    import(/* webpackChunkName: "sw-steps" */ './sw-steps.js')
        .then(({swImages: imageData}) => imageData);

const loadIsiZulu = () =>
    import(/* webpackChunkName: "zu-steps" */ './zu-steps.js')
        .then(({zuImages: imageData}) => imageData);

const loadUkrainian = () =>
    import(/* webpackChunkName: "uk-steps" */ './uk-steps.js')
        .then(({ukImages: imageData}) => imageData);

const loadJapanese = () =>
    import(/* webpackChunkName: "ja-steps" */ './ja-steps.js')
        .then(({jaImages: imageData}) => imageData);

const translations = {
    'es': () => loadSpanish(),
    'es-419': () => loadSpanish(),
    'zh-cn': () => loadSimplifiedChinese(),
    'zh-tw': () => loadTraditionalChinese(),
    'tr': () => loadTurkish(),
    'fr': () => loadFrench(),
    'pt-br': () => loadPortugueseBrazilian(),
    'pt': () => loadPortugueseBrazilian(),
    'ar': () => loadArabic(),
    'am': () => loadAmharic(),
    'sw': () => loadKiswahili(),
    'zu': () => loadIsiZulu(),
    'uk': () => loadUkrainian(),
    'ja': () => loadJapanese(),
    'ja-Hira': () => loadJapanese()
};

const loadImageData = locale => {
    if (translations.hasOwnProperty(locale)) {
        translations[locale]()
            .then(newImages => {
                savedImages = newImages;
                savedLocale = locale;
            });
    }
};

/**
 * Return image data for tutorials based on locale (default: en)
 * @param {string} imageId key in the images object, or id string.
 * @param {string} locale requested locale
 * @return {string} image
 */
const translateImage = (imageId, locale) => {
    if (locale !== savedLocale || !savedImages.hasOwnProperty(imageId)) {
        return defaultImages[imageId];
    }
    return savedImages[imageId];
};

export {
    loadImageData,
    translateImage
};
