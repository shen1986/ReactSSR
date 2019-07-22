import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('appState')
@observer
class TopicList extends Component<any, any> {
	static propTypes: { appState: PropTypes.Requireable<object>; };
	constructor(props: any) {
		super(props);
		this.changeName = this.changeName.bind(this);
    }

	public componentDidMount() {
		// 获取数据
		// this.props.topicStore.fetchTopics('all');
	}

	public bootstrap(): Promise<Boolean> {
        console.log(11111111);
		// 做数据的初始化
		// 可以异步的操作数据
		// 服务端渲染时，执行bootstrapper()方法(server-render.js中))时，就会来执行组件中此方法，
		// 组件中此方法执行结束后，才会继续渲染工作
		return new Promise((resolve: any, reject: any) => {
            console.log(222222);
			setTimeout(() => {
				this.props.appState.count = 4;
			},         1000);
			resolve(true);
		});
	}

	changeName(event: any) {
		this.props.appState.changeName(event.target.value);
	}

	public render() {
		return (
			<div>
				<input type="text" onChange={this.changeName} />
				<span>{this.props.appState.msg}</span>
			</div>
		);
	}
}

TopicList.propTypes = {
	appState: PropTypes.object,
};

export default TopicList;
