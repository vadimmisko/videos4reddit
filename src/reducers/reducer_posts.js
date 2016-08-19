import {FETCH_POSTS, FETCH_POST, FETCH_MORE_POSTS} from '../actions/index';

const INITIAL_STATE = { all:[], post: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, all: action.payload.data };
    case FETCH_POST:
      return { ...state, post: action.payload.data };
    case FETCH_MORE_POSTS:
      return { ...state, all: action.payload.data };
    default:
      return state;
  }
}
