import Koa from 'Koa';
import ReactSSR from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import serve from 'koa-static';
import devStatic from './util/dev-static';

const isDev = process.env.NODE_ENV === 'development';

const app = new Koa();

const router = new Router();

if (!isDev) {
	const serverEntry = require('../../dist/server-entry').default;
	const template = fs.readFileSync(path.join(__dirname, '../../dist/app.html'), 'utf8');
	app.use(serve(path.join(__dirname, '../../dist')));
	router.get('*', async (ctx, next) => {
		const appString = ReactSSR.renderToString(serverEntry);
		ctx.body = template.replace('<!-- app -->', appString);
	});
} else {
	devStatic(app, router);
}

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3333, () => {
	console.log('server is listening at port 3333');
});
