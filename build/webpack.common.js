var path = require('path');
// 抽离css样式
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
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

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 创建link标签
                    'css-loader',
                    'postcss-loader', // 给style式样加上前缀
                ],
            },
            {
                test: /\.less$/,
                use: [
                    // 创建link标签, 名字一样是抽离成一个css文件，如果想不一样就要require多次，且要报名字定义成不一样
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        // 抽离CSS样式
        new MiniCssExtractPlugin({
            // 抽离出来样式的名字
            filename: 'css/main.css',
        }),
    ],
};