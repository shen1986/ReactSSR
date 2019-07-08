const filterBody = (ctx: any) => {
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

export default async (ctx: any, next: any) => {
    const reg = new RegExp('^/api');
    await next();
    if (reg.test(ctx.path)) {
        filterBody(ctx);
    }
};
