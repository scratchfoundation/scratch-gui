import bowser from 'bowser';

/**
 * Helper function to determine if the browser is supported.
 * @returns {boolean} False if the platform is definitely not supported.
 */
export default function () {
    if (bowser.msie ||
        bowser.opera ||
        bowser.silk) {
        return false;
    }
    // IMPORTANT: If you change versions here, also change them in www
    // minimum versions for recommended browsers
    const minVersions = {
        chrome: '63',
        msedge: '15',
        firefox: '57',
        safari: '11'
    };
    // strict mode == false so any browser not mentioned in the min Versions is ok
    return bowser.check(minVersions, false);
}
