const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const FriendErrors = require('friendly-errors-webpack-plugin');
const Notifier = require('node-notifier');

module.exports = merge(baseConfig, {
    output: {
        filename: 'js/[name].js',
        publicPath: '/dist'
    },
    devServer: {
        clientLogLevel: 'warning',
        compress: true,
        hot: true,
        overlay: {
            warnings: true,
            errors: true
        },
        open: true,
        host: 'localhost',
        port: '8600',
        publicPath: '/dist',
        quiet: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new FriendErrors({
            clearConsole: true,
            compilationSuccessInfo: {
                messages: ['Your application is running here: http://localhost:8600']
            },
            onErrors: (severity, errors)=>{
                if (severity !== 'error') return;
                const error = errors[0];
                Notifier.notify({
                    title: 'webpack_template error!',
                    message: severity + ': ' + error.anme,
                    subtitle: error.file || '',
                    icon: ''
                })
            }
        })
    ]
});