var path = require('path');
module.exports = {
    entry: {
        gui: './src/index.js'
    },
    output: {
        library: 'ScratchGUI',
        path: __dirname,
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src'),
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: require.resolve('scratch-blocks/blockly_compressed_vertical'),
            loader: 'exports?Blockly'
        }, {
            test: require.resolve('scratch-blocks/blocks_compressed'),
            loader: 'imports?Blockly=scratch-blocks/blockly_compressed_vertical!exports?Blockly'
        }, {
            test: require.resolve('scratch-blocks/blocks_compressed_vertical'),
            loader: 'imports?Blockly=scratch-blocks/blocks_compressed!exports?Blockly'
        }]
    }
};
