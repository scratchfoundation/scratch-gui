// Check our dependencies to make sure we are using the TurboWarp versions forks.
// This is a development tool. These messages should never be seen by users.

/* eslint-disable */

import VirtualMachine from 'scratch-vm';
import RenderWebGL from 'scratch-render';

if (!VirtualMachine.isTurboWarp) {
    console.error('The installed scratch-vm is not the TurboWarp fork.');
    alert('The installed scratch-vm is not the TurboWarp fork.');
}

if (!RenderWebGL.isTurboWarp) {
    console.error('The installed scratch-render is not the TurboWarp fork.');
    alert('The installed scratch-render is not the TurboWarp fork.');
}

var _twSelfCheck = 'bad';
try {
    eval('_twSelfCheck = "ok"');
} catch (e) { /* ignore */ }
if (_twSelfCheck !== 'ok') {
    // An adblocker or something is breaking eval()
    // Could also be Content-Security-Policy or something like that.
    console.error('eval() is broken. Most likely caused by a browser extension or your CSP.');
    alert('There is something wrong with how your browser is configured. Try turning off any adblockers and refreshing, otherwise TurboWarp will not work. (technical information: eval() is broken)');
}
