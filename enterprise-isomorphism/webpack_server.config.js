const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    // JavaScript 执行入口文件
    entry: './main_server.js',
    // 为了不将Node.js内置的模块打包进输出文件中 运行环境是node，所以源生的模块没必要打包
    target: 'node',
    // 为了不将 node_modules 目录下的第三方模块打包进输出文件中 nodejs环境最自动去查找这些第三方的包，所以不需要打包
    externals: [nodeExternals()],
    output: {
        // 为了以CommonJS2规范导出渲染函数，以被采用Node.js编写的http服务调用
        libraryTarget: 'commonjs2',
        // 将最终可在Node.js中运行的代码输出到bundle_server.js文件中
        filename: 'bundle_server.js',
        // 将输出文件都放到dist目录下
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            {
                // css代码不能被打包到用于服务端的代码中，忽略css文件
                test: /\.css/,
                use: ['ignore-loader']
            }
        ]
    },
    devtool: 'source-map' // 输出source-map，以方便直接调试ES6源码
}