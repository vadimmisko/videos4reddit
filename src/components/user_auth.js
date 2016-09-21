import _ from 'lodash';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import randomWords from 'random-words';

import Loader from './loader/loader.js';
import { userAuth } from '../actions/auth_action';
import { userInfo } from '../actions/user_actions';

class UserLogin extends Component {
  render() {
    if (this.props.location.search == '') {
      // User is on the /signin for the first time
      // and will be redirected TO the reddit

      const randomCombination = randomWords({ exactly: 4, join: '-' });

      sessionStorage.setItem('randomCombination', randomCombination);

      window.location.assign(`https://www.reddit.com/api/v1/authorize?response_type=code&client_id=sDFKds2lsz5oHw&state=${randomCombination}&redirect_uri=https%3A%2F%2Fv4r%2Eherokuapp%2Ecom%2Fsignin&duration=permanent&scope=identity%2Chistory%2Cread%2Cmysubreddits%2Cvote`);

    }else {
      // User is on the /signin for the second time
      // and is redirected FROM the reddit

      // Checking for the right source & no errors
      if (sessionStorage.getItem('randomCombination') == this.props.location.query.state && !this.props.location.query.error) {
        this.props.userAuth(this.props.location.query.code).then(obj => {
          this.props.userInfo(obj.payload.data.access_token);
        });

        sessionStorage.removeItem('randomCombination');
        const toTheFrontpage = _.debounce(() => { browserHistory.push('/') }, 1000);
        toTheFrontpage();
      }else {
        console.log('Error or Wrong Source');
        sessionStorage.removeItem('randomCombination');
      }

      // In case of errors
      if (this.props.location.query.error) {
        switch (this.props.location.query.error) {
          case 'access_denied':
            var login_err = 'User chose not to grant your app permissions';
            break;
          case 'unsupported_response_type':
            var login_err = 'Invalid response_type parameter in initial Authorization';
            break;
          case 'invalid_scope':
            var login_err = 'Invalid scope parameter in initial Authorization';
            break;
          case 'invalid_request':
            var login_err = 'There was an issue with the request sent to /api/v1/authorize';
            break;
        }
      }

    }

    return(
      <div className='auth'>
        Signing you in...
        { this.props.location.query.error ? <div className='auth-error'>{login_err}</div> : <Loader /> }
      </div>
    );
  }
}

export default connect(null, { userAuth, userInfo })(UserLogin);
