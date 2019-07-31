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

interface IProps {
    topicStore: any;
    appState: any;
    history: any;
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

  bootstrap () {
    // 做数据的初始化
    // 可以异步的操作数据
    // 服务端渲染时，执行bootstrapper()方法(server-render.js中))时，就会来执行组件中此方法，
    // 组件中此方法执行结束后，才会继续渲染工作
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 4;
      },         1000);
      resolve(true);
    });
  }

  handleTabChange (e, value) {
    const { history } = this.props;
    this.setState({
      tabValue: value,
    });

    history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    });
    this.props.topicStore.fetchTopics(value);
  }

  // 列表项点击事件
  listItemClick (id) {
    this.props.history.push(`/detail/${id}`);
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

export default TopicList;
