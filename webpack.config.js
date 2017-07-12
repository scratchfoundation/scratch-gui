var path = require('path');
var webpack = require('webpack');

// Plugins
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// PostCss
var autoprefixer = require('autoprefixer');
var postcssVars = require('postcss-simple-vars');
var postcssImport = require('postcss-import');

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
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src'),
            options: {
                plugins: ['transform-object-rest-spread'],
                presets: ['es2015', 'react']
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
