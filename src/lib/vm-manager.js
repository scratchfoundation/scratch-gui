const ScratchBlocks = require('scratch-blocks');

module.exports = {
    attachWorkspace: function (vm, workspace) {
        workspace.addChangeListener(vm.blockListener);
        vm.on('STACK_GLOW_ON', data => workspace.glowStack(data.id, true));
        vm.on('STACK_GLOW_OFF', data => workspace.glowStack(data.id, false));
        vm.on('BLOCK_GLOW_ON', data => workspace.glowBlock(data.id, true));
        vm.on('BLOCK_GLOW_OFF', data => workspace.glowBlock(data.id, false));
        vm.on('VISUAL_REPORT', data => workspace.reportValue(data.id, data.value));
        vm.on('workspaceUpdate', data => {
            ScratchBlocks.Events.disable();
            workspace.clear();
            let dom = ScratchBlocks.Xml.textToDom(data.xml);
            ScratchBlocks.Xml.domToWorkspace(dom, workspace);
            ScratchBlocks.Events.enable();
        });
    },
    attachMouseEvents: function (vm, stage) {
        document.addEventListener('mousemove', function (e) {
            let rect = stage.getBoundingClientRect();
            let coordinates = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                canvasWidth: rect.width,
                canvasHeight: rect.height
            };
            vm.postIOData('mouse', coordinates);
        });
        stage.addEventListener('mousedown', function (e) {
            let rect = stage.getBoundingClientRect();
            let data = {
                isDown: true,
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                canvasWidth: rect.width,
                canvasHeight: rect.height
            };
            vm.postIOData('mouse', data);
            e.preventDefault();
        });
        stage.addEventListener('mouseup', function (e) {
            let rect = stage.getBoundingClientRect();
            let data = {
                isDown: false,
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                canvasWidth: rect.width,
                canvasHeight: rect.height
            };
            vm.postIOData('mouse', data);
            e.preventDefault();
        });
    },
    attachKeyboardEvents: function (vm) {
        // Feed keyboard events as VM I/O events.
        document.addEventListener('keydown', function (e) {
            // Don't capture keys intended for Blockly inputs.
            if (e.target != document && e.target != document.body) {
                return;
            }
            vm.postIOData('keyboard', {
                keyCode: e.keyCode,
                isDown: true
            });
            e.preventDefault();
        });
        document.addEventListener('keyup', function (e) {
            // Always capture up events,
            // even those that have switched to other targets.
            vm.postIOData('keyboard', {
                keyCode: e.keyCode,
                isDown: false
            });
            // E.g., prevent scroll.
            if (e.target != document && e.target != document.body) {
                e.preventDefault();
            }
        });
    }
};
