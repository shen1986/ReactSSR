import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import propTypes from 'prop-types';

@inject('appState')
@observer
class TopicList extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	public componentDidMount() {
		// 获取数据
		this.props.topicStore.fetchTopics('all');
	}

	public bootstrap(): Promise<Boolean> {
		// 做数据的初始化
		// 可以异步的操作数据
		// 服务端渲染时，执行bootstrapper()方法(server-render.js中))时，就会来执行组件中此方法，
		// 组件中此方法执行结束后，才会继续渲染工作
		return new Promise((resolve: any, reject: any) => {
			setTimeout(() => {
				this.props.appState.count = 4;
			},         1000);
			resolve(true);
		});
	}
	public render() {
		return <div>123123</div>;
	}
}

export default TopicList;
