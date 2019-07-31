import React, { Component } from 'react';
import { observer, inject, PropTypes as propTypes } from 'mobx-react';
// import PropTypes from 'prop-types';
import UserWrap from '../components/User/UserWrap';

interface IProps {
    user: any;
}

@inject((stores: any) => ({
  user: stores.userStore.user,
  login: stores.userStore.login,
})) @observer
class Login extends Component<IProps> {
  state = {};

  render () {
    return (
      <UserWrap user={this.props.user}>
        <div>
          login
        </div>
      </UserWrap>
    );
  }
}

(Login as any).propTypes = {
  // login: PropTypes.func,
  user: propTypes.observableObject,
};

export default Login;
