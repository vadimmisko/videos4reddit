import axios from 'axios';

export const USER_INFO = 'USER_INFO';
export const USER_VOTE = 'USER_VOTE';

const ROOT_URL = 'https://oauth.reddit.com';
var token = sessionStorage.getItem('access_token');

export function userInfo(token) {
  const request = axios.get(
    `${ROOT_URL}/api/v1/me`,
    {
      headers: {
        'Authorization' : `bearer ${token}`
      }
    }
  );

  return{
    type: USER_INFO,
    payload: request
  };
}

export function userVote(vote_data) {

  const request = axios.post(
    `${ROOT_URL}/api/vote`,
    `id=${vote_data[0].kind}_${vote_data[0].data.id}&dir=${vote_data[1]}`,
    {
      headers: {
        'Authorization' : `bearer ${token}`
      }
    }
  ).then(function(data){
    return data;
  });

  return{
    type: USER_VOTE,
    payload: request
  };
}
