var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, '../../src/client/main.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
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
                    {
                        loader: 'babel-loader',
                        options: {
                            // 用babel-loader 需要把es6-es5
                            presets: [
                                // 预设置，用来配置插件库 ，大插件的配置
                                '@babel/preset-env',
                            ],
                        },
                    },
                    'ts-loader',
                ],
            },


        ],
    },
};
