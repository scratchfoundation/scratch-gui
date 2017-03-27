var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

// Plugins
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// PostCss
var autoprefixer = require('autoprefixer');
var postcssVars = require('postcss-simple-vars');
var postcssImport = require('postcss-import');

/**
 * Resolve a babel plugin or preset to a real path, resolving symlinks the way that Node.js would.
 * Helps work around the differences between webpack's module lookup and Node's when `npm link` is in use.
 * @param {string} prefix - 'babel-plugin' for a plugin, 'babel-preset' for a preset, etc.
 * @param {string|Array} item - either a plugin/preset name or path or an array with such a string at index 0.
 * @returns {string|Array} - the same type as `item` but the name/path will be replaced with an absolute path.
 */
const babelRealPath = function (prefix, item) {
    if (typeof item === 'string') {
        if (item.indexOf(prefix) !== 0) {
            item = [prefix, item].join('-');
        }
        return fs.realpathSync(require.resolve(item));
    }
    item[0] = babelRealPath(prefix, item[0]);
    return item;
};

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        host: '0.0.0.0',
        port: process.env.PORT || 8601
    },
    devtool: 'cheap-module-source-map',
    entry: {
        lib: ['react', 'react-dom'],
        gui: './src/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    externals: {
        React: 'react',
        ReactDOM: 'react-dom'
    },
    module: {
        rules: [{
            include: [
                path.resolve(__dirname, 'node_modules', 'scratch-audio', 'src'),
                path.resolve(__dirname, 'node_modules', 'scratch-render', 'src'),
                path.resolve(__dirname, 'node_modules', 'scratch-storage', 'src'),
                path.resolve(__dirname, 'node_modules', 'scratch-vm', 'src'),
                path.resolve(__dirname, 'src')
            ].map(x => fs.realpathSync(x)),
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                plugins: [
                    'transform-object-rest-spread'
                ].map(x => babelRealPath('babel-plugin', x)),
                presets: [
                    ['es2015', {modules: false}],
                    'react'
                ].map(x => babelRealPath('babel-preset', x))
            }
        },
        {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    camelCase: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: function () {
                        return [
                            postcssImport,
                            postcssVars,
                            autoprefixer({
                                browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']
                            })
                        ];
                    }
                }
            }]
        },
        {
            test: /\.svg$/,
            loader: 'svg-url-loader?noquotes'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"',
            'process.env.BASE_PATH': '"' + (process.env.BASE_PATH || '/') + '"',
            'process.env.DEBUG': Boolean(process.env.DEBUG)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
            filename: 'lib.min.js'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            title: 'Scratch 3.0 GUI'
        }),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-blocks/media',
            to: 'static/blocks-media'
        }])
    ].concat(process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ] : [])
};
