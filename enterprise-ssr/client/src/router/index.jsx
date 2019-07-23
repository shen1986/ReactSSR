import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';

import TopicList from '../containers/TopicList';
import TopicDetail from '../containers/TopicDetail';
import TestApi from '../containers/test/api-test';

export default () => [
    <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
    <Route path="/list" component={TopicList} exact key="list" />,
    <Route path="/detail" component={TopicDetail} key="detail" />,
    <Route path="/test" component={TestApi} key="test" />,
];
