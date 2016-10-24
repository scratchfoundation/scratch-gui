const xhr = require('xhr');

const LIBRARY_PREFIX = 'https://cdn.scratch.mit.edu/scratchr2/static/' +
    '__8d9c95eb5aa1272a311775ca32568417__/medialibraries/';
const LIBRARY_URL = {
    sprite: `${LIBRARY_PREFIX}spriteLibrary.json`,
    costume: `${LIBRARY_PREFIX}costumeLibrary.json`,
    backdrop: `${LIBRARY_PREFIX}backdropLibrary.json`
};
const SPRITE_OBJECT_PREFIX = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/';
const SPRITE_OBJECT_SUFFIX = '/get/';

class MediaLibrary {
    constructor () {
        /*
         * Cached library data, from JSON.
         * @type {Object}
         */
        this._libraryData = {};

        /**
         * Cached sprite data, from JSON.
         * @type {Object.<!string, Object>}
         */
        this._spriteData = {};
    }

    /**
     * Get the media library data for a particular scratchr2 library.
     * In the future, load this from `scratch-storage` asset manager,
     * e.g., for offline support.
     * @param {string} libraryType Type of library, i.e., sprite, costume, sound, backdrop.
     * @param {!Function} callback Callback, called with list of data.
     */
    getMediaLibrary (libraryType, callback) {
        if (!this._libraryData.hasOwnProperty(libraryType)) {
            this._libraryData[libraryType] = null;
        }
        if (this._libraryData[libraryType]) {
            callback(this._libraryData[libraryType]);
        } else {
            xhr.get({
                useXDR: true,
                url: LIBRARY_URL[libraryType]
            }, (err, response, body) => {
                if (!err) {
                    const data = JSON.parse(body);
                    this._libraryData[libraryType] = data;
                    callback(this._libraryData[libraryType]);
                }
            });
        }
    }

    /**
     * Get media library info for a specific scratchr2 sprite.
     * In the future, load this from `scratch-storage` asset manager,
     * e.g., for offline support.
     * @param {string} url URL to sprite (md5.json).
     * @param {!Function} callback Callback, called with sprite data.
     */
    getSprite (url, callback) {
        if (this._spriteData.hasOwnProperty(url)) {
            callback(url, this._spriteData[url]);
        } else {
            xhr.get({
                useXDR: true,
                url: SPRITE_OBJECT_PREFIX + url + SPRITE_OBJECT_SUFFIX
            }, (err, response, body) => {
                if (!err) {
                    const data = JSON.parse(body);
                    this._spriteData[url] = data;
                    callback(url, data);
                }
            });
        }
    }
}

module.exports = MediaLibrary;
