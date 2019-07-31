import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'mobx-react';
import testHoc from '../lib/with-mobx';
import Layout from '../components/Layout';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import '../styles/style.less'; // 全局式样

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ef5350',
        },
        secondary: {
            main: deepPurple[400],
        },
        type: 'light',
    },
});

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
