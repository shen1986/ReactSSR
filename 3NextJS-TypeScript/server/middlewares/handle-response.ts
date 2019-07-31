const filterBody = (ctx) => {
    if (ctx.data && ctx.data.error) {
        ctx.body = {
            ...ctx.data.error,
        };
    } else {
        ctx.body = {
            ...ctx.data,
        };
    }
};

export default async (ctx, next) => {
    const reg = new RegExp('^/api');
    await next();
    if (reg.test(ctx.originalUrl)) {
        filterBody(ctx);
    }
};
