import EventTargetShim from './event-target';

// Legacy Edge does not support BroadcastChannel.
// We only bother checking to make sure nothing errors. Users should update their browser if they want things to work.
let _BroadcastChannel = window.BroadcastChannel;
if (!_BroadcastChannel) {
    _BroadcastChannel = class extends EventTargetShim {
        constructor (name) {
            super();
            this.name = name;
        }
        postMessage () {

        }
    };
}

const changeChannel = new _BroadcastChannel('addons-change');
const reloadChannel = new _BroadcastChannel('addons-reload');

export default {
    changeChannel,
    reloadChannel
};
