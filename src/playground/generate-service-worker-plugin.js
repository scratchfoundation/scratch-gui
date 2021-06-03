/* eslint-disable import/no-commonjs */

const RawSource = require('webpack-sources').RawSource;
const crypto = require('crypto');

const PLUGIN_NAME = 'TWGenerateServiceWorkerPlugin';
const SW_NAME = 'sw.js';
const INCLUDE_HTML = [
    'index.html',
    'editor.html',
    'fullscreen.html',
    'addons.html'
];

class TWGenerateServiceWorkerPlugin {
    apply (compiler) {
        const allAssetNames = new Set();
        compiler.hooks.emit.tap(PLUGIN_NAME, compilation => {
            const newAssetNames = compilation.getAssets()
                .map(i => i.name);
            for (const name of newAssetNames) {
                allAssetNames.add(name);
            }
            const assetNames = Array.from(allAssetNames)
                .filter(name => {
                    /*
                    if (name.startsWith('static/blocks-media') || name.startsWith('static/assets')) {
                        // Assets that are only used in horizontal mode
                        if (
                            name.includes('event_broadcast_') ||
                            name.includes('event_when-broadcast-received_') ||
                            name.includes('event_whenflagclicked')
                        ) return false;
                        // Assets that are useless without an internet connection
                        if (
                            name.includes('wedo_') ||
                            name.includes('set-led_') ||
                            name.includes('microbit-block-icon') ||
                            name.includes('wedo2-block-icon')
                        ) return false;
                        // Assets that are extremely unlikely to be used
                        if (
                            name.endsWith('.wav') ||
                            name.endsWith('.ogg') ||
                            name.endsWith('.cur')
                        ) return false;
                        return true;
                    }
                    */
                    if (name.startsWith('js/')) {
                        if (name.endsWith('.map')) return false;
                        // Extension worker
                        if (name.includes('worker')) return false;
                        // Unnecessary pages
                        if (name.startsWith('js/embed')) return false;
                        if (name.startsWith('js/credits')) return false;
                        // Features that won't work offline anyways
                        if (name.startsWith('js/library-')) return false;
                        return true;
                    }
                    if (INCLUDE_HTML.includes(name)) return true;
                    return false;
                });
            const workerFile = compilation.getAsset(SW_NAME);
            const workerSource = workerFile.source.source().toString();
            const stringifiedAssets = JSON.stringify(assetNames);
            const hash = crypto.createHash('sha1');
            hash.update(stringifiedAssets);
            const newSource = workerSource
                .replace('[/* __ASSETS__ */]', stringifiedAssets)
                .replace('__CACHE_NAME__', `tw-${hash.digest('hex')}`);
            compilation.updateAsset(SW_NAME, new RawSource(newSource));
        });
    }
}

module.exports = TWGenerateServiceWorkerPlugin;
