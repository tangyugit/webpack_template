const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //打包成外链CSS
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩CSS资源
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //压缩JS资源

module.exports = merge(baseConfig, {
    // devtool: 'source-map',
    devtool: 'none', //生产环境不使用源映射
    output: {
        filename: 'static/js/[name].[chunkhash].js', //添加hash
        publicPath: './', //CDN资源相对路径
    },
    module: {
        rules: [
            {
                test: /\.css$/, //生产环境使用mini-css-extract-plugin外链CSS（webpack4暂不支持extract-text-webpack-plugin，除非beta版本）
                exclude: /(node_modules)/,
                use: [
                    { loader: MiniCssExtractPlugin.loader }, //外链CSS
                    { loader: 'css-loader' }, //加载css文件
                    { loader: 'postcss-loader', options: { //配合autoprefixer插件使用
                        sourceMap: true, //生成源映射
                        plugins: [
                            require('autoprefixer')({ //自动添加浏览器前缀（-webkit，-moz，-ms）
                                browsers : ['last 100 versions'] //必须设置支持的浏览器才会自动添加添加浏览器兼容
                            })
                        ]
                    } }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ //生成CSS外链文件
            filename: 'static/css/[name].[hash].css'
        }),
        new webpack.DefinePlugin({
            'process.env': { //定义生产环境变量
                NODE_ENV: '"production"',
                BASE_URL: '"http://111.231.84.xx"'
            }
        }),
        new CleanWebpackPlugin(), //删除dist文件夹
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({ //压缩js
                cache: true, //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
                parallel: true, //使用多进程并行运行来提高构建速度
            }),
            new OptimizeCssAssetsPlugin({}), //压缩css
        ]
    }
});