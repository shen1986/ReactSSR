import React from 'react';
import PropTypes from 'prop-types';
import {
    inject,
    observer,
} from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import UserWrapper from '../../components/User/UserWrap';
import infoStyles from '../../components/User/styles/user-info-style';

const TopicItem = (({ topic }) => {
    return (
        <ListItem>
            <Avatar src={topic.author.avatar_url} />
            <ListItemText
                primary={topic.title}
                secondary={`最新回复：${topic.last_reply_at}`}
            />
        </ListItem>
    );
});

(TopicItem as any).propTypes = {
    topic: PropTypes.object.isRequired,
};

@inject((stores:any) => {
    console.log('stores.appState', stores.appState);
    return {
        user: stores.appState.user,
        appState: stores.appState,
    };
}) @observer
class UserInfo extends React.Component<any> {
    static contextTypes = {
        router: PropTypes.object,
    };

    componentWillMount() {
        this.props.appState.getUserDetail();
        this.props.appState.getUserCollection();
    }

    render() {
        const classes = this.props.classes;
        const topics = this.props.user.detail.recent_topics;
        const replies = this.props.user.detail.recent_replies;
        const collections = this.props.user.collections.list;
        return (
            <UserWrapper>
                <div className={classes.root}>
                    <Grid container spacing={10} alignItems="stretch">
                        <Grid item xs={12} md={4}>
                            <Paper elevation={2}>
                                <Typography className={classes.partTitle}>
                                    <span>最近发布的话题</span>
                                </Typography>
                                <List>
                                    {
                                        topics.length > 0 ?
                                            topics.map(topic =>
                                                <TopicItem topic={topic} key={topic.id} />) :
                                            <Typography align="center">
                                                最近没有发布过话题
                                            </Typography>
                                    }
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={2}>
                                <Typography className={classes.partTitle}>
                                    <span>新的回复</span>
                                </Typography>
                                <List>
                                    {
                                        replies.length > 0 ?
                                            replies.map(topic =>
                                                <TopicItem topic={topic} key={topic.id} />) :
                                            <Typography align="center">
                                                最近没有新的回复
                                            </Typography>
                                    }
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={2}>
                                <Typography className={classes.partTitle}>
                                    <span>收藏的话题</span>
                                </Typography>
                                <List>
                                    {
                                        collections.length > 0 ?
                                            collections.map(topic =>
                                                <TopicItem topic={topic} key={topic.id} />) :
                                            <Typography align="center">
                                                还么有收藏话题哦
                                            </Typography>
                                    }
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </UserWrapper>
        );
    }
}

(UserInfo as any).wrappedComponent.propTypes = {
    appState: PropTypes.object.isRequired,
};

(UserInfo as any).propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default withStyles(infoStyles)(UserInfo);
