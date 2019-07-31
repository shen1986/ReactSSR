import React from 'react';
import { createStoreMap } from '../store';
import { useStaticRendering } from 'mobx-react';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState? : any) {
    if (isServer) {
        return createStoreMap(initialState);
    }

    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = createStoreMap(initialState);
    }
    return window[__NEXT_REDUX_STORE__];
}

export default (Comp: any) => {
    class WithMobxApp extends React.Component {
        private mobxStore: any;
        constructor(props) {
            super(props);
            this.mobxStore = getOrCreateStore(
                props.initialMobxState,
            );
        }

        render() {
            const {
                Component,
                pageProps,
                ...rest
            } = (this.props as any);

            // 自定义个page的props值
            if (pageProps) {
                // pageProps.test = '123';
            }

            return (
                <Comp
                    Component= { Component }
                    pageProps = { pageProps }
                    {...rest }
                    mobxStore = { this.mobxStore }
                />
            );
        }

        static async getInitialProps(ctx: any) {
            let mobxStore;

            mobxStore = getOrCreateStore();

            ctx.mobxStore = mobxStore;

            let appProps = {};
            if (typeof Comp.getInitialProps === 'function') {
                appProps = await Comp.getInitialProps(ctx);
            }

            return {
                ...appProps,
                initialMobxState: mobxStore,
            };
        }
    }

    return WithMobxApp;
};
