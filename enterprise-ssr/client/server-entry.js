import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider, useStaticRendreing } from 'mobx-react';
import App from './views/App';

// 让 Mobx 在服务端渲染的时候不会重复数据变换
useStaticRendreing(true);

// {appStore: xxx}
export default (stores, routerContext, url) => (
    <Provider {...stores}>
        <StaticRouter context={routerContext} location={url}>
            <App />
        </StaticRouter>
    </Provider>
);
