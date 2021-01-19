const addons = require('./addons.json')

const addonMap = {};
for (const addonId of addons) {
    const manifest = require(`./addons/${addonId}/addon.json`);
    addonMap[addonId] = manifest;
}

export default addonMap;
