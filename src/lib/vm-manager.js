const bindAll = require('lodash.bindall');

class VMManager {
    constructor (vm) {
        bindAll(this, [
            'attachKeyboardEvents',
            'detachKeyboardEvents',
            'onKeyDown',
            'onKeyUp'
        ]);
        this.vm = vm;
    }
    attachKeyboardEvents () {
        // Feed keyboard events as VM I/O events.
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
    }
    detachKeyboardEvents () {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keyup', this.onKeyUp);
    }
    onKeyDown (e) {
        // Don't capture keys intended for Blockly inputs.
        if (e.target !== document && e.target !== document.body) {
            return;
        }
        this.vm.postIOData('keyboard', {
            keyCode: e.keyCode,
            isDown: true
        });
        e.preventDefault();
    }
    onKeyUp (e) {
        // Always capture up events,
        // even those that have switched to other targets.
        this.vm.postIOData('keyboard', {
            keyCode: e.keyCode,
            isDown: false
        });

        // E.g., prevent scroll.
        if (e.target !== document && e.target !== document.body) {
            e.preventDefault();
        }
    }
}

module.exports = VMManager;
