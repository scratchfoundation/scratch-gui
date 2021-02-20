/**
 * @license
 * Copyright (c) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
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
import newAddons from './new-addons.json';
import isMobile from './is-mobile';

const clipboardSupported = !!(navigator.clipboard && navigator.clipboard.write);
const mediaRecorderSupported = !!window.MediaRecorder && (
    MediaRecorder.isTypeSupported('video/webm') || MediaRecorder.isTypeSupported('video/mp4')
);
const isSupported = manifest => {
    if (!manifest.permissions) {
        return true;
    }
    if (!clipboardSupported && manifest.permissions.includes('clipboardWrite')) {
        return false;
    }
    if (!mediaRecorderSupported && manifest.permissions.includes('mediaRecorder')) {
        return false;
    }
    return true;
};

const addonMap = {};
export const unsupportedAddons = {};
for (const addonId of addons) {
    const manifest = require(`./addons/${addonId}/addon.json`);
    if (isMobile) {
        if (typeof manifest.enabledByDefaultMobile !== 'undefined') {
            manifest.enabledByDefault = manifest.enabledByDefaultMobile;
        }
    }
    if (newAddons.includes(addonId)) {
        if (!manifest.tags) {
            manifest.tags = [];
        }
        manifest.tags.push('new');
    }
    if (isSupported(manifest)) {
        addonMap[addonId] = manifest;
    } else {
        unsupportedAddons[addonId] = manifest;
    }
}

export default addonMap;
