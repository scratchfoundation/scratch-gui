import ScratchBlocks from 'scratch-blocks';

const opcodeMap = {
    // Motion
    motion_direction: {
        category: 'motion',
        labelFn: () => ScratchBlocks.ScratchMsgs.translate('MOTION_DIRECTION', 'direction')
    },
    motion_xposition: {
        category: 'motion',
        labelFn: () => ScratchBlocks.ScratchMsgs.translate('MOTION_XPOSITION', 'x postion')
    },
    motion_yposition: {
        category: 'motion',
        labelFn: () => ScratchBlocks.ScratchMsgs.translate('MOTION_YPOSITION', 'y postion')
    },

    // Looks
    looks_size: {
        category: 'looks',
        labelFn: () => ScratchBlocks.ScratchMsgs.translate('LOOKS_SIZE', 'size')
    },
    looks_costumenumbername: {
        category: 'looks',
        labelFn: params => {
            let label = ScratchBlocks.ScratchMsgs.translate(
                'LOOKS_COSTUMENUMBERNAME',
                'costume %1'
            );
            if (params.NUMBER_NAME === 'number') {
                label = label.replace(/%1/, ScratchBlocks.ScratchMsgs.translate(
                    'LOOKS_NUMBERNAME_NUMBER', 'number'));
            } else {
                label = label.replace(/%1/, ScratchBlocks.ScratchMsgs.translate(
                    'LOOKS_NUMBERNAME_NAME', 'name'));
            }
            return label;
        }
    },
    looks_backdropnumbername: {
        category: 'looks',
        labelFn: params => {
            let label = ScratchBlocks.ScratchMsgs.translate(
                'LOOKS_BACKDROPNUMBERNAME',
                'costume %1'
            );
            if (params.NUMBER_NAME === 'number') {
                label = label.replace(/%1/, ScratchBlocks.ScratchMsgs.translate(
                    'LOOKS_NUMBERNAME_NUMBER', 'number'));
            } else {
                label = label.replace(/%1/, ScratchBlocks.ScratchMsgs.translate(
                    'LOOKS_NUMBERNAME_NAME', 'name'));
            }
            return label;
        }
    },
    looks_backdropname: {
        category: 'looks',
        labelFn: () => ScratchBlocks.ScratchMsgs.translate('LOOKS_BACKDROPNAME', 'backdrop name')
    },

    // Data
    data_variable: {
        category: 'data',
        labelFn: params => params.VARIABLE
    },
    data_listcontents: {
        category: 'list',
        labelFn: params => params.LIST
    },

    // Sound
    sound_volume: {
        category: 'sound',
        labelFn: () => ScratchBlocks.ScratchMsgs.translate('SOUND_VOLUME', 'volume')
    },
    sound_tempo: {
        category: 'sound',
        labelFn: () => ScratchBlocks.ScratchMsgs.translate('SOUND_TEMPO', 'tempo')
    },

    // Sensing
    sensing_answer: {
        category: 'sensing',
        labelFn: () => ScratchBlocks.ScratchMsgs.translate('SENSING_ANSWER', 'answer')
    },
    sensing_loudness: {
        category: 'sensing',
        labelFn: () => ScratchBlocks.ScratchMsgs.translate('SENSING_LOUDNESS', 'loudness')
    },
    sensing_username: {
        category: 'sensing',
        labelFn: () => ScratchBlocks.ScratchMsgs.translate('SENSING_USERNAME', 'username')
    },
    sensing_current: {
        category: 'sensing',
        labelFn: params => {
            let currentMenu = params.CURRENTMENU.toUpperCase();
            currentMenu = ScratchBlocks.ScratchMsgs.translate(
                `SENSING_CURRENT_${currentMenu}`,
                currentMenu.toLowerCase()
            );
            if (currentMenu === 'dayofweek') {
                currentMenu = 'day of week';
            }
            return currentMenu;
        }
    },
    sensing_timer: {
        category: 'sensing',
        labelFn: () => ScratchBlocks.ScratchMsgs.translate('SENSING_TIMER', 'timer')
    }
};

/**
 * Get the label for an opcode
 * @param {string} opcode the opcode you want a label for
 * @return {object} object with label and category
 */
export default function (opcode) {
    if (opcode in opcodeMap) return opcodeMap[opcode];
    return {
        category: 'data',
        label: opcode
    };
}
