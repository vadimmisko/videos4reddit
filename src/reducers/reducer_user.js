import { USER_AUTH } from '../actions/auth_action';
import { USER_INFO } from '../actions/user_actions';

const INITIAL_STATE = { info:[], access:[] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_AUTH:
      sessionStorage.setItem('access_token' , action.payload.data.access_token);
      sessionStorage.setItem('token_type'   , action.payload.data.token_type);
      sessionStorage.setItem('refresh_token', action.payload.data.refresh_token);
      return { ...state, access: action.payload.data };
    case USER_INFO:
      return { ...state, info: action.payload.data };

    default:
      return state;
  }
}
