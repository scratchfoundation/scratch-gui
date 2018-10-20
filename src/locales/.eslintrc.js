const eslintrc = require('../.eslintrc.js')

Object.assign(eslintrc.rules, {
    'max-len': [0],
    'quotes': [0]
});

module.exports = eslintrc;
