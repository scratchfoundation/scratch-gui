import {DEFAULT_THEME, getColorsForTheme, themeMap} from '.';

// scratch-blocks colours has a pen property that scratch-gui uses for all extensions
const getExtensionColors = theme => getColorsForTheme(theme).pen;

/**
 * Applies extension color theme to categories.
 * No changes are applied if called with the default theme, allowing extensions to provide their own colors.
 * These colors are not seen if the category provides a blockIconURI.
 * @param {Array.<object>} dynamicBlockXML - XML for each category of extension blocks, returned from getBlocksXML
 * in the vm runtime.
 * @param {string} theme - Theme name
 * @returns {Array.<object>} Dynamic block XML updated with colors.
 */
const injectExtensionCategoryTheme = (dynamicBlockXML, theme) => {
    // Don't do any manipulation for the default theme
    if (theme === DEFAULT_THEME) return dynamicBlockXML;

    const extensionColors = getExtensionColors(theme);
    const extensionIcons = themeMap[theme].extensions;
    const parser = new DOMParser();
    const serializer = new XMLSerializer();

    return dynamicBlockXML.map(extension => {
        const dom = parser.parseFromString(extension.xml, 'text/xml');

        dom.documentElement.setAttribute('colour', extensionColors.primary);
        // Note: the category's secondaryColour matches up with the blocks' tertiary color, both used for border color.
        dom.documentElement.setAttribute('secondaryColour', extensionColors.tertiary);

        if (extensionIcons[extension.id] && extensionIcons[extension.id].menuIconURI) {
            dom.documentElement.setAttribute('iconURI', extensionIcons[extension.id].menuIconURI);
        }

        return {
            ...extension,
            xml: serializer.serializeToString(dom)
        };
    });
};

const isScratchExtension = blockInfoJson => (blockInfoJson.extensions || []).includes('scratch_extension');

const injectBlockIcons = (blockInfoJson, theme) => {
    if (!blockInfoJson.args0 || blockInfoJson.args0[0].type !== 'field_image') return blockInfoJson;

    const extensionIcons = themeMap[theme].extensions;
    const extension = blockInfoJson.type.substring(0, blockInfoJson.type.indexOf('_'));

    if (!extensionIcons[extension] || !extensionIcons[extension].blockIconURI) return blockInfoJson;

    return {
        ...blockInfoJson,
        args0: blockInfoJson.args0.map((value, index) => {
            if (index !== 0) return value;

            return {
                ...value,
                src: extensionIcons[extension].blockIconURI
            };
        })
    };
};

/**
 * Applies extension color theme to static block json.
 * No changes are applied if called with the default theme, allowing extensions to provide their own colors.
 * @param {object} blockInfoJson - Static block json
 * @param {string} theme - Theme name
 * @returns {object} Block info json with updated colors. The original blockInfoJson is not modified.
 */
const injectExtensionBlockTheme = (blockInfoJson, theme) => {
    // Don't do any manipulation for the default theme
    if (theme === DEFAULT_THEME) return blockInfoJson;

    const extensionColors = getExtensionColors(theme);

    return {
        ...injectBlockIcons(blockInfoJson, theme),
        colour: extensionColors.primary,
        colourSecondary: extensionColors.secondary,
        colourTertiary: extensionColors.tertiary,
        colourQuaternary: extensionColors.quaternary
    };
};

export {
    injectExtensionBlockTheme,
    injectExtensionCategoryTheme
};
