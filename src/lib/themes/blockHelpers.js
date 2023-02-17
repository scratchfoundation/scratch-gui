import {DEFAULT_THEME, getColorsForTheme} from '.';

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
const injectExtensionCategoryColors = (dynamicBlockXML, theme) => {
    // Don't do any manipulation for the default theme
    if (theme === DEFAULT_THEME) return dynamicBlockXML;

    const extensionColors = getExtensionColors(theme);
    const parser = new DOMParser();
    const serializer = new XMLSerializer();

    return dynamicBlockXML.map(extension => {
        const dom = parser.parseFromString(extension.xml, 'text/xml');

        dom.documentElement.setAttribute('colour', extensionColors.primary);
        // Note: the category's secondaryColour matches up with the blocks' tertiary color, both used for border color.
        dom.documentElement.setAttribute('secondaryColour', extensionColors.tertiary);

        return {
            ...extension,
            xml: serializer.serializeToString(dom)
        };
    });
};

/**
 * Applies extension color theme to static block json.
 * No changes are applied if called with the default theme, allowing extensions to provide their own colors.
 * @param {object} blockInfoJson - Static block json
 * @param {string} theme - Theme name
 * @returns {object} Block info json with updated colors. The original blockInfoJson is not modified.
 */
const injectExtensionBlockColors = (blockInfoJson, theme) => {
    // Don't do any manipulation for the default theme
    if (theme === DEFAULT_THEME) return blockInfoJson;

    const extensionColors = getExtensionColors(theme);

    return {
        ...blockInfoJson,
        colour: extensionColors.primary,
        colourSecondary: extensionColors.secondary,
        colourTertiary: extensionColors.tertiary
    };
};

export {
    injectExtensionBlockColors,
    injectExtensionCategoryColors
};
