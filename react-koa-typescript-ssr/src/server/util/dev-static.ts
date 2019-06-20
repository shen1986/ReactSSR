import axios from 'axios';
import webpack from 'webpack';
import path from 'path';
import MemoryFs from 'memory-fs';
import ReactDomServer from 'react-dom/server';

import serverConfig from '../../../config/webpack.config.js/webpack.server.conf';

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8080/public/app.html')
            .then(res => {
                resolve(res.data);
            })
            .catch(reject);
    });
};

const Module = module.constructor;

const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle;
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err));
    stats.warnings.forEach(warn => console.warn(warn));

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );
    const bundle = mfs.readFileSync(bundlePath);
    const m = new (<any>Module());
    m._compile(bundle);
    serverBundle = m.default;
});
export default (router) => {
    router.get('*', function(ctx, next) {
        getTemplate().then((template) => {
            const content = ReactDomServer.renderToString(serverBundle);
            ctx.body = (<String>template).replace('<!-- app -->', content);
        })
    })
}