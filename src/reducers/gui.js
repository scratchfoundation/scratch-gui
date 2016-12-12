const {combineReducers} = require('redux');

module.exports = combineReducers({
    modals: require('./modals'),
    targets: require('./targets')
});
