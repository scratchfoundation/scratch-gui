const path = require("path");
const webpack = require("webpack");

// Plugins
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// PostCss
const autoprefixer = require("autoprefixer");
const postcssVars = require("postcss-simple-vars");
const postcssImport = require("postcss-import");
const TerserPlugin = require("terser-webpack-plugin");

const ScratchWebpackConfigBuilder = require("scratch-webpack-configuration");

// const STATIC_PATH = process.env.STATIC_PATH || '/static';

const baseConfig = new ScratchWebpackConfigBuilder({
    rootPath: path.resolve(__dirname),
    enableReact: true,
})
    .setTarget("browserslist")
    .merge({
        output: {
            assetModuleFilename: "static/assets/[name].[hash][ext][query]",
            library: {
                name: "GUI",
                type: "umd2",
            },
        },
        resolve: {
            alias: {
                fs: false,
            },
            fallback: {
                Buffer: require.resolve("buffer/"),
                stream: require.resolve("stream-browserify"),
            },
        },
        performance: {
            hints: false,
        },
        stats: {
            warnings: false,
            warningsFilter: [
                /export .* was not found/,
                /Critical dependency/,
                /Module not found/,
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
                automaticNameDelimiter: "-",
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                        reuseExistingChunk: true,
                        enforce: true,
                        priority: -10,
                        minSize: 0,
                        maxSize: 200 * 1024,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
            mergeDuplicateChunks: true,
            runtimeChunk: "single",
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        // compress: {
                        //     drop_console: true,
                        //     drop_debugger: true,
                        //     dead_code: true,
                        //     passes: 2,
                        //     toplevel: true,
                        //     warnings: false,
                        //     pure_funcs: [
                        //         "console.log",
                        //         "console.warn",
                        //         "console.info",
                        //     ],
                        // },
                        output: {
                            comments: false,
                        },
                        mangle: {
                            safari10: true,
                        },
                    },
                    extractComments: false,
                }),
            ],
        },
    })
    .addModuleRule({
        test: /\.css$/,
        use: [
            {
                loader: "style-loader",
            },
            {
                loader: "css-loader",
                options: {
                    modules: {
                        localIdentName: "[name]_[local]_[hash:base64:5]",
                    },
                    importLoaders: 1,
                    localsConvention: "camelCase",
                },
            },
            {
                loader: "postcss-loader",
                options: {
                    ident: "postcss",
                    plugins: function () {
                        return [postcssImport, postcssVars, autoprefixer];
                    },
                },
            },
        ],
    })
    .addModuleRule({
        test: /\.(svg|png|wav|gif|jpg)$/,
        resourceQuery: /^$/, // reject any query string
        type: "asset", // let webpack decide on the best type of asset
    })
    .addModuleRule({
        test: /\.mp3$/,
        resourceQuery: /^$/, // Regular MP3 files without query
        type: "asset/resource",
        generator: {
            filename: "static/assets/[name].[hash][ext][query]",
        },
    })
    .addModuleRule({
        test: /\.mp3$/,
        resourceQuery: /arrayBuffer/, // MP3 files with ?arrayBuffer
        use: [
            {
                loader: "arraybuffer-loader",
            },
        ],
    })
    .addModuleRule({
        test: /\.hex$/,
        type: "asset/resource",
    })
    .addPlugin(
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        })
    )
    .addPlugin(
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(
                process.env.NODE_ENV || "development"
            ),
            "process.env.DEBUG": Boolean(process.env.DEBUG),
            "process.env.GA_ID": `"${process.env.GA_ID || "UA-000000-01"}"`,
            "process.env.GTM_ENV_AUTH": `"${process.env.GTM_ENV_AUTH || ""}"`,
            "process.env.GTM_ID": process.env.GTM_ID
                ? `"${process.env.GTM_ID}"`
                : null,
        })
    )
    .addPlugin(
        new webpack.NormalModuleReplacementPlugin(
            /^redux$/,
            require.resolve("redux/dist/redux.min.js")
        )
    )
    .addPlugin(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "node_modules/scratch-blocks/media",
                    to: "static/blocks-media/default",
                },
                {
                    from: "node_modules/scratch-blocks/media",
                    to: "static/blocks-media/high-contrast",
                },
                {
                    // overwrite some of the default block media with high-contrast versions
                    // this entry must come after copying scratch-blocks/media into the high-contrast directory
                    from: "src/lib/themes/high-contrast/blocks-media",
                    to: "static/blocks-media/high-contrast",
                    force: true,
                },
                {
                    context: "node_modules/scratch-vm/dist/web",
                    from: "extension-worker.{js,js.map}",
                    noErrorOnMissing: true,
                },
            ],
        })
    );

if (!process.env.CI) {
    baseConfig.addPlugin(new webpack.ProgressPlugin());
}

// build the shipping library in `dist/`
const distConfig = baseConfig.clone().merge({
    entry: {
        "scratch-gui": path.join(__dirname, "src/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
    },
});

// build the examples and debugging tools in `build/`
const buildConfig = baseConfig
    .clone()
    .enableDevServer(process.env.PORT || 8602)
    .merge({
        entry: {
            gui: "./src/playground/index.jsx",
            blocksonly: "./src/playground/blocks-only.jsx",
            compatibilitytesting: "./src/playground/compatibility-testing.jsx",
            player: "./src/playground/player.jsx",
        },
        output: {
            path: path.resolve(__dirname, "build"),
        },
    })
    .addPlugin(
        new HtmlWebpackPlugin({
            chunks: ["gui"],
            template: "src/playground/index.ejs",
            title: "Scratch 3.0 GUI",
        })
    )
    .addPlugin(
        new HtmlWebpackPlugin({
            chunks: ["blocksonly"],
            filename: "blocks-only.html",
            template: "src/playground/index.ejs",
            title: "Scratch 3.0 GUI: Blocks Only Example",
        })
    )
    .addPlugin(
        new HtmlWebpackPlugin({
            chunks: ["compatibilitytesting"],
            filename: "compatibility-testing.html",
            template: "src/playground/index.ejs",
            title: "Scratch 3.0 GUI: Compatibility Testing",
        })
    )
    .addPlugin(
        new HtmlWebpackPlugin({
            chunks: ["player"],
            filename: "player.html",
            template: "src/playground/index.ejs",
            title: "Scratch 3.0 GUI: Player Example",
        })
    )
    .addPlugin(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "static",
                    to: "static",
                },
                {
                    from: "extensions/**",
                    to: "static",
                    context: "src/examples",
                },
            ],
        })
    );

// Skip building `dist/` unless explicitly requested
// It roughly doubles build time and isn't needed for `scratch-gui` development
// If you need non-production `dist/` for local dev, such as for `scratch-www` work, you can run something like:
// `BUILD_MODE=dist npm run build`
const buildDist =
    process.env.NODE_ENV === "production" || process.env.BUILD_MODE === "dist";

module.exports = buildDist
    ? [buildConfig.get(), distConfig.get()]
    : buildConfig.get();
