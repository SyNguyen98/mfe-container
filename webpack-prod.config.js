const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = () => ({
    output: {
        publicPath: "https://mango-tree-053bd7200.5.azurestaticapps.net/",
    },

    mode: "production",

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
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
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                }
            },
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "mfe_container",
            filename: "remoteEntry.js",
            remotes: {
                "mfe_react": "mfe_react@https://salmon-island-072e10b00.5.azurestaticapps.net/remoteEntry.js",
                "mfe_vue": "mfe_vue@https://orange-island-040f90e00.5.azurestaticapps.net/remoteEntry.js",
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
        }),
    ],
});
