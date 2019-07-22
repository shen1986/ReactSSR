import Router from 'koa-router';
import querystring from 'query-string';
import $http from './request';

const router = new Router();

const proxy = async (ctx: any) => {
    const user = ctx.session.user || {};
    try {
        const result = await $http(ctx.path, {
            method: ctx.method,
            params: ctx.query,
            data: querystring.stringify(Object.assign({}, ctx.request.body, {
                accesstoken: user.accessToken,
            })),
        });
        ctx.data = result.data;
    } catch (err) {
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
router.post('/message/mark_all', proxy);

export default router;
