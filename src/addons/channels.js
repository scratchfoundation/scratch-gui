let changeChannel;
let reloadChannel;

if (typeof BroadcastChannel !== 'undefined') {
    changeChannel = new BroadcastChannel('addons-change');
    reloadChannel = new BroadcastChannel('addons-reload');
}

export default {
    changeChannel,
    reloadChannel
};
