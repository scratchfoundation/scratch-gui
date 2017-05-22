/**
 * Convert monitors from VM format to what the GUI needs to render.
 * - Convert opcode to a label and a category
 * - Add missing XY position data if needed
 */
const log = require('./log');

const OpcodeLabels = require('../lib/opcode-labels.js');

const PADDING = 5;
const MONITOR_HEIGHT = 23;

const isUndefined = a => typeof a === 'undefined';

module.exports = function ({id, opcode, value, x, y}, monitorIndex) {

    // Look up category and label from opcode label file
    let opcodeData = OpcodeLabels[opcode];
    if (isUndefined(opcodeData)) {
        log.error(`No category/label found for opcode: ${opcode}`);
        opcodeData = {category: 'data', label: opcode};
    }
    const {label, category} = opcodeData;

    // Simple layout if x or y are undefined
    // @todo scratch2 has a more complex layout behavior we may want to adopt
    if (isUndefined(x)) x = PADDING;
    if (isUndefined(y)) y = PADDING + (monitorIndex * (PADDING + MONITOR_HEIGHT));

    return {id, label, category, value, x, y};
};
