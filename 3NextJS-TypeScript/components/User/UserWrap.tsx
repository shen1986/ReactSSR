import React from 'react';
import PropTypes from 'prop-types';
import {
    inject,
    observer,
} from 'mobx-react';

import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/styles';

import UserIcon from '@material-ui/icons/AccountCircle';

import Container from '../Common/ContentWrap';
import userStyles from './styles/user-style';

@inject((stores: any) => {
    return {
        user: stores.appState.user,
    };
}) @observer
class User extends React.Component<any> {
    componentDidMount() {
        // do someting here
    }

    render() {
        const classes = this.props.classes;
        const user = this.props.user.info || {};
        return (
            <Container>
                <div>
                    <div className={classes.avatar}>
                        <div className={classes.bg} />
                        {
                            user.avatar_url ?
                                <Avatar className={classes.avatarImg} src={user.avatar_url} /> :
                                <Avatar className={classes.avatarImg}>
                                    <UserIcon />
                                </Avatar>
                        }
                        <span className={classes.userName}>{user.loginName || '未登录'}</span>
                    </div>
                    {this.props.children}
                </div>
            </Container>
        );
    }
}

(User as any).wrappedComponent.propTypes = {
    user: PropTypes.object.isRequired,
};

(User as any).propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
};

export default withStyles(userStyles as any)(User);
