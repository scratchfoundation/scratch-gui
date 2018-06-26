import bowser from 'bowser';

/**
 * Helper method to request full screen in the browser when on a tablet.
 */
export default function () {
    if (bowser.tablet) {
        if ((bowser.webkit || bowser.blink) && document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen();
        }
        if (bowser.gecko && document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        }
    }
}
