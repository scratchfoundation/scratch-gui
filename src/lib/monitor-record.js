const {Record} = require('immutable');

const MonitorRecord = Record({
    id: null,
    label: null,
    value: null,
    category: null,
    color: null,
    x: null,
    y: null
});

module.exports = MonitorRecord;
