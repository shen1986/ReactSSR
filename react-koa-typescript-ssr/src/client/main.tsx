import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../shared/containers/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import AppState from '../shared/store/app-state';

const m: any = module;
const renderMethod = !m.hot ? ReactDom.hydrate : ReactDom.render;
const root = document.getElementById('root');
const render = (Component: any) => {
    renderMethod(
        <AppContainer>
            <Provider appState={new AppState()}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        root,
    );
};

render(App);

if (m.hot) {
    m.hot.accept('../shared/containers/App.tsx', () => {
        const NextApp = require('../shared/containers/App').default;
        render(NextApp);
    });
}
