const myFlash = { block: null, timerID: null };
var locateBlock = window.locateBlock = function locateBlock(blockOrId) {
    function flash(block) {
        if (myFlash.timerID > 0) {
            clearTimeout(myFlash.timerID);
            if (myFlash.block.svgPath_) {
                myFlash.block.svgPath_.style.fill = "";
            }
        }

        let count = 4;
        let flashOn = true;
        myFlash.block = block;

        /**
         * Internal method to switch the colour of a block between light yellow and it's original colour
         * @private
         */
        function _flash() {
            if (myFlash.block.svgPath_) {
                myFlash.block.svgPath_.style.fill = flashOn ? "#ffff80" : "";
            }
            flashOn = !flashOn;
            count--;
            if (count > 0) {
                myFlash.timerID = setTimeout(_flash, 200);
            } else {
                myFlash.timerID = 0;
                myFlash.block = null;
            }
        }

        _flash();
    }
    function getTopOfStackFor(block) {
        let base = block;
        while (base.getOutputShape() && base.getSurroundParent()) {
            base = base.getSurroundParent();
        }
        return base;
    }
    let workspace = ScratchBlocks.getMainWorkspace()

    let block = workspace.getBlockById(blockOrId);

    if (!block) {
        console.log("Block does not exist.")
        return;
    }

    /**
     * !Blockly.Block
     */
    let root = block.getRootBlock();
    let base = getTopOfStackFor(block);
    let ePos = base.getRelativeToSurfaceXY(), // Align with the top of the block
        rPos = root.getRelativeToSurfaceXY(), // Align with the left of the block 'stack'
        scale = workspace.scale,
        x = rPos.x * scale,
        y = ePos.y * scale,
        xx = block.width + x, // Turns out they have their x & y stored locally, and they are the actual size rather than scaled or including children...
        yy = block.height + y,
        s = workspace.getMetrics();
    if (
        x < s.viewLeft + 32 - 4 ||
        xx > s.viewLeft + s.viewWidth ||
        y < s.viewTop + 32 - 4 ||
        yy > s.viewTop + s.viewHeight
    ) {
        // sx = s.contentLeft + s.viewWidth / 2 - x,
        let sx = x - s.contentLeft - 32,
            // sy = s.contentTop - y + Math.max(Math.min(32, 32 * scale), (s.viewHeight - yh) / 2);
            sy = y - s.contentTop - 32;

        // workspace.hideChaff(),
        workspace.scrollbar.set(sx, sy);
    }
    ScratchBlocks?.hideChaff();
    flash(block);
}
module.exports = {
    func: () => {
        if (localStorage.getItem("locator") !== "true") {
            return;
        }
        var prevQuery = "";
        var idx = 0;
        var tabsList = document.querySelector(`div[data-tabs="true"]>ul[role="tablist"]`);
        var searchContainer = document.createElement("li");
        var searchBox = document.createElement("input");
        searchBox.style = "margin-bottom: 5%; margin-left: 1rem";
        searchBox.addEventListener("keyup", (ev) => {
            if (ev.key !== "Enter") { 
                return 
            }

            var value = searchBox.value;
            idx += 1;
            if (value != prevQuery) {
                prevQuery = value;
                idx = 0;
            }
            var workspace = ScratchBlocks.getMainWorkspace();
            var results = workspace.getAllBlocks().filter((block) => {
                return block.type.toLowerCase() === value.toLowerCase() || block.id === value || `${block.procCode_}`.toLowerCase() === value.toLowerCase() || block.getVars().includes(value);
            });
            if (results.length > 0) {
                idx = idx % results.length;
                locateBlock(results[idx].id);
            }
        });
        searchContainer.appendChild(searchBox);
        tabsList.appendChild(searchContainer);
    }
}