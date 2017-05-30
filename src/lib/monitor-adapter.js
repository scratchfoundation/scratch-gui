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

module.exports = function ([key, {id, opcode, params, value, x, y}], index) {
    let {label, category, labelFn} = OpcodeLabels(opcode);

    // Use labelFn if provided for dynamic labelling (e.g. variables)
    if (!isUndefined(labelFn)) label = labelFn(params);

    // Simple layout if x or y are undefined
    // @todo scratch2 has a more complex layout behavior we may want to adopt
    // @todo e.g. this does not work well when monitors have already been moved
    if (isUndefined(x)) x = PADDING;
    if (isUndefined(y)) y = PADDING + (index * (PADDING + MONITOR_HEIGHT));

    return [key, MonitorRecord({id, label, category, value, x, y})];
};
