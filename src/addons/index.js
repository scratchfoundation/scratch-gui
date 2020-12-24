import AddonAPI from './addon-api';

const addons = [
    require('./addons/searchable-dropdowns'),
    require('./addons/s3-dev-tools')
];

for (const addon of addons) {
    const api = new AddonAPI();
    addon.default(api);
}
