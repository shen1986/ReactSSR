import React, { Component } from 'react';
import axios from 'axios';

class TextApi extends Component {

    getTopics() {
        axios.get('/api/v1/topics')
            .then((resp: any) => {
                console.log(resp);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    login() {
        axios.post('/api/user/login', {
            accessToken: '0ea7c355-331b-4b33-a6fb-53c4685b471e',
        })
        .then((resp) => {
            console.log(resp);
        }).catch((err) => {
            console.log(err);
        });
    }
    markAll() {
        axios.post('/api/v1/message/mark_all?needAccessToken=true')
            .then((resp) => {
                console.log(resp);
            }).catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <button onClick={this.getTopics}>topics</button>
                <button onClick={this.login}>login</button>
                <button onClick={this.markAll}>markAll</button>
            </div>
        );
    }
}

export default TextApi;
