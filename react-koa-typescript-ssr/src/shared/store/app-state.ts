import { observable, computed, action, autorun } from 'mobx';

class AppState {
	constructor({ count, name } = { count: 0, name: 'shenxf' }) {
		this.count = count;
		this.name = name;
	}

	@observable private count: number;

	@observable private name: string;

	@computed
	get msg() {
		return `${this.name} say count is ${this.count}`;
	}

	@action
	public add() {
		this.count += 1;
	}

	@action
	public changeName(name: string) {
		this.name = name;
	}

	// 服务端渲染用到的数据与客户端渲染用到的store数据不同步解决方法
	// 将AppState这个实例在服务端渲染完成之后得到的数据以json的格式取得，之后将这部分数据插入到客户端中
	public toJson() {
		return {
			count: this.count,
			name: this.name,
		};
	}
}

autorun(() => {
	console.log('123123');
});

export default AppState;
