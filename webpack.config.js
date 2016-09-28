var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
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
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BASE_PATH': '"' + (process.env.BASE_PATH || '/') + '"'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.min.js'
        }),
        new HtmlWebpackPlugin({
            title: 'Scratch 3.0 GUI'
        }),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-blocks/media',
            to: 'static/blocks-media'
        }])
    ].concat(process.env.NODE_ENV == 'production' ? [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ] : [])
};
