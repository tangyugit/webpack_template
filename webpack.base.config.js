const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob'); //获取文件路径，配置多页面
const merge = require('webpack-merge');
const webpack = require('webpack');

/*
**package.json使用cross-env跨平台设置NODE_ENV变量
*/

function getEntries() { //获取所有入口文件
    var allEntryFiles = glob.sync(__dirname + '/src/pages/*/*.js'); //同步方式获取所有入口文件
    var map = {};
    allEntryFiles.forEach((item, index)=> {
        var filename = item.substring(item.lastIndexOf('/')+1, item.lastIndexOf('.'));
        map[filename] = item;
    });
    return map; //入口对象集合
}

function getAllOutPutFiles() { //获取所有打包出口html文件数组
    var entryHtmls = glob.sync(__dirname + '/src/pages/*/*.html');
    var arr = [];
    entryHtmls.forEach((item, index)=> {
        var filename = item.substring(item.lastIndexOf('/')+1, item.lastIndexOf('.'));
        var conf = {
            template: item, //模板来源
            filename: filename + '.html', //打包后html文件名
            chunks: ['vendor', filename], //每个页面加载的脚本，不配置该项，将会加载所有打包后的js
            inject: true, //true：默认值，script标签位于html文件的 body 底部
        };
        if(process.env.NODE_ENV == 'production'){ //生产环境
            conf = merge(conf, {
                minify: { // 压缩HTML文件
                    removeComments: true, // 移除HTML中的注释
                    collapseWhitespace: true, // 删除空白符与换行符
                    minifyCSS: true// 压缩内联css
                }
            });
        }
        arr.push(new HtmlWebpackPlugin(conf));
    });
    return arr;
}

const config = {
    entry: getEntries(),
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
                    { loader: 'postcss-loader', options: { //配合autoprefixer插件使用
                        sourceMap: true, //生成源映射
                        plugins: [
                            require('autoprefixer')({ //自动添加浏览器前缀（-webkit，-moz，-ms）
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
        new webpack.ProvidePlugin({
            '$': 'jquery'
        })
    ].concat(getAllOutPutFiles()), //追加htmlWebpackHtml实例数组
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