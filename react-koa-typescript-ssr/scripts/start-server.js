const webpack = require('webpack');
const nodemon = require('nodemon');
const express = require('express');
const webpackConfig = require('../config/webpack.config.js/index.js')(process.env.NODE_ENV || 'development');
const paths = require('../config/paths');
const { logMessage, compilerPromise } = require('./utils');

const app = express();

const WEBPACK_PORT =
    process.env.WEBPACK_PORT ||
    (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501);

const DEVSERVER_HOST = process.env.DEVSERVER_HOST || 'http://localhost';

const start = async () => {
    const serverConfig = webpackConfig[1];

    const publicPath = '/public/';

    serverConfig.output.publicPath = [`${DEVSERVER_HOST}:${WEBPACK_PORT}`, publicPath]
        .join('/')
        .replace(/([^:+])\/+/g, '$1/');

    const multiCompiler = webpack([serverConfig]);

    const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server');
    console.log(serverCompiler);
    const serverPromise = compilerPromise('server', serverCompiler);

    const watchOptions = {
        ignored: /node_modules/,
        stats: {
            cached: false,
            cachedAssets: false,
            chunks: false,
            chunkModules: false,
            colors: true,
            hash: false,
            modules: false,
            reasons: false,
            timings: true,
            version: false,
        },
    };

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        return next();
    });

    app.use('/static', express.static(paths.clientBuild));

    app.listen(WEBPACK_PORT);

    serverCompiler.watch(watchOptions, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString(serverConfig.stats));
            return;
        }

        if (error) {
            logMessage(error, 'error');
        }

        if (stats.hasErrors()) {
            const info = stats.toJson();
            const errors = info.errors[0].split('\n');
            logMessage(errors[0], 'error');
            logMessage(errors[1], 'error');
            logMessage(errors[2], 'error');
        }
    });

    // wait until client and server is compiled
    try {
        await serverPromise;
    } catch (error) {
        logMessage(error, 'error');
    }

    const script = nodemon({
        script: `${paths.serverBuild}/server.js`,
        ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
        delay: 200,
    });

    script.on('restart', () => {
        logMessage('Server side app has been restarted.', 'warning');
    });

    script.on('quit', () => {
        console.log('Process ended');
        process.exit();
    });

    script.on('error', () => {
        logMessage('An error occured. Exiting', 'error');
        process.exit(1);
    });
};

start();
