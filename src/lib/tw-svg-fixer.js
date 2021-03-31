import {TextDecoder, TextEncoder} from './tw-text-encoder';

const fixSVG = fileData => {
    // width="100%" and height="100%" on SVGs can break things
    // Demo: https://scratch.mit.edu/projects/447085841/
    // Based on: https://github.com/ScratchAddons/ScratchAddons/pull/748
    try {
        const bytes = new Uint8Array(fileData);
        const str = new TextDecoder().decode(bytes);
        const xmlDocument = new DOMParser().parseFromString(str, 'text/xml');
        const svgElement = xmlDocument.children[0];
        if (
            svgElement.height.baseVal.valueAsString === '100%' &&
            svgElement.width.baseVal.valueAsString === '100%'
        ) {
            svgElement.removeAttribute('height');
            svgElement.removeAttribute('width');
            const fixed = xmlDocument.documentElement.outerHTML;
            return new TextEncoder().encode(fixed).buffer;
        }
        return fileData;
    } catch (e) {
        return fileData;
    }
};

export default fixSVG;
