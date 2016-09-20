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

        <footer className="footer">
          <span className='footer-share'>
            <a className="github-button" href="https://github.com/vadimmisko/videos4reddit" data-count-href="/vadimmisko/videos4reddit/stargazers" data-count-api="/repos/vadimmisko/videos4reddit#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star vadimmisko/videos4reddit on GitHub">Star</a>

            <a href="https://twitter.com/share" className="twitter-share-button" data-show-count="false">Tweet</a>
          </span>
          <span className='footer-name'>
            made by <a href="https://github.com/vadimmisko">Vadim Misko</a>
          </span>
        </footer>

      </div>
    );
  }
}
