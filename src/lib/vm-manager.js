const bindAll = require('lodash.bindall');
const ScratchBlocks = require('scratch-blocks');

class VMManager {
    constructor (vm) {
        bindAll(
            this,
            ['attachWorkspace', 'attachMouseEvents', 'attachKeyboardEvents']
        );
        this.vm = vm;
    }
    attachWorkspace (workspace) {
        workspace.addChangeListener(this.vm.blockListener);
        var flyoutWorkspace = workspace.getFlyout().getWorkspace();
        flyoutWorkspace.addChangeListener(this.vm.flyoutBlockListener);
        this.vm.on('STACK_GLOW_ON', data => workspace.glowStack(data.id, true));
        this.vm.on('STACK_GLOW_OFF', data => workspace.glowStack(data.id, false));
        this.vm.on('BLOCK_GLOW_ON', data => workspace.glowBlock(data.id, true));
        this.vm.on('BLOCK_GLOW_OFF', data => workspace.glowBlock(data.id, false));
        this.vm.on('VISUAL_REPORT', data => workspace.reportValue(data.id, data.value));
        this.vm.on('workspaceUpdate', data => {
            ScratchBlocks.Events.disable();
            workspace.clear();
            let dom = ScratchBlocks.Xml.textToDom(data.xml);
            ScratchBlocks.Xml.domToWorkspace(dom, workspace);
            ScratchBlocks.Events.enable();
        });
    }
    attachMouseEvents (stage) {
        document.addEventListener('mousemove', e => {
            let rect = stage.getBoundingClientRect();
            let coordinates = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                canvasWidth: rect.width,
                canvasHeight: rect.height
            };
            this.vm.postIOData('mouse', coordinates);
        });
        stage.addEventListener('mousedown', e => {
            let rect = stage.getBoundingClientRect();
            let data = {
                isDown: true,
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                canvasWidth: rect.width,
                canvasHeight: rect.height
            };
            this.vm.postIOData('mouse', data);
            e.preventDefault();
        });
        stage.addEventListener('mouseup', e => {
            let rect = stage.getBoundingClientRect();
            let data = {
                isDown: false,
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                canvasWidth: rect.width,
                canvasHeight: rect.height
            };
            this.vm.postIOData('mouse', data);
            e.preventDefault();
        });
    }
    attachKeyboardEvents () {
        // Feed keyboard events as VM I/O events.
        document.addEventListener('keydown', e => {
            // Don't capture keys intended for Blockly inputs.
            if (e.target != document && e.target != document.body) {
                return;
            }
            this.vm.postIOData('keyboard', {
                keyCode: e.keyCode,
                isDown: true
            });
            e.preventDefault();
        });
        document.addEventListener('keyup', e => {
            // Always capture up events,
            // even those that have switched to other targets.
            this.vm.postIOData('keyboard', {
                keyCode: e.keyCode,
                isDown: false
            });
            // E.g., prevent scroll.
            if (e.target != document && e.target != document.body) {
                e.preventDefault();
            }
        });
    }
}

module.exports = VMManager;
