/* eslint-disable import/no-commonjs */

const SansSerif = require('./NotoSans-Medium.ttf');
const Serif = require('./SourceSerifPro-Regular.otf');
const Handwriting = require('./handlee-regular.ttf');
const Marker = require('./Knewave.ttf');
const Curly = require('./Griffy-Regular.ttf');
const Pixel = require('./Grand9K-Pixel.ttf');
const Scratch = require('./Scratch.ttf');
const log = require('../log').default;

const fontSource = {
    'Sans Serif': SansSerif,
    'Serif': Serif,
    'Handwriting': Handwriting,
    'Marker': Marker,
    'Curly': Curly,
    'Pixel': Pixel,
    'Scratch': Scratch
};

const fontData = {};

const fetchFonts = () => {
    const promises = [];
    for (const fontName of Object.keys(fontSource)) {
        promises.push(fetch(fontSource[fontName])
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Cannot load font: ${fontName} (invalid HTTP response)`);
                }
                return res.blob();
            })
            .then(blob => new Promise((resolve, reject) => {
                const fr = new FileReader();
                fr.onload = () => resolve(fr.result);
                fr.onerror = () => reject(new Error(`Cannot load font: ${fontName} (could not read)`));
                fr.readAsDataURL(blob);
            }))
            .then(url => {
                fontData[fontName] = `@font-face{font-family:"${fontName}";src:url("${url}");}`;
            })
            .catch(err => {
                log.error(err);
            })
        );
    }
    return Promise.all(promises);
};

const addFontsToDocument = () => {
    if (document.getElementById('scratch-font-styles')) {
        return;
    }
    let css = '';
    for (const fontName of Object.keys(fontSource)) {
        const fontCSS = fontData[fontName];
        if (fontCSS) {
            css += fontCSS;
        }
    }
    const documentStyleTag = document.createElement('style');
    documentStyleTag.id = 'scratch-font-styles';
    documentStyleTag.textContent = css;
    document.body.insertBefore(documentStyleTag, document.body.firstChild);
};

const waitForFontsToLoad = () => {
    const promises = [];
    if (document.fonts && document.fonts.load) {
        for (const fontName in fontData) {
            promises.push(document.fonts.load(`12px ${fontName}`));
        }
    }
    return Promise.all(promises);
};

const loadFonts = () => fetchFonts()
    .then(() => {
        addFontsToDocument();
        return waitForFontsToLoad();
    })
    .catch(err => {
        log.error(err);
    });

const getFonts = () => fontData;

// We have to use legacy module.exports as some parts of Scratch expect require('scratch-render-font') to be a function
module.exports = getFonts;
module.exports.loadFonts = loadFonts;
module.exports.FONTS = fontData;
