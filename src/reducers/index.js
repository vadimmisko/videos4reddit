import { combineReducers } from 'redux';

import PostsReducer   from './reducer_posts';
import UserReducer    from './reducer_user';

const rootReducer = combineReducers({
  posts : PostsReducer,
  user  : UserReducer
});

export default rootReducer;
