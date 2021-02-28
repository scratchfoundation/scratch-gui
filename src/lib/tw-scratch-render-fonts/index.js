import SansSerif from './NotoSans-Medium.ttf';
import Serif from './SourceSerifPro-Regular.otf';
import Handwriting from './handlee-regular.ttf';
import Marker from './Knewave.ttf';
import Curly from './Griffy-Regular.ttf';
import Pixel from './Grand9K-Pixel.ttf';
import Scratch from './Scratch.ttf';

const FONTS = {
    'Sans Serif': SansSerif,
    'Serif': Serif,
    'Handwriting': Handwriting,
    'Marker': Marker,
    'Curly': Curly,
    'Pixel': Pixel,
    'Scratch': Scratch
};

for (const fontName in FONTS) {
    const fontSource = FONTS[fontName];
    FONTS[fontName] = `@font-face { font-family: "${fontName}"; src: url("${fontSource}"); }`;
}

if (!document.getElementById('scratch-font-styles')) {
    const documentStyleTag = document.createElement('style');
    documentStyleTag.id = 'scratch-font-styles';
    for (const fontName in FONTS) {
        documentStyleTag.textContent += FONTS[fontName];
    }
    document.body.insertBefore(documentStyleTag, document.body.firstChild);
}

export {
    FONTS
};
