import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index/posts_index';
import PostsShow from './components/posts_show/posts_show';
import UserAuth from './components/user_auth';

export default(
  <Route path='/' component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path='post/:id' component={PostsShow} />
    <Route path='signin' component={UserAuth} />
  </Route>
);
