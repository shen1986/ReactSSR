import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Loadable from 'react-loadable';

// const Loading = () => (
//   <div>
//     加载中。。。
//   </div>
// );

// code-spliting
// const TopicDetail = Loadable({
//   loader: () => import('../containers/topic-detail'),
//   loading: Loading,
// });
// const TopicList = Loadable({
//   loader: () => import('../containers/topic-list'),
//   loading: Loading,
// });

// import Login from '../containers/user/login';
import TopicList from '../containers/topic-list';
import TopicDetail from '../containers/topic-detail';
import TestApi from '../containers/test/api-text';

export default () => (
  <React.Fragment>
    <Route path="/" exact render={() => <Redirect to="/list" />} />
    <Route path="/list" component={TopicList} />
    <Route path="/detail/:id" component={TopicDetail} />
    <Route path="/test" component={TestApi} />
    {/* <Route path='/login' component={Login} /> */}
  </React.Fragment>
);
