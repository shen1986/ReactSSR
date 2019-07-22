import React from 'react';
import ReactDom from 'react-dom';
import HotApp from '../shared/containers/HotApp';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import AppState from '../shared/store/app-state';
import { deepPurple } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// @ts-ignore
const initialState = window.__INITIAL_STATE__ || {};

const appState = new AppState(initialState.appState);
// const topicStore = new TopicStore(initialState.topicStore);
// const userStore = new UserStore(initialState.userStore);

const m: any = module;
const renderMethod = !m.hot ? ReactDom.hydrate : ReactDom.render;

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

renderMethod(
    <Provider
        appState={appState}
        // topicStore={topicStore}
        // userStore={userStore}
    >
        <Router>
            <MuiThemeProvider theme={theme}>
                <HotApp />
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root'),
);
