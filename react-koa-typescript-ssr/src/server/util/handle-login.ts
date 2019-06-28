import Router from 'koa-router';
import querystring from 'query-string';
import $http from './request';

const router = new Router();

router.post('/login', async(ctx: any, next: any) => {
    const { accessToken } = ctx.request.body;
    try {
        const result = await $http({
            url: '/api/v1/accesstoken',
            method: 'POST',
            data: querystring.stringify({
                accesstoken: accessToken,
            }),
        });

        if (result.status === 200 && result.data.success) {
            ctx.session.user = {
                accessToken,
                loginName: result.data.loginname,
                id: result.data.id,
                avatarUrl: result.data.avatar_url,
            };
            ctx.data = result.data;
        }
    } catch (err) {
        if (err.response) {
            ctx.data = err.response.data;
        } else {
            console.log(err);
        }
    }
});

export default router;
