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
import handleResponse  from './middlewares/handle-response';
import cors from 'koa2-cors';

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

// 中间件，把ctx.data => ctx.body
app.use(handleResponse);
app.use(cors({
    credentials: true, // request 的 credentials属性表示是否允许其他域发送cookie
}));
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
