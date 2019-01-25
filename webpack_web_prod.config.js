'use strict';

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
//         path = require('path');//
//const ExtractTextPlugin = require("extract-text-webpack-plugin");

//const extractLESS = new ExtractTextPlugin('./public/two.css');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
});
const config = [{
    performance: { hints: false },
    entry: {
        "app": ['./dist/web/app.bundle.js', './dist/web/bundle.css',
        ]
        //,'./public/city_guide.scss','./public/awesomplete.css'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    "target": "web",
    devServer: {
        historyApiFallback: true,
    },
    module: {
        loaders: [
           
            { // sass / scss loader for webpack
                test: /\.(css|sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.(png|jpg|gif|cur|woff|eot|ttf|svg|dtd|woff2)$/,
                use: [{
                    loader: 'url-loader'
                }]
            }

        ],


    },
    plugins: [HtmlWebpackPluginConfig,
        new ExtractTextPlugin({ // define where to save the file
            filename: 'bundle.css',
            allChunks: true,
        })
    ]

}];

module.exports = config;