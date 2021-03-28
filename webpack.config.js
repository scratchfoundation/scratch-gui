const defaultsDeep = require('lodash.defaultsdeep');
var path = require('path');
var webpack = require('webpack');

// Plugins
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// PostCss
var autoprefixer = require('autoprefixer');
var postcssVars = require('postcss-simple-vars');
var postcssImport = require('postcss-import');

const STATIC_PATH = process.env.STATIC_PATH || '/static';

let root = process.env.ROOT || '';
if (root.length > 0 && !root.endsWith('/')) {
    throw new Error('If ROOT is defined, it must have a trailing slash.');
}

const htmlWebpackPluginCommon = {
    root: root
};

const base = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.SOURCEMAP ? process.env.SOURCEMAP : process.env.NODE_ENV === 'production' ? false : 'cheap-module-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        host: '0.0.0.0',
        port: process.env.PORT || 8601,
        // allows ROUTING_STYLE=wildcard to work properly
        historyApiFallback: {
            rewrites: [
                {from: /^\/\d+\/?$/, to: '/index.html'},
                {from: /^\/\d+\/fullscreen\/?$/, to: '/fullscreen.html'},
                {from: /^\/\d+\/editor\/?$/, to: '/editor.html'},
                {from: /^\/\d+\/embed\/?$/, to: '/embed.html'},
                {from: /^\/addons\/?$/, to: '/addons.html'}
            ]
        }
    },
    output: {
        library: 'GUI',
        filename: process.env.NODE_ENV === 'production' ? 'js/[name].[contenthash].js' : 'js/[name].js',
        chunkFilename: process.env.NODE_ENV === 'production' ? 'js/[name].[contenthash].js' : 'js/[name].js',
        publicPath: root
    },
    resolve: {
        symlinks: false,
        alias: {
            'text-encoding$': path.resolve(__dirname, 'src/lib/tw-text-encoder'),
            'scratch-render-fonts$': path.resolve(__dirname, 'src/lib/tw-scratch-render-fonts')
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, 'src'),
                /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
                /node_modules[\\/]pify/,
                /node_modules[\\/]@vernier[\\/]godirect/
            ],
            options: {
                // Explicitly disable babelrc so we don't catch various config
                // in much lower dependencies.
                babelrc: false,
                plugins: [
                    ['react-intl', {
                        messagesDir: './translations/messages/'
                    }]],
                presets: ['@babel/preset-env', '@babel/preset-react']
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
                            autoprefixer
                        ];
                    }
                }
            }]
        }]
    },
    plugins: []
};

if (!process.env.CI) {
    base.plugins.push(new webpack.ProgressPlugin());
}

module.exports = [
    // to run editor examples
    defaultsDeep({}, base, {
        entry: {
            'editor': './src/playground/editor.jsx',
            'player': './src/playground/player.jsx',
            'fullscreen': './src/playground/fullscreen.jsx',
            'embed': './src/playground/embed.jsx',
            'addon-settings': './src/playground/addon-settings.jsx',
            'credits': './src/playground/credits/credits.jsx'
        },
        output: {
            path: path.resolve(__dirname, 'build')
        },
        module: {
            rules: base.module.rules.concat([
                {
                    test: /\.(svg|png|wav|gif|jpg|mp3|ttf|otf)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'static/assets/'
                    }
                }
            ])
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                minChunks: 2,
                minSize: 50000,
                maxInitialRequests: 5
            }
        },
        plugins: base.plugins.concat([
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"',
                'process.env.DEBUG': Boolean(process.env.DEBUG),
                'process.env.ANNOUNCEMENT': JSON.stringify(process.env.ANNOUNCEMENT || ''),
                'process.env.ROOT': JSON.stringify(root),
                'process.env.ROUTING_STYLE': JSON.stringify(process.env.ROUTING_STYLE || 'filehash'),
                'process.env.PLAUSIBLE_API': JSON.stringify(process.env.PLAUSIBLE_API),
                'process.env.PLAUSIBLE_DOMAIN': JSON.stringify(process.env.PLAUSIBLE_DOMAIN)
            }),
            new HtmlWebpackPlugin({
                chunks: ['editor'],
                template: 'src/playground/index.ejs',
                filename: 'editor.html',
                title: 'TurboWarp - Run Scratch projects faster',
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['player'],
                template: 'src/playground/index.ejs',
                filename: 'index.html',
                title: 'TurboWarp - Run Scratch projects faster',
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['fullscreen'],
                template: 'src/playground/index.ejs',
                filename: 'fullscreen.html',
                title: 'TurboWarp - Run Scratch projects faster',
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['embed'],
                template: 'src/playground/index.ejs',
                filename: 'embed.html',
                title: 'Embedded Project - TurboWarp',
                noTheme: true,
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['addon-settings'],
                template: 'src/playground/simple.ejs',
                filename: 'addons.html',
                title: 'Addon Settings - TurboWarp',
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['credits'],
                template: 'src/playground/simple.ejs',
                filename: 'credits.html',
                title: 'TurboWarp Credits',
                noSplash: true,
                ...htmlWebpackPluginCommon
            }),
            new CopyWebpackPlugin([{
                from: 'static',
                to: ''
            }]),
            new CopyWebpackPlugin([{
                from: 'node_modules/scratch-blocks/media',
                to: 'static/blocks-media'
            }]),
            new CopyWebpackPlugin([{
                from: 'extensions/**',
                to: 'static',
                context: 'src/examples'
            }]),
            new CopyWebpackPlugin([{
                from: 'extension-worker.{js,js.map}',
                context: 'node_modules/scratch-vm/dist/web'
            }])
        ])
    })
].concat(
    process.env.NODE_ENV === 'production' || process.env.BUILD_MODE === 'dist' ? (
        // export as library
        // tw: TODO: need to see if this even works anymore
        defaultsDeep({}, base, {
            target: 'web',
            entry: {
                'scratch-gui': './src/index.js'
            },
            output: {
                libraryTarget: 'umd',
                path: path.resolve('dist'),
                publicPath: `${STATIC_PATH}/`
            },
            externals: {
                'react': 'react',
                'react-dom': 'react-dom'
            },
            module: {
                rules: base.module.rules.concat([
                    {
                        test: /\.(svg|png|wav|gif|jpg|mp3|ttf|otf)$/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static/assets/',
                            publicPath: `${STATIC_PATH}/assets/`
                        }
                    }
                ])
            },
            plugins: base.plugins.concat([
                new CopyWebpackPlugin([{
                    from: 'node_modules/scratch-blocks/media',
                    to: 'static/blocks-media'
                }]),
                new CopyWebpackPlugin([{
                    from: 'extension-worker.{js,js.map}',
                    context: 'node_modules/scratch-vm/dist/web'
                }]),
                // Include library JSON files for scratch-desktop to use for downloading
                new CopyWebpackPlugin([{
                    from: 'src/lib/libraries/*.json',
                    to: 'libraries',
                    flatten: true
                }])
            ])
        })) : []
);
