/* eslint-disable import/no-commonjs */

const pluginName = 'TWGenerateServiceWorkerPlugin';
const RawSource = require('webpack-sources').RawSource;

const SW_NAME = 'sw.js';

const INCLUDE_HTML = [
    'index.html',
    'editor.html',
    'fullscreen.html',
    'addons.html'
];

class TWGenerateServiceWorkerPlugin {
    apply (compiler) {
        compiler.hooks.emit.tap(pluginName, compilation => {
            const assetNames = compilation.getAssets()
                .map(i => i.name)
                .filter(name => {
                    if (name.endsWith('.map')) return false;
                    if (name.includes('worker')) return false;
                    if (name.startsWith('js/embed')) return false;
                    if (name.startsWith('js/credits')) return false;
                    if (name.startsWith('js/library-')) return false;
                    if (name === SW_NAME) return false;
                    if (name.endsWith('.html') && !INCLUDE_HTML.includes(name)) return false;
                    return true;
                });
            const workerFile = compilation.getAsset(SW_NAME);
            const workerSource = workerFile.source.source().toString();
            const newSource = workerSource.replace('[/* === */]', JSON.stringify(assetNames));
            compilation.updateAsset(SW_NAME, new RawSource(newSource));
        });
    }
}

module.exports = TWGenerateServiceWorkerPlugin;
