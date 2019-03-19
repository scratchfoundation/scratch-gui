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
                        return start.concat(menuOptionsFn());
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


    const jsonForSensingMenus = function (menuOptionsFn) {
        return {
            message0: ScratchBlocks.Msg.SENSING_OF,
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'PROPERTY',
                    options: function () {
                        return menuOptionsFn();
                    }

                },
                {
                    type: 'input_value',
                    name: 'OBJECT'
                }
            ],
            output: true,
            colour: ScratchBlocks.Colours.sensing.primary,
            colourSecondary: ScratchBlocks.Colours.sensing.secondary,
            colourTertiary: ScratchBlocks.Colours.sensing.tertiary,
            outputShape: ScratchBlocks.OUTPUT_SHAPE_ROUND
        };
    };

    const soundsMenu = function () {
        let menu = [['', '']];
        if (vm.editingTarget && vm.editingTarget.sprite.sounds.length > 0) {
            menu = vm.editingTarget.sprite.sounds.map(sound => [sound.name, sound.name]);
        }
        menu.push([
            ScratchBlocks.ScratchMsgs.translate('SOUND_RECORD', 'record...'),
            ScratchBlocks.recordSoundCallback
        ]);
        return menu;
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

    ScratchBlocks.Blocks.sensing_of.init = function () {
        const blockId = this.id;
        // Function that fills in menu for the first input in the sensing block.
        // Called every time it opens since it depends on the values in the other block input.
        const menuFn = function () {
            const stageOptions = [
                [ScratchBlocks.Msg.SENSING_OF_BACKDROPNUMBER, 'backdrop #'],
                [ScratchBlocks.Msg.SENSING_OF_BACKDROPNAME, 'backdrop name'],
                [ScratchBlocks.Msg.SENSING_OF_VOLUME, 'volume']
            ];
            const spriteOptions = [
                [ScratchBlocks.Msg.SENSING_OF_XPOSITION, 'x position'],
                [ScratchBlocks.Msg.SENSING_OF_YPOSITION, 'y position'],
                [ScratchBlocks.Msg.SENSING_OF_DIRECTION, 'direction'],
                [ScratchBlocks.Msg.SENSING_OF_COSTUMENUMBER, 'costume #'],
                [ScratchBlocks.Msg.SENSING_OF_COSTUMENAME, 'costume name'],
                [ScratchBlocks.Msg.SENSING_OF_SIZE, 'size'],
                [ScratchBlocks.Msg.SENSING_OF_VOLUME, 'volume']
            ];
            if (vm.editingTarget) {
                let lookupBlocks = vm.editingTarget.blocks;
                let sensingOfBlock = lookupBlocks.getBlock(blockId);

                // The block doesn't exist, but should be in the flyout. Look there.
                if (!sensingOfBlock) {
                    sensingOfBlock = vm.runtime.flyoutBlocks.getBlock(blockId);
                    // If we still don't have a block, just return an empty list . This happens during
                    // scratch blocks construction.
                    if (!sensingOfBlock) {
                        return [['', '']];
                    }
                    // The block was in the flyout so look up future block info there.
                    lookupBlocks = vm.runtime.flyoutBlocks;
                }
                const sort = function (options) {
                    options.sort(ScratchBlocks.scratchBlocksUtils.compareStrings);
                };
                // Get all the stage variables (no lists) so we can add them to menu when the stage is selected.
                const stageVariableOptions = vm.runtime.getTargetForStage().getAllVariableNamesInScopeByType('');
                sort(stageVariableOptions);
                const stageVariableMenuItems = stageVariableOptions.map(variable => [variable, variable]);
                if (sensingOfBlock.inputs.OBJECT.shadow !== sensingOfBlock.inputs.OBJECT.block) {
                    // There's a block dropped on top of the menu. It'd be nice to evaluate it and
                    // return the correct list, but that is tricky. Scratch2 just returns stage options
                    // so just do that here too.
                    return stageOptions.concat(stageVariableMenuItems);
                }
                const menuBlock = lookupBlocks.getBlock(sensingOfBlock.inputs.OBJECT.shadow);
                const selectedItem = menuBlock.fields.OBJECT.value;
                if (selectedItem === '_stage_') {
                    return stageOptions.concat(stageVariableMenuItems);
                }
                // Get all the local variables (no lists) and add them to the menu.
                const target = vm.runtime.getSpriteTargetByName(selectedItem);
                let spriteVariableOptions = [];
                // The target should exist, but there are ways for it not to (e.g. #4203).
                if (target) {
                    spriteVariableOptions = target.getAllVariableNamesInScopeByType('', true);
                    sort(spriteVariableOptions);
                }
                const spriteVariableMenuItems = spriteVariableOptions.map(variable => [variable, variable]);
                return spriteOptions.concat(spriteVariableMenuItems);
            }
            return [['', '']];
        };

        const json = jsonForSensingMenus(menuFn);
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

    ScratchBlocks.FieldNote.playNote_ = function (noteNum, extensionId) {
        vm.runtime.emit('PLAY_NOTE', noteNum, extensionId);
    };

    // Use a collator's compare instead of localeCompare which internally
    // creates a collator. Using this is a lot faster in browsers that create a
    // collator for every localeCompare call.
    const collator = new Intl.Collator([], {
        sensitivity: 'base',
        numeric: true
    });
    ScratchBlocks.scratchBlocksUtils.compareStrings = function (str1, str2) {
        return collator.compare(str1, str2);
    };

    // Default font returned from CanvasRendering2DContext.font.
    const SPEC_DEFAULT_FONT = '10px sans-serif';

    // Convert a CSSStyleDecoration into an object without hyphenated keys for
    // iterating font strings.
    const fontMembers = ({
        font: font,
        'font-style': style = 'normal',
        'font-varient': variant = 'normal',
        'font-weight': weight = 'normal',
        'font-stretch': stretch = 'normal',
        'font-size': size,
        'line-height': lineHeight = 'normal',
        'font-family': family
    }) => ({
        font,
        style,
        variant,
        weight,
        stretch,
        size,
        lineHeight,
        family
    });

    // Set of functions that produce font strings for
    // CanvasRendering2DContext.font.
    const fontFormats = [
        // Not all browsers (i.e. Firefox) produce this value.
        ({font}) => font,

        // Same value as `font` that is produced by some browsers.
        ({style, variant, weight, stretch, size, lineHeight, family}) => (
            `${style} ${variant} ${weight} ${stretch} ${size} / ${lineHeight} ${family}`
        ),

        // Remove line height. It will not effect width anyways.
        ({style, variant, weight, stretch, size, family}) => (
            `${style} ${variant} ${weight} ${stretch} ${size} ${family}`
        ),

        // Remove style. That is for italics or oblique fonts. It should not
        // effect width.
        ({variant, weight, stretch, size, family}) => (
            `${variant} ${weight} ${stretch} ${size} ${family}`
        ),

        // Remove variant. That can change text width but we don't use any
        // variants.
        ({weight, stretch, size, family}) => (
            `${weight} ${stretch} ${size} ${family}`
        ),

        // Remove stretch. That can change text width but we don't stretch the
        // text through the font css keys.
        ({weight, size, family}) => `${weight} ${size} ${family}`,

        // Removing any of the last three would report measure text incorrectly.
        () => {
            throw new Error('Could not initialiaze text measuring canvas.');
        }
    ];

    // Find a font string that the browser accepts.
    const findFontString = function (context, computedStyle) {
        const _members = fontMembers(computedStyle);
        for (
            let i = 0;
            context.font === SPEC_DEFAULT_FONT && i < fontFormats.length;
            i++
        ) {
            context.font = fontFormats[i](_members);
        }
    };

    // A cache of element class name to text content/text width pairs.
    const textRenderCache = {};

    // Cache of canvases with assigned font values to deter text widths with.
    const fontCanvas = {};

    // Initialize some canvases for measuring text widths.
    const initMetrics = (classNames, element) => {
        let root = document.body;
        if (element.getRootNode().tagName === 'document') {
            root = element.parentElement;
        }

        const parent = document.createElementNS(ScratchBlocks.SVG_NS, 'g');
        const clones = [];
        for (let i = 0; i < classNames.length; i++) {
            const className = classNames[i];
            const elementClone = element.cloneNode();
            elementClone.className.baseVal = className;
            clones.push(elementClone);
            parent.appendChild(elementClone);

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            fontCanvas[className] = context;
            textRenderCache[className] = {};
        }

        root.appendChild(parent);

        try {
            for (let i = 0; i < classNames.length; i++) {
                const className = classNames[i];
                try {
                    // Using CanvasRendering2DContext.measureText does not have
                    // the DOM style and layout cost that getComputedTextLength
                    // has. getComputedStyle does have that cost though. So
                    // calling initMetrics with all the classes to initialize
                    // reduces the times we'll incure the style and layout cost
                    // for getComputedStyle.
                    const computedStyle = window.getComputedStyle(clones[i]);
                    const context = fontCanvas[className];

                    findFontString(context, computedStyle);
                } catch (e) {
                    // console.warn(
                    //     'Failed to find a font string to measure text ' +
                    //     'through context.measureText with.',
                    //     e
                    // );

                    // Replace the canvas context with a mock object that always
                    // returns a width of 0.
                    fontCanvas[className] = {
                        measureText () {
                            return {
                                width: 0
                            };
                        }
                    };
                }
            }
        } finally {
            root.removeChild(parent);
        }
    };

    // Hold on to the original getCachedWidth. We may fallback to it if
    // measureText reports a width of 0.
    const _getCachedWidth = ScratchBlocks.Field.getCachedWidth;

    // Replace Field.getCachedWidth. Use a nested cache, it'll be faster than
    // concatenating a key every visit to this function. Use TextMetrics from
    // 2D Canvas.
    ScratchBlocks.Field.getCachedWidth = function (text) {
        const className = text.className.baseVal;
        const textContent = text.textContent;
        if (textRenderCache[className]) {
            const _cached = textRenderCache[className][textContent];
            if (_cached) {
                return _cached;
            }

            const metrics = fontCanvas[className].measureText(textContent);
            textRenderCache[className][textContent] =
                metrics.width || _getCachedWidth.call(this, text);
            return textRenderCache[className][textContent];
        }

        if (
            className === 'blocklyFlyoutLabelText' ||
            className === 'blocklyText' ||
            className === 'blocklyText blocklyDropdownText'
        ) {
            // These three are commonly used so lets initialize them together.
            // This will reduce the cost of DOM style and layout while
            // determining the font.
            initMetrics(['blocklyFlyoutLabelText', 'blocklyText', 'blocklyText blocklyDropdownText'], text);
        } else {
            initMetrics([className], text);
        }

        const metrics = fontCanvas[className].measureText(textContent);
        textRenderCache[className][textContent] =
            metrics.width || _getCachedWidth.call(this, text);
        return textRenderCache[className][textContent];
    };

    return ScratchBlocks;
}
