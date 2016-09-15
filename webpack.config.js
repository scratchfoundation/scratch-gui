var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        gui: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        externals: {
            React: 'react',
            ReactDOM: 'react-dom'
        },
        loaders: [{
            test: /\.js$/,
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
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.min.js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Scratch 3.0 GUI'
        })
    ]
};
