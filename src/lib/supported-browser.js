import platform from 'platform';

/**
 * Helper function to determine if the browser is supported.
 * @returns {boolean} False if the platform is definitely not supported.
 */
export default function () {
    if (platform.name === 'IE' ||
        platform.name === 'Opera' ||
        platform.name === 'Opera Mini' ||
        platform.name === 'Silk') {
        return false;
    }
    // @todo Should also test for versions of supported browsers
    return true;
}
