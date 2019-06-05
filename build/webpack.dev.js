var merge = require('webpack-merge');
var base = require('./webpack.common');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = merge.smart(base, {
    mode: 'development',
    devServer: {
        port: 3000, // 指定服务运行的端口号
        progress: true, // 打开进度条
        contentBase: '../dist', // 指定启动时参照的目录
        compress: true, // 指定进行压缩
        open: true // 自动打开网页
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../public/index.html'), // 指定模板文件路径
            filename: 'index.html', // 设置页面的名称
            favicon:  path.join(__dirname, '../public/favicon.ico'),
            minify: {
                // 配置Html压缩
                removeAttributeQuotes: true, // 删除html中的双引号
                collapseWhitespace: false, // 变成一行去除space
            },
            hash: true, //引用时加上hash挫
        }),
    ],
});
