const {combineReducers} = require('redux');

module.exports = combineReducers({
    modals: require('./modals'),
    monitors: require('./monitors'),
    targets: require('./targets'),
    vm: require('./vm')
});
