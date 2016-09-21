import axios from 'axios';

export const FETCH_POSTS      = 'FETCH_POSTS';
export const FETCH_POST       = 'FETCH_POST';
export const FETCH_MORE_POSTS = 'FETCH_MORE_POSTS';

const ROOT_URL = 'https://www.reddit.com/r/videos';

export function fetchPosts() {
  if (!localStorage.getItem('sort-by')) {
    localStorage.setItem('sort-by', 'hot');
  }

  var sorting = localStorage.getItem('sort-by');

  const request = axios.get(`${ROOT_URL}/${sorting}/.json`);

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

export function fetchMorePosts(oldState) {
  const request = axios.get(`${ROOT_URL}.json?after=${oldState.data.children[oldState.data.children.length - 1].data.name}`)
    .then(function(response) {
      var newState = {data:{data:{children: oldState.data.children.concat(response.data.data.children)}}};
      return newState;
    });

  return{
    type: FETCH_MORE_POSTS,
    payload: request
  };
}
