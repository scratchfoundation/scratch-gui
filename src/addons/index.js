import AddonAPI from './addon-api';

/* eslint-disable import/no-commonjs */
const addons = [
    'searchable-dropdowns',
    'dev-tools',
    'block-switching'
];

for (const addonId of addons) {
    const api = new AddonAPI(addonId);
    const module = require(`./addons/${addonId}`);
    module.default(api);
}
