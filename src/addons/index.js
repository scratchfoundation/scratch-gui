import AddonAPI from './addon-api';

/* eslint-disable import/no-commonjs */
const addons = [
    require('./addons/searchable-dropdowns'),
    require('./addons/dev-tools')
];

const api = new AddonAPI();
for (const addon of addons) {
    addon.default(api);
}
