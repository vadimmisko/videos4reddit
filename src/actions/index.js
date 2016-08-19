import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_MORE_POSTS = 'FETCH_MORE_POSTS';

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

export function fetchMorePosts(oldstate) {
  const request = axios.get(`${ROOT_URL}.json?after=${oldstate.data.children[oldstate.data.children.length - 1].data.name}`)
    .then(function(response) {
      var old = oldstate.data.children.concat(response.data.data.children);
      var st = {data:{data:{children:old}}};
      return st;
    });

  return{
    type: FETCH_MORE_POSTS,
    payload: request
  };
}
