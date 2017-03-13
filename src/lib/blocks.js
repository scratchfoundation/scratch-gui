const ScratchBlocks = require('scratch-blocks');

module.exports = function (vm) {

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

    const soundsMenu = function () {
        const sounds = vm.editingTarget.sprite.sounds;
        if (sounds.length === 0) {
            return [['', '']];
        }
        return sounds.map(sound => [sound.name, sound.name]);
    };

    const costumesMenu = function () {
        return vm.editingTarget.sprite.costumes.map(costume => [costume.name, costume.name]);
    };

    const backdropsMenu = function () {
        return vm.runtime.targets[0].sprite.costumes.map(costume => [costume.name, costume.name]);
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
    
    const variableMenu = function () {
        if (this.getParent) {
            var variables = this.getParent().variables;
            var i = 0;
            var menu = [];
            for (i = 0; i < variables.length; i++) {
                menu.push([variables[i], variables[i]]);
            }
            return menu;
        }
    };

    const soundColors = ScratchBlocks.Colours.sounds;

    const looksColors = ScratchBlocks.Colours.looks;

    const motionColors = ScratchBlocks.Colours.motion;

    const sensingColors = ScratchBlocks.Colours.sensing;

    const controlColors = ScratchBlocks.Colours.control;

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

    ScratchBlocks.Blocks.motion_pointtowards_menu.init = function () {
        const json = jsonForMenuBlock('TOWARDS', spriteMenu, motionColors, [
            ['mouse-pointer', '_mouse_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.motion_goto_menu.init = function () {
        const json = jsonForMenuBlock('TO', spriteMenu, motionColors, [
            ['mouse-pointer', '_mouse_'],
            ['random position', '_random_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.sensing_of_object_menu.init = function () {
        const json = jsonForMenuBlock('OBJECT', spriteMenu, sensingColors, [
            ['Stage', '_stage_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.sensing_videoonmenutwo.init = function () {
        const json = jsonForMenuBlock('VIDEOONMENU2', spriteMenu, sensingColors, [
            ['stage', 'STAGE']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.sensing_distancetomenu.init = function () {
        const json = jsonForMenuBlock('DISTANCETOMENU', spriteMenu, sensingColors, [
            ['mouse-pointer', '_mouse_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.sensing_touchingobjectmenu.init = function () {
        const json = jsonForMenuBlock('TOUCHINGOBJECTMENU', spriteMenu, sensingColors, [
            ['mouse-pointer', '_mouse_'],
            ['edge', '_edge_']
        ]);
        this.jsonInit(json);
    };
    
    ScratchBlocks.Blocks.sensing_of.variables = [];
    
    ScratchBlocks.Blocks.sensing_of_object_menu.onchange = function () {
        if (this.getParent()) {
            var text = this.inputList[0].fieldRow[0].getText();
            var variablesObject = vm.runtime.getSpriteTargetByName(text).variables;
            var listsObject = vm.runtime.getSpriteTargetByName(text).lists;
            var variables = [];
            var x = 0;
            for (x in variablesObject) {
                variables.push(variablesObject[x].name);
            }
            for (x in listsObject) {
                variables.push(listsObject[x].name);
            }
            this.getParent().variables = variables;
        }
    }
    
    ScratchBlocks.Blocks.sensing_of_property_menu.init = function () {
        const json = jsonForMenuBlock('TOUCHINGOBJECTMENU', variableMenu, sensingColors, [
            ['x position', 'x position'],
            ['y position', 'y position'],
            ['direction', 'direction'],
            ['costume #', 'costume #'],
            ['costume name', 'costume name'],
            ['size', 'size'],
            ['volume', 'volume'],
            ['backdrop #', 'backdrop #'],
            ['backdrop name', 'backdrop name']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.control_create_clone_of_menu.init = function () {
        const json = jsonForMenuBlock('CLONE_OPTION', spriteMenu, controlColors, [
            ['myself', '_myself_']
        ]);
        this.jsonInit(json);
    };

    return ScratchBlocks;
};
