import { hot } from 'react-hot-loader'; // eslint-disable-line
import React, { Component } from 'react';
import App from './App';

// Remove the server-side injected CSS.
const deleteServerCss = (TheApp: any) => {
    class Main extends Component<any, any> {
        public componentDidMount() {
            const jssStyles = document.getElementById('jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        public render() {
            return <TheApp />;
        }
    }
    return Main;
};

export default hot(module)(deleteServerCss(App));
