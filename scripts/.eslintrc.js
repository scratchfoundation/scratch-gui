const path = require('path');
module.exports = {
    extends: [path.resolve(__dirname, '..', '.eslintrc.js')],
    rules: {
        // NPM scripts are allowed to use console.log & friends
        'no-console': 'off'
    }
};
