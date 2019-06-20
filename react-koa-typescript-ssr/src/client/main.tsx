import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../shared/containers/App';

const root = document.getElementById('root');
const render = Component => {
    ReactDom.hydrate(
        <AppContainer>
            <App />
        </AppContainer>, 
        root
    );
}

render(App);

if (module.hot) {
    module.hot.accept('../shared/containers/App.tsx', () => {
        const NextApp = require('../shared/containers/App').default;
        render(NextApp);
    })
}