import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import HotApp from '../shared/containers/HotApp';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';

import AppState from '../shared/store/app-state';

const m: any = module;
const renderMethod = !m.hot ? ReactDom.hydrate : ReactDom.render;

renderMethod(
    <Provider appState={new AppState()}>
        <Router>
            <HotApp />
        </Router>
    </Provider>,
    document.getElementById('root'),
);
