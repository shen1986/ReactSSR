import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'mobx-react';
import testHoc from '../lib/with-mobx';
import Layout from '../components/Layout';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/theme';

class MyApp extends App {
    static async getInitialProps(ctx) {
        const { Component } = ctx;
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    componentDidMount() {
        // 必须移除服务端渲染的jss文件，不然会加载2遍相同的css
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, mobxStore } = this.props as any;

        return (
            <Container>
                <Provider {...mobxStore}>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline />
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </MuiThemeProvider>
                </Provider>
            </Container>
        );
    }
}

export default testHoc(MyApp);
