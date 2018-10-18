import {SVGRenderer} from 'scratch-svg-renderer';

// Contains 'font-family', but doesn't only contain 'font-family="none"'
const HAS_FONT_REGEXP = 'font-family(?!="none")';

const getCostumeUrl = (function () {
    let cachedAssetId;
    let cachedUrl;

    return function (assetId, vm) {

        if (cachedAssetId === assetId) {
            return cachedUrl;
        }

        cachedAssetId = assetId;

        const storage = vm.runtime.storage;
        const asset = storage.get(assetId);
        // If the SVG refers to fonts, they must be inlined in order to display correctly in the img tag.
        // Avoid parsing the SVG when possible, since it's expensive.
        if (asset.assetType === storage.AssetType.ImageVector) {
            const svgString = vm.runtime.storage.get(assetId).decodeText();
            if (svgString.match(HAS_FONT_REGEXP)) {
                const svgRenderer = new SVGRenderer();
                svgRenderer.loadString(svgString);
                const svgText = svgRenderer.toString(true /* shouldInjectFonts */);
                cachedUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`;
            }
            cachedUrl = vm.runtime.storage.get(assetId).encodeDataURI();
        }
        cachedUrl = vm.runtime.storage.get(assetId).encodeDataURI();

        return cachedUrl;
    };
}());

export {
    getCostumeUrl as default,
    HAS_FONT_REGEXP
};
