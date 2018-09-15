import ScratchBlocks from 'scratch-blocks';

/**
 * Connect scratch blocks with the vm
 * @param {VirtualMachine} vm - The scratch vm
 * @return {ScratchBlocks} ScratchBlocks connected with the vm
 */
export default function (vm) {

    const jsonForMenuBlock = function (name, menuOptionsFn, colors, start) {
        return {
            message0: '%1',
            args0: [
                {
                    type: 'field_dropdown',
                    name: name,
                    options: function () {
                        return start.concat(menuOptionsFn(this));
                    }
                }
            ],
            inputsInline: true,
            output: 'String',
            colour: colors.secondary,
            colourSecondary: colors.secondary,
            colourTertiary: colors.tertiary,
            outputShape: ScratchBlocks.OUTPUT_SHAPE_ROUND
        };
    };

    const jsonForHatBlockMenu = function (hatName, name, menuOptionsFn, colors, start) {
        return {
            message0: hatName,
            args0: [
                {
                    type: 'field_dropdown',
                    name: name,
                    options: function () {
                        return start.concat(menuOptionsFn());
                    }
                }
            ],
            colour: colors.primary,
            colourSecondary: colors.secondary,
            colourTertiary: colors.tertiary,
            extensions: ['shape_hat']
        };
    };

    const soundsMenu = function () {
        if (vm.editingTarget && vm.editingTarget.sprite.sounds.length > 0) {
            return vm.editingTarget.sprite.sounds.map(sound => [sound.name, sound.name]);
        }
        return [['', '']];
    };

    const costumesMenu = function () {
        if (vm.editingTarget && vm.editingTarget.getCostumes().length > 0) {
            return vm.editingTarget.getCostumes().map(costume => [costume.name, costume.name]);
        }
        return [['', '']];
    };

    const backdropsMenu = function () {
        const next = ScratchBlocks.ScratchMsgs.translate('LOOKS_NEXTBACKDROP', 'next backdrop');
        const previous = ScratchBlocks.ScratchMsgs.translate('LOOKS_PREVIOUSBACKDROP', 'previous backdrop');
        const random = ScratchBlocks.ScratchMsgs.translate('LOOKS_RANDOMBACKDROP', 'random backdrop');
        if (vm.runtime.targets[0] && vm.runtime.targets[0].getCostumes().length > 0) {
            return vm.runtime.targets[0].getCostumes().map(costume => [costume.name, costume.name])
                .concat([[next, 'next backdrop'],
                    [previous, 'previous backdrop'],
                    [random, 'random backdrop']]);
        }
        return [['', '']];
    };

    const backdropNamesMenu = function () {
        const stage = vm.runtime.getTargetForStage();
        if (stage && stage.getCostumes().length > 0) {
            return stage.getCostumes().map(costume => [costume.name, costume.name]);
        }
        return [['', '']];
    };

    const spriteMenu = function () {
        const sprites = [];
        for (const targetId in vm.runtime.targets) {
            if (!vm.runtime.targets.hasOwnProperty(targetId)) continue;
            if (vm.runtime.targets[targetId].isOriginal) {
                if (!vm.runtime.targets[targetId].isStage) {
                    if (vm.runtime.targets[targetId] === vm.editingTarget) {
                        continue;
                    }
                    sprites.push([vm.runtime.targets[targetId].sprite.name, vm.runtime.targets[targetId].sprite.name]);
                }
            }
        }
        return sprites;
    };

    const cloneMenu = function () {
        if (vm.editingTarget && vm.editingTarget.isStage) {
            const menu = spriteMenu();
            if (menu.length === 0) {
                return [['', '']]; // Empty menu matches Scratch 2 behavior
            }
            return menu;
        }
        const myself = ScratchBlocks.ScratchMsgs.translate('CONTROL_CREATECLONEOF_MYSELF', 'myself');
        return [[myself, '_myself_']].concat(spriteMenu());
    };

    const variablePropertyMenu = function (thisValue) {
        // Fill the output array with sprite properties by default. This will be changed to stage properties if the
        // stage is selected.
        const xPosition = ScratchBlocks.ScratchMsgs.translate('SENSING_OF_XPOSITION', 'x position');
        const yPosition = ScratchBlocks.ScratchMsgs.translate('SENSING_OF_YPOSITION', 'y position');
        const direction = ScratchBlocks.ScratchMsgs.translate('SENSING_OF_DIRECTION', 'direction');
        const costumeNumber = ScratchBlocks.ScratchMsgs.translate('SENSING_OF_COSTUMENUMBER', 'costume #');
        const costumeName = ScratchBlocks.ScratchMsgs.translate('SENSING_OF_COSTUMENAME', 'costume name');
        const size = ScratchBlocks.ScratchMsgs.translate('SENSING_OF_SIZE', 'size');
        const volume = ScratchBlocks.ScratchMsgs.translate('SENSING_OF_VOLUME', 'volume');
        let output = [
            [xPosition, 'x position'],
            [yPosition, 'y position'],
            [direction, 'direction'],
            [costumeNumber, 'costume #'],
            [costumeName, 'costume name'],
            [size, 'size'],
            [volume, 'volume']
        ];

        const sourceBlock = thisValue.sourceBlock_; // This is the <shadow>.
        const ofBlock = sourceBlock && sourceBlock.parentBlock_; // This is the "of" block.
        if (ofBlock) {
            let block;
            let blocks;
            if (vm.editingTarget) {
                blocks = vm.editingTarget.blocks;
                block = blocks.getBlock(ofBlock.id);
            }
            if (!block) {
                // The block may be in the flyout.
                blocks = vm.runtime.flyoutBlocks;
                block = blocks.getBlock(ofBlock.id);
            }
            if (block) {
                // Get the shadow block of the OBJECT dropdown. If the block in the OBJECT slot is not a shadow block,
                // the slot must be occupied by an actual block; in this case, do nothing, and leave the default list
                // of sprite properties remaining.
                const objectInput = blocks.getInputs(block).OBJECT;
                const objectInputBlock = blocks.getBlock(objectInput.block);
                if (objectInputBlock.shadow) {
                    // Get the name of the object from the dropdown shadow block.
                    const valueField = blocks.getFields(objectInputBlock).OBJECT;
                    const objectName = valueField.value;

                    let target;

                    // If the stage is the selected object (of the dropdown), return properties relevant to it.
                    if (objectName === '_stage_') {
                        const backdropNumber = ScratchBlocks.ScratchMsgs.translate(
                            'SENSING_OF_BACKDROPNUMBER', 'backdrop #');
                        const backdropName = ScratchBlocks.ScratchMsgs.translate(
                            'SENSING_OF_BACKDROPNAME', 'backdrop name');
                        output = [
                            [backdropNumber, 'backdrop #'],
                            [backdropName, 'backdrop name'],
                            [volume, 'volume']
                        ];
                        target = vm.runtime.getTargetForStage();
                    } else {
                        target = vm.runtime.getSpriteTargetByName(objectName);
                    }

                    // Also return the object's local variables. In the case of the stage, these are the project's global
                    // variables.
                    if (target) {
                        // Pass true to skip the stage: we only want the sprite's own local variables.
                        const variableNames = target.getAllVariableNamesInScopeByType('', true);
                        variableNames.sort(ScratchBlocks.scratchBlocksUtils.compareStrings);
                        output = output.concat(variableNames.map(name => [name, name]));
                    }
                }
            }
        }
        return output;
    };

    const soundColors = ScratchBlocks.Colours.sounds;

    const looksColors = ScratchBlocks.Colours.looks;

    const motionColors = ScratchBlocks.Colours.motion;

    const sensingColors = ScratchBlocks.Colours.sensing;

    const controlColors = ScratchBlocks.Colours.control;

    const eventColors = ScratchBlocks.Colours.event;

    ScratchBlocks.Blocks.sound_sounds_menu.init = function () {
        const json = jsonForMenuBlock('SOUND_MENU', soundsMenu, soundColors, []);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.looks_costume.init = function () {
        const json = jsonForMenuBlock('COSTUME', costumesMenu, looksColors, []);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.looks_backdrops.init = function () {
        const json = jsonForMenuBlock('BACKDROP', backdropsMenu, looksColors, []);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.event_whenbackdropswitchesto.init = function () {
        const json = jsonForHatBlockMenu(
            ScratchBlocks.Msg.EVENT_WHENBACKDROPSWITCHESTO,
            'BACKDROP', backdropNamesMenu, eventColors, []);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.motion_pointtowards_menu.init = function () {
        const mouse = ScratchBlocks.ScratchMsgs.translate('MOTION_POINTTOWARDS_POINTER', 'mouse-pointer');
        const json = jsonForMenuBlock('TOWARDS', spriteMenu, motionColors, [
            [mouse, '_mouse_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.motion_goto_menu.init = function () {
        const random = ScratchBlocks.ScratchMsgs.translate('MOTION_GOTO_RANDOM', 'random position');
        const mouse = ScratchBlocks.ScratchMsgs.translate('MOTION_GOTO_POINTER', 'mouse-pointer');
        const json = jsonForMenuBlock('TO', spriteMenu, motionColors, [
            [random, '_random_'],
            [mouse, '_mouse_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.motion_glideto_menu.init = function () {
        const random = ScratchBlocks.ScratchMsgs.translate('MOTION_GLIDETO_RANDOM', 'random position');
        const mouse = ScratchBlocks.ScratchMsgs.translate('MOTION_GLIDETO_POINTER', 'mouse-pointer');
        const json = jsonForMenuBlock('TO', spriteMenu, motionColors, [
            [random, '_random_'],
            [mouse, '_mouse_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.sensing_of_object_menu.init = function () {
        const stage = ScratchBlocks.ScratchMsgs.translate('SENSING_OF_STAGE', 'Stage');
        const json = jsonForMenuBlock('OBJECT', spriteMenu, sensingColors, [
            [stage, '_stage_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.sensing_of_property_menu.init = function () {
        const json = jsonForMenuBlock('PROPERTY', variablePropertyMenu, sensingColors, []);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.sensing_distancetomenu.init = function () {
        const mouse = ScratchBlocks.ScratchMsgs.translate('SENSING_DISTANCETO_POINTER', 'mouse-pointer');
        const json = jsonForMenuBlock('DISTANCETOMENU', spriteMenu, sensingColors, [
            [mouse, '_mouse_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.sensing_touchingobjectmenu.init = function () {
        const mouse = ScratchBlocks.ScratchMsgs.translate('SENSING_TOUCHINGOBJECT_POINTER', 'mouse-pointer');
        const edge = ScratchBlocks.ScratchMsgs.translate('SENSING_TOUCHINGOBJECT_EDGE', 'edge');
        const json = jsonForMenuBlock('TOUCHINGOBJECTMENU', spriteMenu, sensingColors, [
            [mouse, '_mouse_'],
            [edge, '_edge_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.control_create_clone_of_menu.init = function () {
        const json = jsonForMenuBlock('CLONE_OPTION', cloneMenu, controlColors, []);
        this.jsonInit(json);
    };

    ScratchBlocks.VerticalFlyout.getCheckboxState = function (blockId) {
        const monitoredBlock = vm.runtime.monitorBlocks._blocks[blockId];
        return monitoredBlock ? monitoredBlock.isMonitored : false;
    };

    ScratchBlocks.FlyoutExtensionCategoryHeader.getExtensionState = function (extensionId) {
        if (vm.getPeripheralIsConnected(extensionId)) {
            return ScratchBlocks.StatusButtonState.READY;
        }
        return ScratchBlocks.StatusButtonState.NOT_READY;
    };

    return ScratchBlocks;
}
