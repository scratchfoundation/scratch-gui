import bowser from 'bowser';

const minVersions = {
    chrome: '63',
    msedge: '15',
    firefox: '57',
    safari: '11'
};

/**
 * Helper function to determine if the browser is supported at all.
 * @returns {boolean} False if the platform is definitely not supported.
 */
const supportedBrowser = () => {
    if (bowser.msie) {
        return false;
    }
    return true;
};

/**
 * Helper function to determine if the browser meets the minimum recommended version
 * @returns {boolean} False if the browser isn't a recommended browser, or doesn't
 * meet the minimum version for recommended browsers.
 * NOTE: uses strict_mode==true so that any browser not listed in the minVersions
 *   always returns false
 */

const recommendedBrowser = () => !bowser.isUnsupportedBrowser(minVersions, true);

export {
    supportedBrowser as default,
    recommendedBrowser
};
