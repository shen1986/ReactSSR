'use strict';
const path = require('path');
const config = require('../index');
const utils = require('../../build/utils');

const createLintingRule = () => ({
    test: /\.(ts|tsx)$/,
    loader: 'tslint-loader',
    enforce: 'pre',
    include: [path.join(__dirname, '../../src')],
});

module.exports = {
    // context: path.resolve(__dirname, '../client'),
    entry: {
        app: path.join(__dirname, '../../src/client/main.tsx'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.less'],
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
                },
            },
            { test: /\.ejs$/, loader: 'ejs-compiled-loader' },
        ],
    },
};
