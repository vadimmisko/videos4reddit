import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';

const ROOT_URL = 'https://www.reddit.com/r/videos';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}.json`);

  return{
    type: FETCH_POSTS,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/comments/${id}.json`);

  return{
    type: FETCH_POST,
    payload: request
  };
}
