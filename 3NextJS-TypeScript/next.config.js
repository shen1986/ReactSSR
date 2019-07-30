const webpack = require('webpack');
const withLess = require('@zeit/next-less');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
// const config = require('./config');

const configs = {
    // 编译文件的输出目录
    distDir: 'dest',
    // 是否给每个路由生成Etag
    generateEtags: true,
    // 页面内容缓存配置
    onDemandEntries: {
        // 内容在内存中缓存的时长(ms)
        maxInactiveAge: 25 * 1000,
        // 同时缓存多少个页面
        pagesBufferLength: 2,
    },
    // 在pages目录下那种后缀的文件会被认为是页面
    pageExtensions: ['tsx', 'jsx', 'js'],
    // 配置buildId
    generateBuildId: async () => {
        if (process.env.YOUR_BUILD_ID) {
            return process.env.YOUR_BUILD_ID;
        }

        // 返回null使用默认的unique id
        return null;
    },
    // 手动修改webpack config
    webpack(config, options) {
        return config;
    },
    // 修改webpackDevMiddleware配置
    webpackDevMiddleware: (config) => {
        return config;
    },
    // 可以在页面上通过 process.env.customKey 获取 value
    env: {
        customKey: 'value',
    },
    // 下面两个要通过 'next/config' 来读取
    // 只有在服务端渲染时才会获取的配置
    serverRuntimeConfig: {
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET,
    },
    // 在服务端渲染和客户端渲染都可获取的配置
    publicRuntimeConfig: {
        staticFolder: '/static',
    },
};

module.exports = withBundleAnalyzer(
    withLess({
        lessLoaderOptions: {
            javascriptEnabled: true,
            // modifyVars: themeVariables, // make your antd custom effective
        },
        webpack(config, { isServer }) {
            config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
            if (process.env.NODE_ENV === 'production') {
                config.mode = 'production';
            }

            if (isServer) {
                const antStyles = /antd\/.*?\/style.*?/;
                const origExternals = [...config.externals];
                config.externals = [
                    (context, request, callback) => {
                        if (request.match(antStyles)) return callback();
                        if (typeof origExternals[0] === 'function') {
                            origExternals[0](context, request, callback);
                        } else {
                            callback();
                        }
                    },
                    ...(typeof origExternals[0] === 'function' ? [] : origExternals),
                ];

                config.module.rules.unshift({
                    test: antStyles,
                    use: 'null-loader',
                });
            }

            // 加入tslint验证
            config.module.rules.unshift({
                test: /\.(ts|tsx)$/,
                loader: 'tslint-loader',
                enforce: 'pre',
            });

            return config;
        },
        // publicRuntimeConfig: {
        //   GITHUB_OAUTH_URL: config.GITHUB_OAUTH_URL,
        //   OAUTH_URL: config.OAUTH_URL
        // },
        analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
            server: {
                analyzerMode: 'static',
                reportFilename: '../bundles/server.html',
            },
            browser: {
                analyzerMode: 'static',
                reportFilename: '../bundles/client.html',
            },
        },
        lessLoaderOptions: {
            javascriptEnabled: true,
        },
    })
);
