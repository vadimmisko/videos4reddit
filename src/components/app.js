import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class App extends Component {
  exit(){
    var checkout = confirm('Signout?');
    if (checkout) {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('token_type');
      sessionStorage.removeItem('refresh_token');

      browserHistory.push('/');
    }
  }

  render() {
    return (
      <div>

        <header className="navbar">
          <div></div>
          <Link to='/'><div className="logo"></div></Link>
          <div className="navbar-auth">
          {
            sessionStorage.getItem('user')
            ?
            <span onClick={this.exit}>{sessionStorage.getItem('user')}</span>
            :
            <Link to='/signin'>Sign in</Link>
          }
          </div>
        </header>

        {this.props.children}

      </div>
    );
  }
}
