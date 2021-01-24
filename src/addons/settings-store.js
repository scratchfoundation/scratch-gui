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

import addons from './addon-manifests';
import upstreamMeta from './upstream-meta.json';

const SETTINGS_KEY = 'tw:addons';
const VERSION = 1;

class SettingsStore extends EventTarget {
    constructor () {
        super();
        this.store = this.readLocalStorage();
    }

    /**
     * @private
     */
    readLocalStorage () {
        const base = {};
        for (const addonId of Object.keys(addons)) {
            base[addonId] = {};
        }
        try {
            const local = localStorage.getItem(SETTINGS_KEY);
            if (local) {
                const result = JSON.parse(local);
                if (result && typeof result === 'object' && result._ === VERSION) {
                    for (const key of Object.keys(result)) {
                        if (base.hasOwnProperty(key)) {
                            const value = result[key];
                            if (value && typeof value === 'object') {
                                base[key] = value;
                            }
                        }
                    }
                }
            }
        } catch (e) {
            // ignore
        }
        return base;
    }

    /**
     * @private
     */
    saveToLocalStorage () {
        try {
            const result = {
                _: VERSION
            };
            for (const addonId of Object.keys(addons)) {
                const data = this.getAddonStorage(addonId);
                if (Object.keys(data).length > 0) {
                    result[addonId] = data;
                }
            }
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(result));
        } catch (e) {
            // ignore
        }
    }

    /**
     * @private
     */
    getAddonStorage (addonId) {
        if (this.store[addonId]) {
            return this.store[addonId];
        }
        throw new Error(`Unknown addon store: ${addonId}`);
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

    /**
     * @private
     */
    getAddonSettingObject (manifest, settingId) {
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

    getAddonEnabled (addonId) {
        const storage = this.getAddonStorage(addonId);
        if (storage.hasOwnProperty('enabled')) {
            return storage.enabled;
        }
        const manifest = this.getAddonManifest(addonId);
        return !!manifest.enabledByDefault;
    }

    getAddonSetting (addonId, settingId) {
        const storage = this.getAddonStorage(addonId);
        const manifest = this.getAddonManifest(addonId);
        const settingObject = this.getAddonSettingObject(manifest, settingId);
        if (!settingObject) {
            throw new Error(`Unknown setting: ${settingId}`);
        }
        if (storage.hasOwnProperty(settingId)) {
            return storage[settingId];
        }
        return settingObject.default;
    }

    getDefaultSettings (addonId) {
        const manifest = this.getAddonManifest(addonId);
        const result = {};
        for (const {id, default: value} of manifest.settings) {
            result[id] = value;
        }
        return result;
    }

    setAddonEnabled (addonId, value) {
        const storage = this.getAddonStorage(addonId);
        const manifest = this.getAddonManifest(addonId);
        const oldValue = this.getAddonEnabled(addonId);
        if (value === null) {
            value = !!manifest.enabledByDefault;
            delete storage.enabled;
        } else {
            storage.enabled = value;
        }
        this.saveToLocalStorage();
        if (value !== oldValue) {
            this.dispatchEvent(new CustomEvent('setting-changed', {
                detail: {
                    addonId,
                    settingId: 'enabled',
                    reloadRequired: true,
                    value
                }
            }));
        }
    }

    setAddonSetting (addonId, settingId, value) {
        const storage = this.getAddonStorage(addonId);
        const manifest = this.getAddonManifest(addonId);
        const settingObject = this.getAddonSettingObject(manifest, settingId);
        const oldValue = this.getAddonSetting(addonId, settingId);
        if (value === null) {
            value = settingObject.default;
            delete storage[settingId];
        } else {
            if (settingObject.type === 'boolean') {
                if (typeof value !== 'boolean') {
                    throw new Error('Setting value is invalid.');
                }
            } else if (settingObject.type === 'integer') {
                if (typeof value !== 'number') {
                    throw new Error('Setting value is invalid.');
                }
            } else if (settingObject.type === 'color') {
                if (typeof value !== 'string' || !/^#[0-9a-f]{6}$/i.test(value)) {
                    throw new Error('Setting value is invalid.');
                }
            } else if (settingObject.type === 'select') {
                if (!settingObject.potentialValues.some(potentialValue => potentialValue.id === value)) {
                    throw new Error('Setting value is invalid.');
                }
            } else {
                throw new Error('Setting object is of unknown type');
            }
            storage[settingId] = value;
        }
        this.saveToLocalStorage();
        if (value !== oldValue) {
            this.dispatchEvent(new CustomEvent('setting-changed', {
                detail: {
                    addonId,
                    settingId,
                    reloadRequired: settingObject.reloadRequired !== false,
                    value
                }
            }));
        }
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
        const storage = this.getAddonStorage(addonId);
        for (const setting of Object.keys(storage)) {
            if (setting === 'enabled') {
                if (resetEverything) {
                    this.setAddonEnabled(addonId, null);
                }
                continue;
            }
            this.setAddonSetting(addonId, setting, null);
        }
    }

    export ({theme}) {
        const result = {
            core: {
                // Upstream property. We don't use this.
                lightTheme: theme === 'light',
                // Append -tw to all versions, for example 1.8.0-prerelease-tw
                version: `${upstreamMeta.version}-tw`
            },
            addons: {}
        };
        for (const [addonId, manifest] of Object.entries(addons)) {
            const enabled = this.getAddonEnabled(addonId);
            const settings = {};
            if (manifest.settings) {
                for (const {id} of manifest.settings) {
                    settings[id] = this.getAddonSetting(addonId, id);
                }
            }
            result.addons[addonId] = {
                enabled,
                settings
            };
        }
        return result;
    }

    import (data) {
        for (const [addonId, value] of Object.entries(data.addons)) {
            if (!addons.hasOwnProperty(addonId)) {
                continue;
            }
            const {enabled, settings} = value;
            this.setAddonEnabled(addonId, enabled);
            for (const [settingId, settingValue] of Object.entries(settings)) {
                try {
                    this.setAddonSetting(addonId, settingId, settingValue);
                } catch (e) {
                    // ignore
                }
            }
        }
    }
}

export default new SettingsStore();
