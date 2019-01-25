'use strict';

//const webpack = require('webpack'),
//         path = require('path');//
//const ExtractTextPlugin = require("extract-text-webpack-plugin");

//const extractLESS = new ExtractTextPlugin('./public/two.css');
const nodeExternals = require('webpack-node-externals');

const config = [{

    entry: ['./src/Back-end/index.js'] //,'./public/city_guide.scss','./public/awesomplete.css'
        ,
    output: {
        path: __dirname + '/dist/server',
        filename: 'app.js'
    },
    "target": "node",
    externals: [nodeExternals()],
    module: {

        loaders: [
            { test: /\.js$/, loader: ['babel-loader', "eslint-loader"], exclude: /node_modules/ }
        ]

    }
}];

module.exports = config;