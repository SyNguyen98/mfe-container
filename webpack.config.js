const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');

const deps = require("./package.json").dependencies;

const printCompilationMessage = require('./compilation.config.js');

module.exports = () => ({
    output: {
        publicPath: "http://localhost:3000/",
    },
    mode: "development",
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
        port: 3000,
        historyApiFallback: true,
        watchFiles: [path.resolve(__dirname, 'src')],
        onListening: function (devServer) {
            const port = devServer.server.address().port

            printCompilationMessage('compiling', port)

            devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
                setImmediate(() => {
                    if (stats.hasErrors()) {
                        printCompilationMessage('failure', port)
                    } else {
                        printCompilationMessage('success', port)
                    }
                })
            })
        }
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jsx)?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [
                        "@babel/preset-env",
                        ["@babel/preset-react", {runtime: "automatic"}]
                    ],
                }
            },
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "mfe_container",
            filename: "remoteEntry.js",
            remotes: {
                "mfe_react": "mfe_react@http://localhost:3001/remoteEntry.js",
                "mfe_vue": "mfe_vue@http://localhost:3002/remoteEntry.js",
            },
            exposes: {},
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
        })
    ],
});
