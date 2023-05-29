const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const IconFontPlugin = require('icon-font-loader').Plugin;


module.exports = (env, options) => {
    const isProduction = options.mode === 'production';
    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'nosources-source-map' : 'eval-source-map',
        watch: !isProduction,
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'script.js',
        },
            module: {
                rules: [
                    {
                            test: /\.(?:js|mjs|cjs)$/,
                            exclude: /node_modules/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [
                                  ['@babel/preset-env', { targets: "defaults" }]
                                ]
                              }
                            }
                          }, {
                            test: /\.scss$/,
                            use: [
                                MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
                            ]
                          }, {
                            test: /\.(png|jpg|gif)$/,
                            use: [{
                                loader: 'file-loader',
                            }
                        ],
                      }, 
                      
                      { test: /\.css$/, use: ['style-loader', 'css-loader', 'icon-font-loader'] },
                      
                        



                ]
            },

        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),

            new IconFontPlugin(),

        ]
    }
    return config;
}