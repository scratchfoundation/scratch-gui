import bowser from 'bowser';

/**
 * Helper function to determine if the browser is supported.
 * @returns {boolean} False if the platform is definitely not supported.
 */
export default function () {
    if (bowser.name === 'IE' ||
        bowser.name === 'Opera' ||
        bowser.name === 'Opera Mini' ||
        bowser.name === 'Silk') {
        return false;
    }
    // @todo Should also test for versions of supported browsers
    return true;
}
