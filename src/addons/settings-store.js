/**
 * @license
 * Copyright (c) 2020 Thomas Weber
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

import addons from './addon-manifests';

const SETTINGS_KEY = 'tw:addons';

class SettingsStore extends EventTarget {
    constructor () {
        super();
        this.store = this.readLocalStorage();
    }

    /**
     * @private
     */
    readLocalStorage () {
        try {
            const value = localStorage.getItem(SETTINGS_KEY);
            if (value) {
                return JSON.parse(value);
            }
        } catch (e) {
            // ignore
        }
        return {};
    }

    /**
     * @private
     */
    saveToLocalStorage () {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.store));
        } catch (e) {
            // ignore
        }
    }

    /**
     * @private
     */
    getStorageKey (addonId, key) {
        return `${addonId}/${key}`;
    }

    /**
     * @private
     */
    getAddonManifest (addonId) {
        if (addons[addonId]) {
            return addons[addonId];
        }
        throw new Error(`Unknown addon: ${addonId}`);
    }

    getAddonEnabled (addonId) {
        const key = this.getStorageKey(addonId, 'enabled');
        if (this.store.hasOwnProperty(key)) {
            return this.store[key];
        }
        const manifest = this.getAddonManifest(addonId);
        return !!manifest.enabledByDefault;
    }

    getAddonSetting (addonId, settingId) {
        const key = this.getStorageKey(addonId, settingId);
        if (this.store.hasOwnProperty(key)) {
            return this.store[key];
        }
        const manifest = this.getAddonManifest(addonId);
        if (manifest.settings) {
            for (const setting of manifest.settings) {
                if (setting.id === settingId) {
                    return setting.default;
                }
            }
        }
        throw new Error(`Unknown setting: ${settingId}`);
    }

    getDefaultSettings (addonId) {
        const result = {};
        const manifest = this.getAddonManifest(addonId);
        for (const {id, default: value} of manifest.settings) {
            result[id] = value;
        }
        return result;
    }

    /**
     * @private
     */
    getAddonSettingObject (addonId, settingId) {
        const manifest = this.getAddonManifest(addonId);
        if (!manifest.settings) {
            return null;
        }
        for (const setting of manifest.settings) {
            if (setting.id === settingId) {
                return setting;
            }
        }
        return null;
    }

    setAddonSetting (addonId, settingId, value) {
        const settingObject = this.getAddonSettingObject(addonId, settingId);
        const key = this.getStorageKey(addonId, settingId);
        if (value === null) {
            delete this.store[key];
            if (settingId === 'enabled') {
                value = !!this.getAddonManifest(addonId).enabledByDefault;
            } else {
                value = settingObject.default;
            }
        } else {
            this.store[key] = value;
        }
        this.saveToLocalStorage();
        this.dispatchEvent(new CustomEvent('setting-changed', {
            detail: {
                addonId,
                settingId,
                reloadRequired: !(settingObject && settingObject.reloadRequired === false),
                value
            }
        }));
    }

    setAddonEnabled (addonId, enabled) {
        this.setAddonSetting(addonId, 'enabled', enabled);
    }

    applyAddonPreset (addonId, presetId) {
        const manifest = this.getAddonManifest(addonId);
        for (const {id, values} of manifest.presets) {
            if (id !== presetId) {
                continue;
            }
            const settings = {
                ...this.getDefaultSettings(addonId),
                ...values
            };
            for (const key of Object.keys(settings)) {
                this.setAddonSetting(addonId, key, settings[key]);
            }
            return;
        }
        throw new Error(`Unknown preset: ${presetId}`);
    }

    resetAllAddons () {
        for (const addon of Object.keys(addons)) {
            this.resetAddon(addon, true);
        }
    }

    resetAddon (addonId, resetEverything) {
        for (const key of Object.keys(this.store)) {
            if (key.startsWith(addonId)) {
                const setting = key.split('/')[1];
                if (setting === 'enabled' && !resetEverything) {
                    continue;
                }
                this.setAddonSetting(addonId, setting, null);
            }
        }
    }
}

export default new SettingsStore();
