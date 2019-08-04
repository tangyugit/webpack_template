const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        index: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            
        ]
    },
    resolve: {
        alias: { //别名
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js'], //省略后缀名
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            inject: true,
            chunks: ['vendor', 'index']
        })
    ],
    optimization: { //代码分割插件
        splitChunks: {
            cacheGroups: { //默认缓存组，打包所有node_modules文件到vendor.js
                vendor: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 20, //打包优先级
                    name: 'vendor'
                }
            }
        }
    }
};

module.exports = config;