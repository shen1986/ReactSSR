import React, { Component } from 'react';
import Routes from '../router';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    private render() {
        return (
            <React.Fragment>
                <Routes />
            </React.Fragment>
        );
    }
}

export default App;
