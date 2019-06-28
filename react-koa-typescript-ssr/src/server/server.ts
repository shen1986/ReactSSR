import Koa from 'Koa';
import ReactSSR from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import devStatic from './util/dev-static';
import loginRouter from './util//handle-login';
import proxy from './util/proxy';

const isDev = process.env.NODE_ENV === 'development';

const app = new Koa();
app.keys = ['koa ssr demo'];

const router = new Router();
const config = {
    key: 'koa:ssr',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
};

app.use(bodyParser());
app.use(session(config, app));

router.use('/api/user', loginRouter.routes());
router.use('/api/v1', proxy.routes());

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
