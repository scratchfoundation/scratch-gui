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
import newAddons from './new-addons.json';
import isMobile from './is-mobile';

const clipboardSupported = !!(navigator.clipboard && navigator.clipboard.write);
const mediaRecorderSupported = !!window.MediaRecorder && MediaRecorder.isTypeSupported('video/webm');
const isSupported = (addonId, manifest) => {
    if (!manifest.permissions) {
        return true;
    }
    if (!clipboardSupported && manifest.permissions.includes('clipboardWrite')) {
        return false;
    }
    if (!mediaRecorderSupported && addonId === 'mediarecorder') {
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
    if (isSupported(addonId, manifest)) {
        addonMap[addonId] = manifest;
    } else {
        unsupportedAddons[addonId] = manifest;
    }
}

export default addonMap;
