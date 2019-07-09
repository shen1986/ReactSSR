import React from 'react';
import { StaticRouter } from 'react-router-dom';
import App from '../shared/containers/App';
import { Provider, useStaticRenderidng } from 'mobx-react';

// 让mobx在服务端渲染的时候不会重复数据变换
useStaticRenderidng(true);

export default (stores, routerContent, url, sheetsRegistry, generateClassName, theme) => (
    <Provider {...stores} >
        <StaticRouter context={routerContent} location={url}>
            <App />
        </StaticRouter>
    </Provider>
);
