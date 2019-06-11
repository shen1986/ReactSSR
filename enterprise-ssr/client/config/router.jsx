import React from 'react';
import {
    Route,
} from 'react-router-dom';

import TopicList from '../views/TopicList';
import TopicDetail from '../views/TopicDetail';

export default () => [
    <Route path="/" component={TopicList} exact />,
    <Route path="/detail" component={TopicDetail} />,
];
