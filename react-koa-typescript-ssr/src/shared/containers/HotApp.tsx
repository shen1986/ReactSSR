import { hot } from 'react-hot-loader'; // eslint-disable-line
import React, { Component } from 'react';
import App from './App';

// Remove the server-side injected CSS.
const deleteServerCss = (TheApp) => {
    class Main extends Component {
        private componentDidMount() {
            const jssStyles = document.getElementById('jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        private render() {
            return <TheApp />;
        }
    }
    return Main;
};

export default hot(module)(deleteServerCss(App));
