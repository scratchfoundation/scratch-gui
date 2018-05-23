const opcodeMap = {
    // Motion
    motion_direction: {
        category: 'motion',
        label: 'direction'
    },
    motion_xposition: {
        category: 'motion',
        label: 'x position'
    },
    motion_yposition: {
        category: 'motion',
        label: 'y position'
    },

    // Looks
    looks_size: {
        category: 'looks',
        label: 'size'
    },
    looks_costumenumbername: {
        category: 'looks',
        labelFn: params => `costume ${params.NUMBER_NAME}`
    },
    looks_backdropnumbername: {
        category: 'looks',
        labelFn: params => `backdrop ${params.NUMBER_NAME}`
    },
    looks_backdropname: {
        category: 'looks',
        label: 'backdrop name'
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
        label: 'volume'
    },
    sound_tempo: {
        category: 'sound',
        label: 'tempo'
    },

    // Sensing
    sensing_answer: {
        category: 'sensing',
        label: 'answer'
    },
    sensing_loudness: {
        category: 'sensing',
        label: 'loudness'
    },
    sensing_username: {
        category: 'sensing',
        label: 'username'
    },
    sensing_current: {
        category: 'sensing',
        labelFn: params => {
            let currentMenu = params.CURRENTMENU.toLowerCase();
            if (currentMenu === 'dayofweek') {
                currentMenu = 'day of week';
            }
            return currentMenu;
        }
    },
    sensing_timer: {
        category: 'sensing',
        label: 'timer'
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
