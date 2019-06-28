import Router from 'koa-router';
import querystring from 'query-string';
import $http from './request';
import { CSSTransition } from 'react-transition-group';

const router = new Router();

const proxy = async (ctx) => {
    const user = ctx.session.user || {};
    try {
        console.log(ctx.path);
        const result = await $http(ctx.path, {
            method: ctx.method,
            params: ctx.query,
            data: querystring.stringify(Object.assign({}, ctx.request.body, {
                accesstoken: user.accessToken,
            })),
        });
        console.log(result);
        ctx.data = result.data;
    } catch (err) {
        console.log(err);
        ctx.status = 500;
        if (err.response) {
            ctx.data = err.response.data;
        } else {
            ctx.data = {
                success: false,
                msg: '未知错误',
            };
        }
    }
};

router.get('/topics', proxy);

export default router;
