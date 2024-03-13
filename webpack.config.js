const path = require('path');
const webpack = require('webpack');

// Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// PostCss
const autoprefixer = require('autoprefixer');
const postcssVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');

const ScratchWebpackConfigBuilder = require('scratch-webpack-configuration');

// const STATIC_PATH = process.env.STATIC_PATH || '/static';

const configBuilder = new ScratchWebpackConfigBuilder(
    {
        rootPath: path.resolve(__dirname),
        enableReact: true
    })
    .setTarget('browserslist')
    .merge({
        devServer: {
            client: {
                progress: true
            },
            hot: true,
            port: process.env.PORT || 8602
        },
        entry: {
            // GUI as a library
            'scratch-gui': path.join(__dirname, 'src/index.js'),

            // to run editor examples
            'lib.min': ['react', 'react-dom'],
            'gui': './src/playground/index.jsx',
            'blocksonly': './src/playground/blocks-only.jsx',
            'compatibilitytesting': './src/playground/compatibility-testing.jsx',
            'player': './src/playground/player.jsx'
        },
        output: {
            assetModuleFilename: 'static/assets/[name].[hash][ext][query]',
            chunkFilename: 'chunks/[name].js',
            library: {
                name: 'GUI',
                type: 'umd2'
            },
            // publicPath: `${STATIC_PATH}/`,
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            fallback: {
                Buffer: require.resolve('buffer/')
            }
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                filename: 'chunks/[name].js'
            },
            mergeDuplicateChunks: true,
            runtimeChunk: 'single'
        }
    })
    .addModuleRule({
        test: /\.css$/,
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: '[name]_[local]_[hash:base64:5]'
                    },
                    importLoaders: 1,
                    localsConvention: 'camelCase'
                }
            },
            {
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
            }
        ]
    })
    .addModuleRule({
        test: /\.(svg|png|wav|mp3|gif|jpg)$/,
        resourceQuery: /^$/, // reject any query string
        type: 'asset' // let webpack decide on the best type of asset
    })
    .addModuleRule({
        // `asset` automatically chooses between exporting a data URI and emitting a separate file.
        // Previously achievable by using `url-loader` with asset size limit.
        resourceQuery: /^\?asset$/,
        type: 'asset'
    })
    .addModuleRule({
        // `asset/resource` emits a separate file and exports the URL.
        // Previously achievable by using `file-loader`.
        resourceQuery: /^\?(resource|file)$/,
        type: 'asset/resource'
    })
    .addModuleRule({
        // `asset/inline` exports a data URI of the asset.
        // Previously achievable by using `url-loader`.
        resourceQuery: /^\?(inline|url)$/,
        type: 'asset/inline'
    })
    .addModuleRule({
        // `asset/source` exports the source code of the asset.
        // Previously achievable by using `raw-loader`.
        resourceQuery: /^\?(source|raw)$/,
        type: 'asset/source'
    })
    .addModuleRule({
        test: /\.hex$/,
        type: 'asset/resource'
    })
    .addPlugin(new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
    }))
    .addPlugin(new webpack.DefinePlugin({
        'process.env.DEBUG': Boolean(process.env.DEBUG),
        'process.env.GA_ID': `"${process.env.GA_ID || 'UA-000000-01'}"`,
        'process.env.GTM_ENV_AUTH': `"${process.env.GTM_ENV_AUTH || ''}"`,
        'process.env.GTM_ID': process.env.GTM_ID ? `"${process.env.GTM_ID}"` : null
    }))
    .addPlugin(new HtmlWebpackPlugin({
        chunks: ['gui'],
        template: 'src/playground/index.ejs',
        title: 'Scratch 3.0 GUI'
    }))
    .addPlugin(new HtmlWebpackPlugin({
        chunks: ['blocksonly'],
        filename: 'blocks-only.html',
        template: 'src/playground/index.ejs',
        title: 'Scratch 3.0 GUI: Blocks Only Example'
    }))
    .addPlugin(new HtmlWebpackPlugin({
        chunks: ['compatibilitytesting'],
        filename: 'compatibility-testing.html',
        template: 'src/playground/index.ejs',
        title: 'Scratch 3.0 GUI: Compatibility Testing'
    }))
    .addPlugin(new HtmlWebpackPlugin({
        chunks: ['player'],
        filename: 'player.html',
        template: 'src/playground/index.ejs',
        title: 'Scratch 3.0 GUI: Player Example'
    }))
    .addPlugin(new CopyWebpackPlugin({
        patterns: [
            {
                from: 'static',
                to: 'static'
            },
            {
                from: 'extensions/**',
                to: 'static',
                context: 'src/examples'
            },
            {
                from: 'src/lib/themes/high-contrast/blocks-media',
                to: 'static/blocks-media/high-contrast',
                force: true
            },
            {
                // Include library JSON files for scratch-desktop to use for downloading
                from: 'src/lib/libraries/*.json',
                to: 'libraries',
                flatten: true
            },
            {
                from: 'node_modules/scratch-blocks/media',
                to: 'static/blocks-media/default'
            },
            {
                from: 'node_modules/scratch-blocks/media',
                to: 'static/blocks-media/high-contrast'
            },
            {
                context: 'node_modules/scratch-vm/dist/web',
                from: 'extension-worker.{js,js.map}',
                noErrorOnMissing: true
            }
        ]
    }));

if (!process.env.CI) {
    configBuilder.addPlugin(new webpack.ProgressPlugin());
}

module.exports = configBuilder.get();
