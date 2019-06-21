import axios from 'axios';
import webpack from 'webpack';
import path from 'path';
import MemoryFs from 'memory-fs';
import ReactDomServer from 'react-dom/server';
import NativeModule from 'module';
import vm from 'vm';

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

// 将string解析为一个模块
const getModuleFromString = (bundle: string, filename: string) => {
    const m = { exports: {} };
    // 模块包装器
    // 在执行模块代码之前，Node.js 会使用一个如下的函数包装器将其包装：
    // (function (exports, require, module, __filename, __dirname) {
    //   // 模块的代码实际上在这里, bundle code
    // });
    const wrapper = NativeModule.wrap(bundle);
    // vm.Script类型的实例包含若干预编译的脚本，这些脚本能够在特定的沙箱（或者上下文）中被运行。
    // 创建一个新的vm.Script对象只编译代码但不会执行它。编译过的vm.Script此后可以被多次执行
    const script = new vm.Script(wrapper, {
      filename,
      displayErrors: true,
    });
    const result = script.runInThisContext();
    result.call(m.exports, m.exports, require, m);
    return m;
};

const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle: any;
serverCompiler.watch({}, (err, stats: any) => {
    if (err) { throw err; }
    stats = stats.toJson();
    stats.errors.forEach((error: any) => console.log(error));
    stats.warnings.forEach((warn: any) => console.warn(warn));

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename,
    );
    const bundle = mfs.readFileSync(bundlePath);
    const m = getModuleFromString(bundle, 'server-entry.js');
    const result: any = m.exports;
    serverBundle = result.default;
});
export default (router: any) => {
    router.get('*', async (ctx: any, next: any) => {
        const template = await getTemplate();
        const content = ReactDomServer.renderToString(serverBundle);
        ctx.body = (template as string).replace('<!-- app -->', content);
    });
};
