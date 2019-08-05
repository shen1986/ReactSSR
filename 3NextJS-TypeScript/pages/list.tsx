import React, { Component } from 'react';
import { observer, inject, PropTypes as propTypes } from 'mobx-react';
import PropTypes from 'prop-types';
import Head from 'next/head';
// import { Helmet } from 'react-helmet';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContentWrap from '../components/Common/ContentWrap';
import TopicListItem from '../components/TopicList/ListItem';
import { tabs } from '../lib/variable-define';
import { withRouter } from 'next/router';

interface IProps {
    topicStore: any;
    appState: any;
    router: any;
}

interface IStates {
    tabValue: string;
}

@inject((stores: any) => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer
class TopicList extends Component<IProps, IStates> {
  constructor (props) {
    super(props);
    this.state = {
      tabValue: 'all',
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.listItemClick = this.listItemClick.bind(this);
  }

  componentDidMount () {
    // 获取数据
    this.props.topicStore.fetchTopics('all');
  }

  handleTabChange (e, value) {
    const { router } = this.props;
    this.setState({
      tabValue: value,
    });

    router.push({
      pathname: '/list',
      search: `?tab=${value}`,
    });
    this.props.topicStore.fetchTopics(value);
  }

  // 列表项点击事件
  listItemClick (id) {
      this.props.router.push({
          pathname: '/detail',
          query: { id },
      });
  }

  render () {
    return (
      <ContentWrap>
        <Head>
          <title>
            列表页
          </title>
          <meta name="decription" content="This is Description" />
        </Head>
        <Tabs onChange={this.handleTabChange} value={this.state.tabValue}>
          {
            Object.keys(tabs).map(key => (
              <Tab
                key={key}
                label={tabs[key]}
                value={key}
              />
            ))
          }
        </Tabs>
        {
          this.props.topicStore.syncing
            ? <CircularProgress color="secondary" size={100} />
            : (
              <List>
                {
                  this.props.topicStore.topics.map(topic => (
                    <TopicListItem
                      key={topic.id}
                      onClick={() => this.listItemClick(topic.id)}
                      topic={topic}
                    />
                  ))
                }
              </List>
            )
        }
      </ContentWrap>
    );
  }
}

(TopicList as any).propTypes = {
  appState: propTypes.objectOrObservableObject,
  topicStore: propTypes.objectOrObservableObject,
  history: PropTypes.object,
};

export default withRouter(TopicList);
