// TODO: access `BlockType` and `ArgumentType` without reaching into VM
// Should we move these into a new extension support module or something?
import ArgumentType from 'scratch-vm/src/extension-support/argument-type';
import BlockType from 'scratch-vm/src/extension-support/block-type';
import ContextMenuContext from 'scratch-vm/src/extension-support/context-menu-context';
import log from './log.js';

const setupCustomContextMenu = (guiContext, ScratchBlocks, contextMenuInfo, extendedOpcode) => {
    // Handle custom context menu options
    const customContextMenuForBlock = {
        /**
         * Add any custom context menu options to the dynamic block being defined.
         * See Blockly.Extensions.apply in scratch-blocks/core/extensions.js
         * for how the block becomes `this` behind the scenes.
         * @param {!Array} options List of menu options to add to.
         * @this Blockly.Block
         */
        customContextMenu: function (options) {
            contextMenuInfo.forEach(contextOption => {
                const option = {
                    enabled: true,
                    text: contextOption.text,
                    callback: () => {
                        if (contextOption.builtInCallback) {
                            switch (contextOption.builtInCallback) {
                            case 'EDIT_A_PROCEDURE':
                                // TODO FILL THIS IN
                                // E.g. make use of guiContext here to bring up
                                // the edit custom proc modal
                                break;
                            case 'RENAME_A_VARIABLE':
                                // TODO FILL THIS IN
                                // E.g. make use of guiContext here to bring up
                                // the rename variable modal
                                break;
                            }
                        } else if (contextOption.callback) {
                            contextOption.callback({blockInfo: JSON.parse(this.blockInfoText)});
                        }
                    }
                };

                // Decide whether to add this item to the context menu
                // based on the context that the block is in and the
                // provided `context` property of the item.
                switch (contextOption.context) {
                case ContextMenuContext.TOOLBOX_ONLY:
                    if (this.isInFlyout) options.push(option);
                    break;
                case ContextMenuContext.WORKSPACE_ONLY:
                    if (!this.isInFlyout) options.push(option);
                    break;
                case ContextMenuContext.ALL:
                default:
                    options.push(option);
                }
            });
        }
    };
    const contextMenuName = `${extendedOpcode}_context_menu`;
    // TODO we need some way of registering a context menu option only once for
    // each block (see try catch below)
    // This is similar to the issue we have with re-registering block definitions.
    // See todo in containers/blocks.jsx, in `handleBlocksInfoUpdate`
    try {
        ScratchBlocks.Extensions.registerMixin(contextMenuName, customContextMenuForBlock);
    } catch (e) {
        log.warn("Context menu callback was already registered, but we're going to ignore this for now");
    }
    return contextMenuName;
};

/**
 * Define a block using extension info which has the ability to dynamically determine (and update) its layout.
 * This functionality is used for extension blocks which can change its properties based on different state
 * information. For example, the `control_stop` block changes its shape based on which menu item is selected
 * and a variable block changes its text to reflect the variable name without using an editable field.
 * @param {object} ScratchBlocks - The ScratchBlocks name space.
 * @param {object} categoryInfo - Information about this block's extension category, including any menus and icons.
 * @param {object} staticBlockInfo - The base block information before any dynamic changes.
 * @param {string} extendedOpcode - The opcode for the block (including the extension ID).
 */
// TODO: grow this until it can fully replace `_convertForScratchBlocks` in the VM runtime
const defineDynamicBlock = (guiContext, ScratchBlocks, categoryInfo, staticBlockInfo, extendedOpcode) => {
    // Set up context menus if any
    const contextMenuInfo = staticBlockInfo.info.customContextMenu;
    const contextMenuName = contextMenuInfo ?
        setupCustomContextMenu(guiContext, ScratchBlocks, staticBlockInfo.info.customContextMenu, extendedOpcode) : '';

    return ({
        init: function () {
            const blockJson = {
                type: extendedOpcode,
                inputsInline: true,
                category: categoryInfo.name,
                colour: categoryInfo.color1,
                colourSecondary: categoryInfo.color2,
                colourTertiary: categoryInfo.color3
            };
            // There is a scratch-blocks / Blockly extension called "scratch_extension" which adjusts the styling of
            // blocks to allow for an icon, a feature of Scratch extension blocks. However, Scratch "core" extension
            // blocks don't have icons and so they should not use 'scratch_extension'. Adding a scratch-blocks / Blockly
            // extension after `jsonInit` isn't fully supported (?), so we decide now whether there will be an icon.
            if (staticBlockInfo.blockIconURI || categoryInfo.blockIconURI) {
                blockJson.extensions = ['scratch_extension'];
            }

            if (contextMenuInfo) {
                blockJson.extensions = blockJson.extensions || [];
                blockJson.extensions.push(contextMenuName);
            }

            // initialize the basics of the block, to be overridden & extended later by `domToMutation`
            this.jsonInit(blockJson);
            // initialize the cached block info used to carry block info from `domToMutation` to `mutationToDom`
            this.blockInfoText = '{}';
            // we need a block info update (through `domToMutation`) before we have a completely initialized block
            this.needsBlockInfoUpdate = true;
            // Keep track of menu info for use in laying out the block and its menus
            this.menus = categoryInfo.convertedMenuInfo;
        },
        mutationToDom: function () {
            const container = document.createElement('mutation');
            container.setAttribute('blockInfo', this.blockInfoText);
            return container;
        },
        domToMutation: function (xmlElement) {
            const blockInfoText = xmlElement.getAttribute('blockInfo');
            if (!blockInfoText) return;
            if (!this.needsBlockInfoUpdate) {
                throw new Error('Attempted to update block info twice');
            }
            delete this.needsBlockInfoUpdate;

            // Parse blockInfoText, and add this block instance's id
            // to the blockInfoText we save back to this block.
            const blockInfo = JSON.parse(blockInfoText);
            blockInfo.id = this.id;
            this.blockInfoText = JSON.stringify(blockInfo);

            // Use the parsed blockInfo to layout the block

            switch (blockInfo.blockType) {
            case BlockType.COMMAND:
            case BlockType.CONDITIONAL:
            case BlockType.LOOP:
                this.setOutputShape(ScratchBlocks.OUTPUT_SHAPE_SQUARE);
                this.setPreviousStatement(true);
                this.setNextStatement(!blockInfo.isTerminal);
                break;
            case BlockType.REPORTER:
                this.setOutput(true);
                this.setOutputShape(ScratchBlocks.OUTPUT_SHAPE_ROUND);
                if (!blockInfo.disableMonitor) {
                    this.setCheckboxInFlyout(true);
                }
                break;
            case BlockType.BOOLEAN:
                this.setOutput(true);
                this.setOutputShape(ScratchBlocks.OUTPUT_SHAPE_HEXAGONAL);
                break;
            case BlockType.HAT:
            case BlockType.EVENT:
                this.setOutputShape(ScratchBlocks.OUTPUT_SHAPE_SQUARE);
                this.setNextStatement(true);
                break;
            }

            if (blockInfo.color1 || blockInfo.color2 || blockInfo.color3) {
                // `setColour` handles undefined parameters by adjusting defined colors
                this.setColour(blockInfo.color1, blockInfo.color2, blockInfo.color3);
            }

            // Layout block arguments
            // TODO handle E/C Blocks
            const blockText = blockInfo.text;
            const args = [];
            let argCount = 0;
            const scratchBlocksStyleText = blockText.replace(/\[(.+?)]/g, (match, argName) => {
                const arg = blockInfo.arguments[argName];
                switch (arg.type) {
                case ArgumentType.STRING:
                    if (arg.menu && !this.menus[arg.menu].acceptReporters) {
                        const options = this.menus[arg.menu].items;
                        args.push({type: 'field_dropdown', name: argName, options: options});
                    } else {
                        args.push({type: 'input_value', name: argName});
                    }
                    break;
                case ArgumentType.BOOLEAN:
                    args.push({type: 'input_value', name: argName, check: 'Boolean'});
                    break;
                }
                return `%${++argCount}`;
            });
            this.interpolate_(scratchBlocksStyleText, args);
        },
        setBlockInfo: function (blockInfo) {
            this.needsBlockInfoUpdate = true;
            this.blockInfoText = JSON.stringify(blockInfo);
            const mutation = this.mutationToDom();
            this.domToMutation(mutation);
        }
    });
};

export default defineDynamicBlock;
