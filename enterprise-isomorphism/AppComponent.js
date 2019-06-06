import React, {Component} from 'react';
import './main.css';
export class AppComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '1231'
        }
    }
    render() {
        return <h1>Hello,Webpack{this.state.message}</h1>
    }
}