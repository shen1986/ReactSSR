const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../client/main.ts'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            // 解析typeScript文件
            {
                test: /\.(tsx)$/,
                // 只看这个包里
                include: path.resolve('src'),
                use: [
                    'babel-loader',
                    'ts-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../client/index.html'), // 指定模板文件路径
            filename: 'index.html', // 设置页面的名称
        }),
    ],
}