const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const FriendErrors = require('friendly-errors-webpack-plugin');
const Notifier = require('node-notifier'); //桌面右下角原生报错提示

module.exports = merge(baseConfig, {
    devtool: 'cheap-module-eval-source-map', //开发环境打开源映射，方便断点调试
    output: {
        filename: 'js/[name].js',
        publicPath: '/', //CDN资源路径，开发路径所有资源都在根路径/下
    },
    module: {
        rules: [
            {
                test: /\.css$/, //开发环境使用style-css内嵌css
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
            }
        ]
    },
    devServer: {
        clientLogLevel: 'warning', //当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将显示消息，如：在重新加载之前，在一个错误之前，或者模块热替换(Hot Module Replacement)启用时
        compress: true, //一切服务都启用gzip 压缩
        hot: true, //启用 webpack 的模块热替换特性
        overlay: { //在浏览器中，直接显示覆盖页面的报错信息
            warnings: true,
            errors: true
        },
        open: true, //服务启动直接打开浏览器
        host: 'localhost',
        port: '8600',
        /*
        **此路径下的打包文件可在浏览器中访问。
        **假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为 bundle.js。默认 publicPath 是 "/"，所以你的包(bundle)可以通过 http://localhost:8080/bundle.js 访问。
        */
        publicPath: '/',
        quiet: true, //除了初始启动信息之外的任何内容都不会被打印到控制台,这也意味着来自 webpack 的错误或警告在控制台不可见。
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { //定义开发环境变量
                NODE_ENV: '"development"',
                BASE_URL: '"http://192.168.xxx.xxx"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(), //模块热更新
        new webpack.NamedModulesPlugin(), //热加载时直接返回更新文件名，而不是文件的id。
        new FriendErrors({ //识别某些类别的webpack错误，并清理，聚合和优先级，以提供更好的开发人员体验。
            clearConsole: true,
            compilationSuccessInfo: {
                messages: [
                    'Your server is running here: http://localhost:8600',
                    'Your pages is running here: http://localhost:8600/xxx.html'
                ]
            },
            onErrors: (severity, errors)=>{
                if (severity !== 'error') return;
                const error = errors[0];
                Notifier.notify({ //friendly-errors-webpack-plugin没有桌面通知的原生支持，使用node-notifier桌面通知
                    title: 'webpack_template error!',
                    message: severity + ': ' + error.name,
                    subtitle: error.file || '',
                    icon: ''
                })
            }
        })
    ]
});