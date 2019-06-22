import React, { Component } from 'react';
import Routes from '../router';
import {
	Link,
} from 'react-router-dom';

class App extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<React.Fragment>
				<div>
					<Link to="/">首页</Link>
					<br/>
					<Link to="/detail/123">详情页</Link>
				</div>
				<Routes />
		  	</React.Fragment>
		);
	}
}
export default App;
