import React, { Component } from 'react';
import { observer, inject, propTypes } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('appState') @observer
class TopicList extends Component {
    constructor(props) {
        super(props);
    }

    private componentDidMount() {
        // 获取数据
        this.props.topicStore.fetchTopics('all');
    }

    private bootstrap(): void {
        // 做数据的初始化
        // 可以异步的操作数据
        // 服务端渲染时，执行bootstrapper()方法(server-render.js中))时，就会来执行组件中此方法，
        // 组件中此方法执行结束后，才会继续渲染工作
        return new Promise((resolve) => {
            setTimeout(() => {
                this.props.appState.count = 4;
            }, 1000);
            resolve(true);
        });
    }
    private render() {
        return (
            <div>
                123123
            </div>
        );
    }
}

TopicList.propTypes = {
    appState: propTypes.objectOrObservableObject,
    topicStore: propTypes.objectOrObservableObject,
    history: PropTypes.object,
};

export default TopicList;
