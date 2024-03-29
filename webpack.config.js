const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const publicPath = path.join(__dirname, 'public');

module.exports = (env, argv) => {
    const isProduction = env === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: ['./src/app.js'],
        output: {
            path: publicPath,
            filename: 'bundle.js'
        },
        module: {
            rules: [{ // run babel when a js file is encountered outside of node_modules/
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }],
                test: /\.s?css$/
            }]
        },
        plugins: [
            new MiniCssExtractPlugin()
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            static: {
                directory: publicPath,
                publicPath: '/',
            },
            historyApiFallback: true,
            hot: true,
        }
    };
};