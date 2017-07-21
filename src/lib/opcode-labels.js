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
    looks_costumeorder: {
        category: 'looks',
        label: 'costume #'
    },
    looks_backdroporder: {
        category: 'looks',
        label: 'backdrop #'
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
    sensing_loudness: {
        category: 'sensing',
        label: 'loudness'
    },
    sensing_of: {
        category: 'sensing',
        labelFn: params => `${params.PROPERTY} of ${params.OBJECT}`
    },
    sensing_current: {
        category: 'sensing',
        labelFn: params => params.CURRENTMENU.toLowerCase()
    },
    sensing_timer: {
        category: 'sensing',
        label: 'timer'
    }
};

export default function (opcode) {
    if (opcode in opcodeMap) return opcodeMap[opcode];
    return {
        category: 'data',
        label: opcode
    };
}
