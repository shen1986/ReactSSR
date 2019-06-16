const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'node',
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: 'server-entry.js',
        libraryTarget: 'commonjs2'
    }
};

if (!isDev) {
    // 为了不将 node_modules 目录下的第三方模块打包进输出文件中 nodejs环境最自动去查找这些第三方的包，所以不需要打包
    config.externals = Object.keys(require('../package.json').dependencies);
    config.mode = 'production';
}

module.exports = webpackMerge(baseConfig, config);
