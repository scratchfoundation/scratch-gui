const ScratchBlocks = require('scratch-blocks');

module.exports = function (vm) {

    const jsonForMenuBlock = function (name, menuOptionsFn, colors) {
        return {
            message0: '%1',
            args0: [
                {
                    type: 'field_dropdown',
                    name: name,
                    options: menuOptionsFn
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
        return vm.editingTarget.sprite.sounds.map(sound => [sound.name, sound.name]);
    };

    const costumesMenu = function () {
        return vm.editingTarget.sprite.costumes.map(costume => [costume.name, costume.name]);
    };

    const backdropsMenu = function () {
        return vm.runtime.targets[0].sprite.costumes.map(costume => [costume.name, costume.name]);
    };

    const soundColors = ScratchBlocks.Colours.sounds;

    const looksColors = ScratchBlocks.Colours.looks;

    ScratchBlocks.Blocks.sound_sounds_menu.init = function () {
        const json = jsonForMenuBlock('SOUND_MENU', soundsMenu, soundColors);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.looks_costume.init = function () {
        const json = jsonForMenuBlock('COSTUME', costumesMenu, looksColors);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.looks_backdrops.init = function () {
        const json = jsonForMenuBlock('BACKDROP', backdropsMenu, looksColors);
        this.jsonInit(json);
    };

    return ScratchBlocks;
};
