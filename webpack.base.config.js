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
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                    { loader: 'style-loader' }, //css插入head
                    { loader: 'css-loader' }, //加载css文件
                    { loader: 'postcss-loader', options: {
                        sourceMap: true, //生成源映射
                        plugins: [
                            require('autoprefixer')({ //自动添加浏览器前缀
                                browsers : ['last 100 versions'] //必须设置支持的浏览器才会自动添加添加浏览器兼容
                            })
                        ]
                    } }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: { loader: "babel-loader" }
            }
        ]
    },
    resolve: {
        alias: { //别名
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.json'], //省略后缀名
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/page.html'),
            filename: 'page.html',
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