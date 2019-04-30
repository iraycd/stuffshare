const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackPreBuildPlugin = require('pre-build-webpack');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let find = require('find');
let fs = require('fs');
var WebpackPreBuildPlugin = require('pre-build-webpack');

module.exports = env => {
    return {
        entry: {
            app: ['./src/Front-end/Web/app.jsx', './src/Front-end/Web/assets/vendor/bootstrap/bootstrap.min.css', './src/Front-end/Web/assets/vendor/icon-awesome/css/font-awesome.min.css', './src/Front-end/Web/assets//vendor/icon-hs/style.css', './src/Front-end/Web/assets/vendor/dzsparallaxer/dzsparallaxer.css', './src/Front-end/Web/assets/vendor/dzsparallaxer/dzsscroller/scroller.css', './src/Front-end/Web/assets/vendor/dzsparallaxer/advancedscroller/plugin.css', './src/Front-end/Web/assets/vendor/animate.css', './src/Front-end/Web/assets/vendor/hs-megamenu/src/hs.megamenu.css', './src/Front-end/Web/assets/vendor/hamburgers/hamburgers.min.css', './src/Front-end/Web/assets/css/unify.css', './src/Front-end/Web/assets/css/custom.css'
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
        "target": "web",
        devServer: {
            historyApiFallback: true,
        },
        optimization: {
            minimizer: [new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {
                        reduce_vars: false,
                        collapse_vars: false
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                },
            }),]
        },
        output: {
            path: __dirname + '/.compiled/web',
            filename: '[name].bundle.js',
            publicPath: '/'
        },
        mode: 'development',
        module: {

            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
                ,
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it uses publicPath in webpackOptions.output
                                publicPath: '../',
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        'css-loader',
                    ],
                },
                {
                    test: /\.(png|jpg|gif|cur|woff|eot|ttf|svg|dtd|woff2)$/,
                    use: [{
                        loader: 'url-loader'
                    }]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './src/Front-end/Web/index.html',
                filename: 'index.html',
                inject: 'body'
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'bundle.css',
            }), new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }),

            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(env.NODE_ENV)
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
                try {
                    let filebody = fs.readFileSync(dirname + '/reducers.scenes.js');
                    if (filebody.toString() == `${importTxt}${exportTxt}`) {
                        return;
                    }
                } catch (ex) {
                    console.log(ex);

                }
                const data = new Uint8Array(Buffer.from(`${importTxt}${exportTxt}`));
                fs.writeFileSync(dirname + '/reducers.scenes.js', data);
                console.log('REDUCES FINISHED');

                //  import( __dirname.replace(/\\/g,'/')+'/src/Front-end/Web/build_reducers.js');
                // Do whatever you want before build starts...
            })


        ]
    };
}