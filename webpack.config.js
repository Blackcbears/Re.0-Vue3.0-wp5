const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader/dist/index');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const icon = path.join(__dirname, 'public/icon.jpg');
const webpack = require('webpack');


const publicPath = '/';
module.exports = {
    mode: 'development',
    entry: "./src/main.ts",
    stats: "errors-warnings", // 只有错误或者警告的时候才输出信息
    context: path.resolve(__dirname, '.'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: publicPath

    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin()
        ]
    },
    resolve: {
        extensions: ['.ts', ".tsx", '.js','.vue'],

        alias: {
            "@": path.resolve(__dirname, './src'),
            vue: "vue/dist/vue.esm-bundler.js"
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            title: 'Vue3 + TS -> Web App',
            minify: {
                collapseWhitespace: true, // 去掉空格
                removeComments: true // 去掉注释
            }
        }),
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename:  '[id].[contenthash].css',
        }),
        new VueLoaderPlugin(),
        new FriendlyErrorsWebpackPlugin({
            onErrors: (severity, errors) => {
                notifier.notify({
                    title: 'webpack 编译失败了~',
                    message: `${severity} ${errors[0].name}`,
                    subtitle: errors[0].file || '',
                    icon,
                });
            },
        }),
        new webpack.DefinePlugin({
            "__VUE_OPTIONS_API__": true,
            "__VUE_PROD_DEVTOOLS__": false,
        })
    ],
    devServer: {
        port: 9000,
        hot: true,
        contentBase: '../dist'
    },
    module: {
        /**
         asset/resource 替换 file-loader，导出文件 URL
         asset/inline 替换 url-loader，导出 dataURI
         asset/source 替换 raw-loader，导出文件源码
         asset 替换 url-loader，自动判断是 导出dataURI 还是 导出文件
         */
        // webpack中loader的执行顺序是从下往上，从右往左
        rules: [{
            test: /\.vue$/,
            use: [
                'vue-loader'
            ]
        }, {
            test: /\.tsx?$/,
            use: [
                'babel-loader',
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true, // 开启时: 编译器仅做语言转换不做类型检查，加快编译速度，但是静态类型检查中获得的许多好处将丢失。所以结合插件ForkTsCheckerWebpackPlugin用于新建进程执行类型检查，为此你需要关闭ts-loader自身的类型检查功能，即设置transpileOnly为true。
                        appendTsSuffixTo: ['\\.vue$'], // 给vue文件添加个.ts或.tsx后缀，vue单文件组件中假如使用了 lang="ts"， ts-loader需要配置 appendTsSuffixTo: [/\.vue$/]，用来给 .vue文件添加个 .ts后缀用于编译，因为tsc不知道如何处理. vue文件结尾的文件
                        happyPackMode: false,
                    }
                }
            ],
        }, {
            test: /\.m?jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        },  {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {},
                },
                {
                    loader: 'css-loader',
                    options: { sourceMap: false, importLoaders: 2 },
                },
            ],
        }, {
            test: /\.(scss|sass)$/,                                 //sass模块
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {},
                },
                {
                    loader: 'css-loader',
                    options: { sourceMap: false, importLoaders: 2 },
                },
                {
                    loader: 'sass-loader',
                },

            ],
        },  {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
            generator: {
                // 文件生成到 image 目录下
                filename: "image/[hash][ext][query]",
            },
        },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    // 文件生成到 font 目录下
                    filename: "font/[hash][ext][query]",
                },
            },
        ]
    },

}