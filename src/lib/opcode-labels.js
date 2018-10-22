import {defineMessages} from 'react-intl';

const messages = defineMessages({
    motion_direction: {
        defaultMessage: 'direction',
        description: 'Label for the direction monitor when shown on the stage',
        id: 'gui.opcodeLabels.direction'
    },
    motion_xposition: {
        defaultMessage: 'x position',
        description: 'Label for the x position monitor when shown on the stage',
        id: 'gui.opcodeLabels.xposition'
    },
    motion_yposition: {
        defaultMessage: 'y position',
        description: 'Label for the y position monitor when shown on the stage',
        id: 'gui.opcodeLabels.yposition'
    },

    // Looks
    looks_size: {
        defaultMessage: 'size',
        description: 'Label for the size monitor when shown on the stage',
        id: 'gui.opcodeLabels.size'
    },
    looks_costumename: {
        defaultMessage: 'costume name',
        description: 'Label for the costume name monitor when shown on the stage',
        id: 'gui.opcodeLabels.costumename'
    },
    looks_costumenumber: {
        defaultMessage: 'costume number',
        description: 'Label for the costume number monitor when shown on the stage',
        id: 'gui.opcodeLabels.costumenumber'
    },
    looks_backdropname: {
        defaultMessage: 'backdrop name',
        description: 'Label for the backdrop name monitor when shown on the stage',
        id: 'gui.opcodeLabels.backdropname'
    },
    looks_backdropnumber: {
        defaultMessage: 'backdrop number',
        description: 'Label for the backdrop number monitor when shown on the stage',
        id: 'gui.opcodeLabels.backdropnumber'
    },


    // Sound
    sound_volume: {
        defaultMessage: 'volume',
        description: 'Label for the volume monitor when shown on the stage',
        id: 'gui.opcodeLabels.volume'
    },
    sound_tempo: {
        defaultMessage: 'tempo',
        description: 'Label for the tempo monitor when shown on the stage',
        id: 'gui.opcodeLabels.tempo'
    },

    // Sensing
    sensing_answer: {
        defaultMessage: 'answer',
        description: 'Label for the answer monitor when shown on the stage',
        id: 'gui.opcodeLabels.answer'
    },
    sensing_loudness: {
        defaultMessage: 'loudness',
        description: 'Label for the loudness monitor when shown on the stage',
        id: 'gui.opcodeLabels.loudness'
    },
    sensing_username: {
        defaultMessage: 'username',
        description: 'Label for the username monitor when shown on the stage',
        id: 'gui.opcodeLabels.username'
    },
    sensing_current_year: {
        defaultMessage: 'year',
        description: 'Label for the current year monitor when shown on the stage',
        id: 'gui.opcodeLabels.year'
    },
    sensing_current_month: {
        defaultMessage: 'month',
        description: 'Label for the current month monitor when shown on the stage.',
        id: 'gui.opcodeLabels.month'
    },
    sensing_current_date: {
        defaultMessage: 'date',
        description: 'Label for the current date monitor when shown on the stage. Shows the current day of the month',
        id: 'gui.opcodeLabels.date'
    },
    sensing_current_dayofweek: {
        defaultMessage: 'dayofweek',
        description: 'Label for the current dayofweek monitor when shown on the stage',
        id: 'gui.opcodeLabels.dayofweek'
    },
    sensing_current_hour: {
        defaultMessage: 'hour',
        description: 'Label for the current hour monitor when shown on the stage',
        id: 'gui.opcodeLabels.hour'
    },
    sensing_current_minute: {
        defaultMessage: 'minute',
        description: 'Label for the current minute monitor when shown on the stage',
        id: 'gui.opcodeLabels.minute'
    },
    sensing_current_second: {
        defaultMessage: 'second',
        description: 'Label for the current second monitor when shown on the stage',
        id: 'gui.opcodeLabels.second'
    },
    sensing_timer: {
        defaultMessage: 'timer',
        description: 'Label for the timer monitor when shown on the stage',
        id: 'gui.opcodeLabels.timer'
    }
});

class OpcodeLabels {
    constructor () {
        /**
         * Translation function for labels. By default just return the defaultMessage
         * @private
         * @param {object} message A message object compatible with react-intl formatMessage
         * @return {string} Return the default string initially
         */
        this._translator = message => message.defaultMessage;

        /**
         * Initial opcode map, with categories defined
         * @private
         */
        this._opcodeMap = {
            // Motion
            motion_direction: {category: 'motion'},
            motion_xposition: {category: 'motion'},
            motion_yposition: {category: 'motion'},

            // Looks
            looks_size: {category: 'looks'},
            looks_costumenumbername: {category: 'looks'},
            looks_backdropnumbername: {category: 'looks'},
            looks_backdropname: {category: 'looks'},

            // Data
            data_variable: {category: 'data'},
            data_listcontents: {category: 'list'},

            // Sound
            sound_volume: {category: 'sound'},
            sound_tempo: {category: 'sound'},

            // Sensing
            sensing_answer: {category: 'sensing'},
            sensing_loudness: {category: 'sensing'},
            sensing_username: {category: 'sensing'},
            sensing_current: {category: 'sensing'},
            sensing_timer: {category: 'sensing'}
        };

        // Initialize opcodeMap with default strings
        this._refreshOpcodeMap();
    }

    /**
     * Set the translation function for monitor labels. The function should accept
     * a message object as defined by react-intl defineMessages
     * @param {function} translator the function to use for localization
     */
    setTranslatorFunction (translator) {
        this._translator = translator;
        this._refreshOpcodeMap();
    }

    /**
     * Internal function to update opcode Map when translation function is defined
     * @private
     */
    _refreshOpcodeMap () {
        // Motion
        this._opcodeMap.motion_direction.labelFn = () => this._translator(messages.motion_direction);
        this._opcodeMap.motion_xposition.labelFn = () => this._translator(messages.motion_xposition);
        this._opcodeMap.motion_yposition.labelFn = () => this._translator(messages.motion_yposition);

        // Looks
        this._opcodeMap.looks_size.labelFn = () => this._translator(messages.looks_size);
        this._opcodeMap.looks_costumenumbername.labelFn = params => {
            if (params.NUMBER_NAME === 'number') {
                return this._translator(messages.looks_costumenumber);
            }
            return this._translator(messages.looks_costumename);
        };
        this._opcodeMap.looks_backdropnumbername.labelFn = params => {
            if (params.NUMBER_NAME === 'number') {
                return this._translator(messages.looks_backdropnumber);
            }
            return this._translator(messages.looks_backdropname);
        };
        this._opcodeMap.looks_backdropname.labelFn = () => this._translator(messages.looks_backdropname);

        // Data
        this._opcodeMap.data_variable.labelFn = params => params.VARIABLE;
        this._opcodeMap.data_listcontents.labelFn = params => params.LIST;

        // Sound
        this._opcodeMap.sound_volume.labelFn = () => this._translator(messages.sound_volume);
        this._opcodeMap.sound_tempo.labelFn = () => this._translator(messages.sound_tempo);

        // Sensing
        this._opcodeMap.sensing_answer.labelFn = () => this._translator(messages.sensing_answer);
        this._opcodeMap.sensing_loudness.labelFn = () => this._translator(messages.sensing_loudness);
        this._opcodeMap.sensing_username.labelFn = () => this._translator(messages.sensing_username);
        this._opcodeMap.sensing_current.labelFn = params => {
            switch (params.CURRENTMENU) {
            case 'year':
                return this._translator(messages.sensing_current_year);
            case 'month':
                return this._translator(messages.sensing_current_month);
            case 'date':
                return this._translator(messages.sensing_current_date);
            case 'dayofweek':
                return this._translator(messages.sensing_current_dayofweek);
            case 'hour':
                return this._translator(messages.sensing_current_hour);
            case 'minute':
                return this._translator(messages.sensing_current_minute);
            case 'second':
                return this._translator(messages.sensing_current_second);
            }
        };
        this._opcodeMap.sensing_timer.labelFn = () => this._translator(messages.sensing_timer);
    }

    /**
     * Return the label for an opcode
     * @param {string} opcode the opcode you want a label for
     * @return {object} object with  label and category
     */
    getLabel (opcode) {
        if (opcode in this._opcodeMap) return this._opcodeMap[opcode];
        return {
            category: 'data',
            label: opcode
        };
    }
}

export default new OpcodeLabels();
