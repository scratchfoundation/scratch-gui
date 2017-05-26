/**
 * Convert monitors from VM format to what the GUI needs to render.
 * - Convert opcode to a label and a category
 * - Add missing XY position data if needed
 */
const OpcodeLabels = require('./opcode-labels.js');
const MonitorRecord = require('./monitor-record');

const PADDING = 5;
const MONITOR_HEIGHT = 23;

const isUndefined = a => typeof a === 'undefined';

module.exports = function ({id, opcode, params, value, x, y}) {
    let {label, category, labelFn} = OpcodeLabels(opcode);

    // Use labelFn if provided for dynamic labelling (e.g. variables)
    if (!isUndefined(labelFn)) label = labelFn(params);

    // @todo fix layout
    const index = 0;
    if (isUndefined(x)) x = PADDING;
    if (isUndefined(y)) y = PADDING + (index * (PADDING + MONITOR_HEIGHT));

    return MonitorRecord({id, label, category, value, x, y});
};
