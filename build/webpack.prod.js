var merge = require('webpack-merge');
var base = require('./webpack.common');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 每次清除dist目录再生成编译后文件
var CleanWepackPlugin = require('clean-webpack-plugin');
// 用来压缩分离出来的css样式
let OptimizeCss =  require('optimize-css-assets-webpack-plugin');
// 用来压缩js
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 依赖关系可视化
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge.smart(base, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new HtmlWebpackPlugin({
            // 指定模板文件路径
            template: path.join(__dirname, '../public/index.html'),
            // 设置生成的内存页面的名称
            filename: 'index.html',
            favicon: path.join(__dirname, '../public/favicon.ico'),
            // 配置Html压缩
            minify: {
                // 删除html中的双引号
                removeAttributeQuotes: true,
                // 变成一行去除space
                collapseWhitespace: true,
            },
            hash: true, //引用时加上hash挫
        }),
        // 生成文件之前先删除
        new CleanWepackPlugin({
            cleanOnceBeforeBuildPatterns: '../dist',
        }),
        // 版权说明
        new webpack.BannerPlugin('make 2019 by shenxf'),
        // js依赖分析
        new BundleAnalyzerPlugin({ analyzerPort: 8919 }),
    ],
    optimization: {
        // 优化项
        minimizer: [
            new OptimizeCss(), // 压缩css文件
            new UglifyJsPlugin({
                sourceMap: false,
                // compress: {
                //     warnings: false,
                // },
                cache: true, // 是否用缓存
                parallel: true, // 并发打包
            }),
        ],
    },
});