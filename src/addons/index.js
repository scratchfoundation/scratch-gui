import API from './api';
import addons from './addons.json';

for (const addonId of addons) {
    if (addonId.startsWith('//')) {
        continue;
    }
    const api = new API(addonId);
    const module = require(`./addons/${addonId}`);
    module.default(api);
}
