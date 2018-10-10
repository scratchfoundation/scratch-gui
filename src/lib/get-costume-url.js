import {SVGRenderer} from 'scratch-svg-renderer';

// Contains 'font-family', but doesn't only contain 'font-family="none"'
const HAS_FONT_REGEXP = 'font-family(?!="none")';

const getCostumeUrl = function (assetId, vm) {

    const storage = vm.runtime.storage;
    const asset = storage.get(assetId);
    // If the SVG refers to fonts, they must be inlined in order to display correctly in the img tag.
    // Avoid parsing the SVG when possible, since it's expensive.
    if (asset.assetType === storage.AssetType.ImageVector) {
        // If the asset ID has not changed, no need to re-parse

        const svgRenderer = new SVGRenderer();

        const svgString = vm.runtime.storage.get(assetId).decodeText();
        if (svgString.match(HAS_FONT_REGEXP)) {
            svgRenderer.loadString(svgString);
            const svgText = svgRenderer.toString(true /* shouldInjectFonts */);
            return `data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`;
        }
        return vm.runtime.storage.get(assetId).encodeDataURI();
    }
    return vm.runtime.storage.get(assetId).encodeDataURI();
};

export default getCostumeUrl;
