import { hot } from 'react-hot-loader'; // eslint-disable-line
import React, { Component } from 'React';
import App from './App';

// Remove the server-side injected CSS.
const deleteServerCss = (theApp: any) => {
    class Main extends Component {
        private componentDidMount() {
            const jssStyles = document.getElementById('jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        private render() {
            return <theApp />;
        }
    }
    return Main;
};

export default hot(module)(deleteServerCss(App));
