import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, pink } from '@material-ui/core/colors';

import App from './views/App';
import AppState from './store/app-state';

const theme = createMuiTheme({
    palette: {
        primary: pink,
        secondary: lightBlue,
        type: 'light',
    },
});

const initialState = window.__INITIAL_STATE__ || {}; // eslint-disable-line

const root = document.getElementById('root');
const render = (Component) => {
    const renderMethod = ReactDOM.hydrate;
    renderMethod(
        <AppContainer>
            <Provider appState={new AppState(initialState.appState)}>
                <BrowserRouter>
                    <MuiThemeProvider theme={theme}>
                        <Component />
                    </MuiThemeProvider>
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        root,
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./views/App', () => {
        const NextApp = require('./views/App').default; // eslint-disable-line
        render(NextApp);
    });
}
