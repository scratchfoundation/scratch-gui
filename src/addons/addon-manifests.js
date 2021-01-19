import addons from './addons.json';

const clipboardSupported = !!navigator.clipboard;

const addonMap = {};
for (const addonId of addons) {
    const manifest = require(`./addons/${addonId}/addon.json`);
    if (manifest.permissions) {
        if (!clipboardSupported && manifest.permissions.includes('clipboardWrite')) {
            continue;
        }
    }
    addonMap[addonId] = manifest;
}

export default addonMap;
