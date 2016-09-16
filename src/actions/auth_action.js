import axios from 'axios';

export const USER_AUTH = 'USER_AUTH';

export function userAuth(redditCode) {

  const request = axios.post(
    'https://www.reddit.com/api/v1/access_token',
    `grant_type=authorization_code&code=${redditCode}&redirect_uri=https%3A%2F%2Fv4r%2Eherokuapp%2Ecom%2Fsignin`,
    {
      headers: {
        'Content-Type'  : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic c0RGS2RzMmxzejVvSHc6eHppQmVYWTNSTmdadndlYWpWYm5vMDBCcDNJ'
      }
    }
  ).then(function(data){
    return data;
  });

  return{
    type: USER_AUTH,
    payload: request
  };
}
