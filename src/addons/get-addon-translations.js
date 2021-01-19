import addons from './addons.json';

/**
 * Get addon translations.
 * @param {string} lang The locale code
 * @returns {object} Object of translation ID to localized string or English fallback
 */
export default function getTranslations (lang) {
    const result = {};
    for (const addonId of addons) {
        try {
            const english = require(`./addons-l10n/en/${addonId}.json`);
            Object.assign(result, english);
        } catch (e) {
            // ignore
        }
        if (lang !== 'en') {
            try {
                const translations = require(`./addons-l10n/${lang}/${addonId}.json`);
                Object.assign(result, translations);
            } catch (e) {
                // ignore
            }
        }
    }
    return result;
}
