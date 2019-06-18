import Koa from 'koa';
import ReactSSR from 'react-dom/server';
import serverEntry from '../../dist/server-entry';
import Router from 'koa-router';

const app = new Koa();

const router = new Router();

router.get('*',  async (ctx, next) => {
  const appString = ReactSSR.renderToString(serverEntry.default);
  ctx.body = appString;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3333, () => {
  console.log('server is listening at port 3333');
});
