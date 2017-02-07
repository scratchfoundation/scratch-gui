const ScratchBlocks = require('scratch-blocks');

module.exports = function (vm) {
    ScratchBlocks.Blocks.sound_sounds_menu.init = function () {
        this.jsonInit(
            {
                message0: '%1',
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'SOUND_MENU',
                        options: function () {
                            const menu = vm.editingTarget.sprite.sounds.map(sound => [sound.name, sound.name]);
                            menu.unshift(['select...', '0']);
                            return menu;
                        }
                    }
                ],
                inputsInline: true,
                output: 'String',
                colour: ScratchBlocks.Colours.sounds.secondary,
                colourSecondary: ScratchBlocks.Colours.sounds.secondary,
                colourTertiary: ScratchBlocks.Colours.sounds.tertiary,
                outputShape: ScratchBlocks.OUTPUT_SHAPE_ROUND
            });
    };
    return ScratchBlocks;
};
