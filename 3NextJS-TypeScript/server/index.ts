import Koa from 'koa';
import next from 'next';
import Router from 'koa-router';
import session from 'koa-session';
import loginRouter from './routers/handle-login';
import proxy from './routers/proxy';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = new Koa();
        const router = new Router();

        // session 配置
        server.keys = ['koa ssr demo'];
        const config = {
            key: 'koa:ssr',
            maxAge: 86400000,
            overwrite: true,
            httpOnly: true,
            signed: true,
            rolling: false,
            renew: false,
        };
        server.use(session(config, server));

        router.use('/api/user', loginRouter.routes());
        router.use('/api/v1', proxy.routes());

        router.get('/a', async (ctx) => {
            await app.render(ctx.req, ctx.res, '/b', ctx.query);
            ctx.respond = false;
        });

        router.get('/b', async (ctx) => {
            await app.render(ctx.req, ctx.res, '/a', ctx.query);
            ctx.respond = false;
        });

        router.get('*', async (ctx) => {
            await handle(ctx.req, ctx.res);
            ctx.respond = false;
        });

        server.use(async (ctx, next) => {
            ctx.res.statusCode = 200;
            await next();
        });

        server.use(router.routes());
        server.listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`);
        });
    });