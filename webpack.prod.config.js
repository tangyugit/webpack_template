const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
    // devtool: 'source-map',
    devtool: 'none', //生产环境不使用源映射
    output: {
        filename: 'static/js/[name].[chunkhash].js', //添加hash
        publicPath: './', //CDN资源相对路径
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { //定义生产环境变量
                NODE_ENV: '"production"',
                BASE_URL: '"http://111.231.84.xx"'
            }
        }),
        new CleanWebpackPlugin(), //删除dist文件夹
    ]
});