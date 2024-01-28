function generateUID() {
    const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%()*+,-./:;=?@[]^_`{|}~";
    let result = "";
    for (let i = 0; i < 20; i++) {
        result += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    }
    return result;
}
class Col {
    /**
     * @param x {Number} x position (for ordering)
     * @param count {Number}
     * @param blocks {[Block]}
     */
    constructor(x, count, blocks) {
        /**
         * x position (for ordering)
         * @type {Number}
         */
        this.x = x;
        /**
         * @type {Number}
         */
        this.count = count;
        /**
         * @type {[Blockly.Block]}
         */
        this.blocks = blocks;
    }
}
class UndoGroup {
    /**
     * Start an Undo group - begin recording
     * @param workspace the workspace
     */
    static startUndoGroup(workspace) {
        const undoStack = workspace.undoStack_;
        if (undoStack.length) {
            undoStack[undoStack.length - 1]._devtoolsLastUndo = true;
        }
    }

    /**
     * End an Undo group - stops recording
     * @param workspace the workspace
     */
    static endUndoGroup(workspace) {
        const undoStack = workspace.undoStack_;
        // Events (responsible for undoStack updates) are delayed with a setTimeout(f, 0)
        // https://github.com/scratchfoundation/scratch-blocks/blob/f159a1779e5391b502d374fb2fdd0cb5ca43d6a2/core/events.js#L182
        setTimeout(() => {
            const group = generateUID();
            for (let i = undoStack.length - 1; i >= 0 && !undoStack[i]._devtoolsLastUndo; i--) {
                undoStack[i].group = group;
            }
        }, 0);
    }
}
module.exports = {
    func: function () {
        if (localStorage.getItem("cleanupplus") === "true") {
            function isBlockAnOrphan(topBlock) {
                return !!topBlock.outputConnection;
            }
            function getOrderedTopBlockColumns(separateOrphans) {
                let w = getWorkspace();
                let topBlocks = w.getTopBlocks();
                let maxWidths = {};

                if (separateOrphans) {
                    let topComments = w.getTopComments();

                    // todo: tie comments to blocks... find widths and width of block stack row...
                    for (const comment of topComments) {
                        // comment.autoPosition_();
                        // Hiding and showing repositions the comment right next to it's block - nice!
                        if (comment.setVisible) {
                            comment.setVisible(false);
                            comment.needsAutoPositioning_ = true;
                            comment.setVisible(true);

                            // let bb = comment.block_.svgPath_.getBBox();
                            let right = comment.getBoundingRectangle().bottomRight.x;

                            // Get top block for stack...
                            let root = comment.block_.getRootBlock();
                            let left = root.getBoundingRectangle().topLeft.x;
                            maxWidths[root.id] = Math.max(right - left, maxWidths[root.id] || 0);
                        }
                    }
                }

                // Default scratch ordering is horrid... Lets try something more clever.

                /**
                 * @type {Col[]}
                 */
                let cols = [];
                const TOLERANCE = 256;
                let orphans = { x: -999999, count: 0, blocks: [] };

                for (const topBlock of topBlocks) {
                    // let r = b.getBoundingRectangle();
                    let position = topBlock.getRelativeToSurfaceXY();
                    /**
                     * @type {Col}
                     */
                    let bestCol = null;
                    let bestError = TOLERANCE;

                    if (separateOrphans && isBlockAnOrphan(topBlock)) {
                        orphans.blocks.push(topBlock);
                        continue;
                    }

                    // Find best columns
                    for (const col of cols) {
                        let err = Math.abs(position.x - col.x);
                        if (err < bestError) {
                            bestError = err;
                            bestCol = col;
                        }
                    }

                    if (bestCol) {
                        // We found a column that we fitted into
                        bestCol.x = (bestCol.x * bestCol.count + position.x) / ++bestCol.count; // re-average the columns as more items get added...
                        bestCol.blocks.push(topBlock);
                    } else {
                        // Create a new column
                        cols.push(new Col(position.x, 1, [topBlock]));
                    }
                }

                // if (orphans.blocks.length > 0) {
                //     cols.push(orphans);
                // }

                // Sort columns, then blocks inside the columns
                cols.sort((a, b) => a.x - b.x);
                for (const col of cols) {
                    col.blocks.sort((a, b) => a.getRelativeToSurfaceXY().y - b.getRelativeToSurfaceXY().y);
                }

                return { cols: cols, orphans: orphans, maxWidths: maxWidths };
            }
            function getWorkspace() {
                return Blockly.getMainWorkspace();
            }
            const blockly = window.ScratchBlocks;
            const oldCleanUpFunc = blockly.WorkspaceSvg.prototype.cleanUp;

            blockly.WorkspaceSvg.prototype.cleanUp = function () {
                doCleanUp();
            };

            function doCleanUp(block) {
                let workspace = getWorkspace();
                let makeSpaceForBlock = block && block.getRootBlock();

                UndoGroup.startUndoGroup(workspace);

                let result = getOrderedTopBlockColumns(true);
                let columns = result.cols;
                let orphanCount = result.orphans.blocks.length;
                if (orphanCount > 0 && !block) {
                    let message = "Found " + orphanCount + " orphan blocks. Delete them?";
                    if (confirm(message)) {
                        for (const block of result.orphans.blocks) {
                            block.dispose();
                        }
                    } else {
                        columns.unshift(result.orphans);
                    }
                }

                let cursorX = 48;

                let maxWidths = result.maxWidths;

                for (const column of columns) {
                    let cursorY = 64;
                    let maxWidth = 0;

                    for (const block of column.blocks) {
                        let extraWidth = block === makeSpaceForBlock ? 380 : 0;
                        let extraHeight = block === makeSpaceForBlock ? 480 : 72;
                        let xy = block.getRelativeToSurfaceXY();
                        if (cursorX - xy.x !== 0 || cursorY - xy.y !== 0) {
                            block.moveBy(cursorX - xy.x, cursorY - xy.y);
                        }
                        let heightWidth = block.getHeightWidth();
                        cursorY += heightWidth.height + extraHeight;

                        let maxWidthWithComments = maxWidths[block.id] || 0;
                        maxWidth = Math.max(maxWidth, Math.max(heightWidth.width + extraWidth, maxWidthWithComments));
                    }

                    cursorX += maxWidth + 96;
                }

                let topComments = workspace.getTopComments();
                for (const comment of topComments) {
                    if (comment.setVisible) {
                        comment.setVisible(false);
                        comment.needsAutoPositioning_ = true;
                        comment.setVisible(true);
                    }
                }

                setTimeout(() => {
                    UndoGroup.endUndoGroup(workspace);
                }, 100);
            }
        }
    }
}