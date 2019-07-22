import React from 'react';
import { StaticRouter } from 'react-router-dom';
import App from '../shared/containers/App';
import { Provider, useStaticRendering } from 'mobx-react';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createStoreMap } from '../shared/store/store';

// 让mobx在服务端渲染的时候不会重复数据变换
useStaticRendering(true);

// {appStore: xxx}
export default (stores: any, routerContent: any, url: any, sheetsRegistry: any,
                generateClassName: any, theme: any) => (
    <Provider {...stores} >
        <StaticRouter context={routerContent} location={url}>
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme}>
                    <App />
                </MuiThemeProvider>
            </JssProvider>
        </StaticRouter>
    </Provider>
);

export { createStoreMap };
