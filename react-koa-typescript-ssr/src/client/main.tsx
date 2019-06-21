import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../shared/containers/App';

const root = document.getElementById('root');
const render = (Component: any) => {
    ReactDom.hydrate(
        <AppContainer>
            <Component />
        </AppContainer>,
        root,
    );
};

render(App);

const m: any = module;
if (m.hot) {
    m.hot.accept('../shared/containers/App.tsx', () => {
        const NextApp = require('../shared/containers/App').default;
        render(NextApp);
    });
}
