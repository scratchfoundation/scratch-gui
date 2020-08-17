// Check our dependencies to make sure we are using the TurboWarp versions forks.
// This is a development tool -- users should never see these messages.

/* eslint-disable */

import VirtualMachine from 'scratch-vm';
import RenderWebGL from 'scratch-render';

if (!VirtualMachine.isTurboWarp) {
    alert('The installed scratch-vm is not the TurboWarp fork.');
    console.error('The installed scratch-vm is not the TurboWarp fork.');
}

if (!RenderWebGL.isTurboWarp) {
    alert('The installed scratch-render is not the TurboWarp fork.');
    console.error('The installed scratch-render is not the TurboWarp fork.');
}
