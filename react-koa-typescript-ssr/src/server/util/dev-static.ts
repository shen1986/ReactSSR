import axios from 'axios';
import webpack from 'webpack';
import path from 'path';
import MemoryFs from 'memory-fs';
import fs from 'fs';
import NativeModule from 'module';
import vm from 'vm';
import serverRender from './server-render';
const proxy = require('koa-proxies');

import serverConfig from '../../../config/webpack.config.js/webpack.server.conf';

// 获取模版文件
const getTemplate = () => {
    return axios.get('http://0.0.0.0:8080/public/server.ejs')
    .then((res: {data: any}) => res.data)
    .catch((err) => {
      console.log(err);
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
// 自定义文件系统
// 默认情况下，webpack 使用普通文件系统来读取文件并将文件写入磁盘。
// 但是，还可以使用不同类型的文件系统（内存(memory), webDAV 等）来更改输入或输出行为。
// 为了实现这一点，可以改变 inputFileSystem 或 outputFileSystem。
// 例如，可以使用 memory-fs 替换默认的 outputFileSystem，以将文件写入到内存中，而不是写入到磁盘。
serverCompiler.outputFileSystem = mfs;

// 调用 watch 方法会触发 webpack 执行器，但之后会监听变更（很像 CLI 命令: webpack--watch）
// 一旦 webpack 检测到文件变更，就会重新执行编译。该方法返回一个 Watching 实例。
let serverBundle: any;
// let createStoreMap: any;
serverCompiler.watch({}, (err, stats: any) => {
	if (err) {
		throw err;
	}
	const info = stats.toJson();
    if (stats.hasErrors()) {
        console.log('错误');
        console.error(info.errors);
    }
    if (stats.hasWarnings()) {
        console.log('警告');
        console.warn(info.warnings);
    }

    const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename);
    // 从内存中读取server bundle
    // 读出的bundle是为string类型，并不是js中可以使用的模块
    const bundle = mfs.readFileSync(bundlePath, 'utf-8');
    // 使用这种方式打包的模块无法使用require模式
    // const m = new Module();
    // m._compile(bundle, 'server-entry.js');
    const m = getModuleFromString(bundle, 'server-entry.js');
	serverBundle = m.exports;
	// createStoreMap = result.createStoreMap;
});

export default (app: any, router: any) => {
	// 开发环境
	// webpack启动时获取template，然后返回给前端
	// webpack-dev-server 编译的文件存储在内存中
	// 获取server端的bundle文件，这个文件是由执行webpack.server.conf.js文件获取的，并且开发环境下每次改变文件需要重新编译

	// 代理转发
	app.use(
		proxy('/public', {
			target: 'http://0.0.0.0:8080',
		}),
    );

	router.get('*', async (ctx: any, next: any) => {
        if (!serverBundle) {
            ctx.body = 'waiting for compile';
            return;
        }

        const template = await getTemplate();
        await serverRender(ctx, next, serverBundle, template);
	});
};
