'use strict';

const webpack = require('webpack');
let find = require('find');
let fs = require('fs');
//         path = require('path');//
//const ExtractTextPlugin = require("extract-text-webpack-plugin");

//const extractLESS = new ExtractTextPlugin('./public/two.css');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackPreBuildPlugin = require('pre-build-webpack');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/Front-end/Web/index.html',
    filename: 'index.html',
    inject: 'body'
});


const config = [{

    entry: {
        "app": ['./src/Front-end/Web/app.jsx', './src/Front-end/Web/assets/vendor/bootstrap/bootstrap.min.css', './src/Front-end/Web/assets/vendor/icon-awesome/css/font-awesome.min.css', './src/Front-end/Web/assets//vendor/icon-hs/style.css', './src/Front-end/Web/assets/vendor/dzsparallaxer/dzsparallaxer.css', './src/Front-end/Web/assets/vendor/dzsparallaxer/dzsscroller/scroller.css', './src/Front-end/Web/assets/vendor/dzsparallaxer/advancedscroller/plugin.css', './src/Front-end/Web/assets/vendor/animate.css', './src/Front-end/Web/assets/vendor/hs-megamenu/src/hs.megamenu.css', './src/Front-end/Web/assets/vendor/hamburgers/hamburgers.min.css', './src/Front-end/Web/assets/css/unify.css', './src/Front-end/Web/assets/css/custom.css'
            /*
                ,'./src/Front-end/Web/assets/vendor/tether.min.js'
                ,'./src/Front-end/Web/assets/vendor/bootstrap/bootstrap.min.js'
                ,'./src/Front-end/Web/assets/vendor/hs-megamenu/src/hs.megamenu.js'
                ,'./src/Front-end/Web/assets/vendor/dzsparallaxer/dzsparallaxer.js'
                ,'./src/Front-end/Web/assets/vendor/dzsparallaxer/dzsscroller/scroller.js'
                ,'./src/Front-end/Web/assets/vendor/dzsparallaxer/advancedscroller/plugin.js'
                ,'./src/Front-end/Web/assets/vendor/typedjs/typed.min.js'
              
                ,'./src/Front-end/Web/assets/js/hs.core.js'
                ,'./src/Front-end/Web/assets/js/components/hs.header.js'
                ,'./src/Front-end/Web/assets/js/helpers/hs.hamburgers.js'
                ,'./src/Front-end/Web/assets/js/components/hs.go-to.js'*/
        ]
        //,'./public/city_guide.scss','./public/awesomplete.css'
    },
    output: {
        path: __dirname + '/src/Back-end/web',
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    "target": "web",
    devServer: {
        historyApiFallback: true,
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: ['babel-loader'], exclude: /node_modules/ },
            { test: /\.jsx$/, loader: ['babel-loader' /*, "eslint-loader"*/], exclude: /node_modules/ },
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
    node: { fs: 'empty' },
    resolve: {
    
        extensions: ['.js', '.jsx', '.css', '.sass', '.scss', '.png', '.jpg', '.gif', '.cur', '.woff', '.eot', '.ttf', '.svg', '.dtd', '.woff2'],
    },
    plugins: [HtmlWebpackPluginConfig,
        new ExtractTextPlugin({ // define where to save the file
            filename: 'bundle.css',
            allChunks: true,
        }), new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new WebpackPreBuildPlugin(function (stats) {
            console.log('Reducer build');
            let dirname = __dirname + '/src/Front-end/Web'
            let files = find.fileSync('reducer.js', dirname);
            let result = files.map(item => {
                let result = item.replace(dirname, '.').replace(/\\/g, '/');
                let size = result.split('/').length;

                return {
                    name: result.split('/')[size - 2] + 'Reducer',
                    path: result
                }
            })
            let exportTxt = ' export default {';
            exportTxt += result.map(item => { return item.name }).join(',');
            exportTxt += '}';
            let importTxt = result.map(item => { return `import ${item.name} from '${item.path}';\n` }).join(' ')
            try{
            let filebody = fs.readFileSync(dirname + '/reducers.scenes.js');
            if(filebody.toString()==`${importTxt}${exportTxt}`)
            {
                return;
            }
        }catch(ex){
            console.log(ex);

        }
            const data = new Uint8Array(Buffer.from(`${importTxt}${exportTxt}`));
            fs.writeFileSync(dirname + '/reducers.scenes.js', data);
            console.log('REDUCES FINISHED');

            //  import( __dirname.replace(/\\/g,'/')+'/src/Front-end/Web/build_reducers.js');
            // Do whatever you want before build starts...
        }),

    ]

}];

module.exports = config;