import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'mobx-react';
import testHoc from '../lib/with-mobx';
import Layout from '../components/Layout';
import { MuiThemeProvider } from '@material-ui/core/styles';
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

    render() {
        const { Component, pageProps, mobxStore } = this.props as any;

        return (
            <Container>
                <Provider {...mobxStore}>
                    <MuiThemeProvider theme={theme}>
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
