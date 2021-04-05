import SansSerif from './NotoSans-Medium.ttf';
import Serif from './SourceSerifPro-Regular.otf';
import Handwriting from './handlee-regular.ttf';
import Marker from './Knewave.ttf';
import Curly from './Griffy-Regular.ttf';
import Pixel from './Grand9K-Pixel.ttf';
import Scratch from './Scratch.ttf';
import log from '../log';

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
    const documentStyleTag = document.createElement('style');
    documentStyleTag.id = 'scratch-font-styles';
    for (const fontName of Object.keys(fontSource)) {
        const css = fontData[fontName];
        if (css) {
            documentStyleTag.textContent += css;
        }
    }
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

export {
    getFonts as default,
    loadFonts,
    fontData as FONTS
};
