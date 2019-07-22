import ReactSSR from 'react-dom/server';
import Helmet from 'react-helmet';
import ejs from 'ejs';
import serialize from 'serialize-javascript';
import { createMuiTheme } from '@material-ui/core/styles';
import { createGenerateClassName } from '@material-ui/styles';
import { lightBlue, pink } from '@material-ui/core/colors';
import { SheetsRegistry } from 'react-jss';

const  bootstrapper =  require('react-async-bootstrapper');

// 获取state
const getStoreState = (stores: any) => {
    // 服务端渲染结束后，得到数据默认值
    return Object.keys(stores).reduce((result: any, storeName) => {
        result[storeName] = stores[storeName].toJson();
        return result;
    },                                {});
};

export default async(ctx: any, next: any, bundle: any, template: any) => {
    const routerContext: any = {};
    const createStoreMap = bundle.createStoreMap;
    const stores = createStoreMap();
    const sheetsRegistry = new SheetsRegistry();
    // create a theme instance.
    const theme = createMuiTheme({
        palette: {
            primary: lightBlue,
            secondary: pink,
            type: 'light',
        },
    });
    const generateClassName = createGenerateClassName();
    const createApp = bundle.default;
    // console.log(bundle);
    const appTemplate = createApp(
        stores,
        routerContext,
        ctx.url,
        sheetsRegistry,
        generateClassName,
        theme,
    );

    for (const [key, value] of Object.entries(appTemplate)) {
        console.log(key, '-------', value);
        console.log(JSON.stringify(value));
    }

    await bootstrapper(appTemplate)
        .then(() => {
            console.log('1111', appTemplate);
            const appString = ReactSSR.renderToString(appTemplate);
            const helmet = Helmet.renderStatic();

            // 当路由中有redirect的情况
            // If we find a context.url, then we know the app redirected
            if (routerContext.url) {
                return ctx.redirect(routerContext.url);
            }

            const state = getStoreState(stores);
            console.log('state', state);

            // 将数据插入到html中，完成client端数据的同步
            /**
             * 使用<%%-  %>语法
             * webpack中的html-webpack-plugin插件编译ejs模板时，也是可以识别ejs语法的，所以在webpack编译时就将相应变量插入进去了
             * 可以使用ejs的一个loader来处理<%%-  %>，将编译出来的结果变为<%-  %>，这样就仍为正确的ejs模板语法
             */
            const html = ejs.render(template, {
                appString,
                initialState: serialize(state),
                title: helmet.title.toString(),
                meta: helmet.meta.toString(),
                link: helmet.link.toString(),
                style: helmet.style.toString(),
                materialCss: sheetsRegistry.toString(),
            });
            ctx.body = html;
        })
        .catch((err: any) => next(err));
};
