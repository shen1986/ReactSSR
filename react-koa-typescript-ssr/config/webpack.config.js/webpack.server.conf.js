'use strict'

const merge = require('webpack-merge');
const path = require('path');
const config = require('..');
const baseWebpackConfig = require('./webpack.base.conf');
const utils = require('../../build/utils');


const serverWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  target: 'node',
  entry: {
    app: path.join(__dirname, '../../src/client/server-entry.tsx')
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'server-entry.js',
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    libraryTarget: 'commonjs2'
  },
  // 去除依赖，不打包到生成的文件中
  // 打包出来的代码是运行在node环境中的，这些类库是可以通过require()方式调用的
  externals: Object.keys(require('../../package.json').dependencies),
  devtool: config.dev.devtool,
});

module.exports = serverWebpackConfig;
