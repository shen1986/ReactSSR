import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import {
    inject,
    observer,
} from 'mobx-react';
import Head from 'next/head';
import { withRouter } from 'next/router';

import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconReply from '@material-ui/icons/Reply';
import CircularProgress from '@material-ui/core/CircularProgress';

import SimpleMDE from '../components/SimpleMde';

import Container from '../components/Common/ContentWrap';

import { topicDetailStyle } from '../components/Detail/style';

import Reply from '../components/Detail/reply';
import formatDate from '../lib/date-format';

@inject((stores: any) => {
    return {
        topicStore: stores.topicStore,
        appState: stores.appState,
    };
}) @observer
class TopicDetail extends React.Component<any, any> {
    static contextTypes = {
        router: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            newReply: '',
            showEditor: false,
        };
        this.handleNewReplyChange = this.handleNewReplyChange.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.handleReply = this.handleReply.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.router.query;
        console.log('component did mount id:', id);
        this.props.topicStore.getTopicDetail(id).catch((err) => {
            console.log('detail did mount error:', err);
        });
        setTimeout(() => {
            this.setState({
                showEditor: true,
            });
        },         1000);
    }

    getTopic() {
        console.log('id2', this.props.router);
        const { id } = this.props.router.query;
        return this.props.topicStore.detailsMap[id as string];
    }
    // asyncBootstrap() {
    //     console.log('topic detail invoked');
    //     const id = this.props.match.params.id;
    //     return this.props.topicStore.getTopicDetail(id).then(() => {
    //         return true;
    //     }).catch((err) => {
    //         throw err;
    //     });
    // }

    handleNewReplyChange(value) {
        this.setState({
            newReply: value,
        });
    }

    goToLogin() {
        this.context.router.history.push('/user/login');
    }

    handleReply() {
        // do reply here
        this.getTopic().doReply(this.state.newReply)
            .then(() => {
                this.setState({
                    newReply: '',
                });
                this.props.appState.notify({ message: '评论成功' });
            })
            .catch(() => {
                this.props.appState.notify({ message: '评论失败' });
            });
    }

    render() {
        const topic = this.getTopic();
        const classes = this.props.classes;
        if (!topic) {
            return (
                <Container>
                    <section className={classes.loadingContainer}>
                        <CircularProgress color="secondary" />
                    </section>
                </Container>
            );
        }
        const createdReplies = topic.createdReplies;
        const user = this.props.appState.user;
        console.log(createdReplies);
        return (
            <div>
                <Container>
                    <Head>
                        <title>{topic.title}</title>
                    </Head>
                    <header className={classes.header}>
                        <h3>{topic.title}</h3>
                    </header>
                    <section className={classes.body}>
                        <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
                    </section>
                </Container>

                {
                    createdReplies && createdReplies.length > 0 ?
                        (
                            <Paper elevation={4} className={classes.replies}>
                                <header className={classes.replyHeader}>
                                    <span>{' '}</span>
                                    <span>{'我的最新回复'}</span>
                                </header>
                                {
                                    createdReplies.map((reply) => {
                                        return (
                                            <Reply
                                                reply={Object.assign({}, reply, {
                                                    author: {
                                                        avatar_url: user.info.avatar_url,
                                                        loginname: user.info.loginName,
                                                    },
                                                })}
                                                key={reply.id}
                                            />
                                        );
                                    })
                                }
                            </Paper>
                        ) :
                        null
                }

                <Paper elevation={4} className={classes.replies}>
                    <header className={classes.replyHeader}>
                        <span>{`${topic.reply_count} 回复`}</span>
                        <span>{`最新回复 ${formatDate(topic.last_reply_at, 'yy年m月dd日')}`}</span>
                    </header>
                    {
                        (this.state.showEditor && user.isLogin) &&
                        <section className={classes.replyEditor}>
                            <SimpleMDE
                                onChange={this.handleNewReplyChange}
                                value={this.state.newReply}
                                options={{
                                    toolbar: false,
                                    autoFocus: true,
                                    spellChecker: false,
                                    placeholder: '添加你的精彩回复',
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleReply}
                                className={classes.replyButton}
                            >
                                <IconReply />
                            </Button>
                        </section>
                    }
                    {
                        !user.isLogin ?
                            (
                                <section className={classes.notLoginButton}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={this.goToLogin}
                                    >
                                        登录进行回复
                                    </Button>
                                </section>
                            ) :
                            null
                    }
                    <section>
                        {
                            topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
                        }
                    </section>
                </Paper>
            </div>
        );
    }

    static wrappedComponent = {
        propTypes: {
            appState: PropTypes.object.isRequired,
            topicStore: PropTypes.object.isRequired,
        },
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
    };
}

export default withStyles(topicDetailStyle as any)(withRouter(TopicDetail));
