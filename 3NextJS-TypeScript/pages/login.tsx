import React from 'react';
import PropTypes from 'prop-types';
import {
    inject,
    observer,
} from 'mobx-react';
import queryString from 'querystring';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'next/router';

import UserWrapper from '../components/User/UserWrap';
import loginStyles from '../components/User/styles/loginStyle';

class UserLogin extends React.Component<any, any> {
    static contextTypes = {
        router: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            accesstoken: '',
            helpText: '',
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    getFrom(location?: any) {
        // console.log(this.props.router);
        const myLocation = location || this.props.router.pathname;
        // console.log(this.props.router.pathname);
        const query = queryString.parse(myLocation.search);
        return query.from || '/user/info';
    }

    handleLogin() {
        // handle login here
        if (!this.state.accesstoken) {
            return this.setState({
                helpText: '必须填写',
            });
        }
        this.setState({
            helpText: '',
        });
        return this.props.appState.login(this.state.accesstoken)
            .catch((msg) => {
                this.props.appState.notify({ message: msg });
            });
    }

    handleInput(event) {
        this.setState({
            accesstoken: event.target.value.trim(),
        });
    }

    render() {
        const classes = this.props.classes;
        const isLogin = this.props.user.isLogin;
        const from = this.getFrom();

        if (isLogin) {
            return this.props.router.push(from as string);
                // <Redirect to={from} />
        }

        return (
            <UserWrapper>
                <div className={classes.root}>
                    <TextField
                        label="请输入Cnode AccessToken"
                        placeholder="请输入Cnode AccessToken"
                        required
                        helperText={this.state.helpText}
                        value={this.state.accesstoken}
                        onChange={this.handleInput}
                        className={classes.input}
                    />
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={this.handleLogin}
                        className={classes.loginButton}
                    >
                        登 录
                    </Button>
                </div>
            </UserWrapper>
        );
    }
}

(UserLogin as any).propTypes = {
    classes: PropTypes.object.isRequired,
    appState: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default withRouter(withStyles(loginStyles as any)(inject((stores: any) => {
    return {
        appState: stores.appState,
        user: stores.appState.user,
    };
})(observer(UserLogin))) as any);
