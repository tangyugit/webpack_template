const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
    // devtool: 'source-map',
    devtool: 'none', //生产环境不使用源映射
    output: {
        filename: 'js/[name].js',
        publicPath: './', //CDN资源相对路径
    },
    plugins: [
        new CleanWebpackPlugin(), //删除dist文件夹
    ]
});