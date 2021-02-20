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
