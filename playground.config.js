var config = require('./webpack.config');
module.exports = Object.assign({}, config, {
    entry: {
        playground: './src/playground.js'
    },
});
