/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
