'use strict'
const path = require('path');
const config = require('../config/index');
const utils = require('./utils');
const resolve = (dir) => path.join(__dirname, '../client/', dir);

const createLintingRule = () => ({
    test: /\.(ts|tsx)$/,
    loader: 'tslint-loader',
    enforce: 'pre',
    include: [resolve('src')],
    options: {
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
});

module.exports = {
    entry: {
        app: path.join(__dirname, '../client/main.ts')
    },
    resolve: {
        extensions: ['.ts', '.json', '.tsx', '.less']
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.(tsx)?$/,
                loader: 'babel-loader!ts-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            { test: /\.ejs$/, loader: 'ejs-compiled-loader' },
        ],
    }
}
