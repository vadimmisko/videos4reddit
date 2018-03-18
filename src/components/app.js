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
      <div className="app">

        <header className="navbar">
          {this.props.location.pathname!=='/' ? <Link to='/' className='btn-back'>Back</Link> : <div></div>}

          <Link to='/' className='logo'><img src='/style/imgs/logo.png' /></Link>

        </header>

        {this.props.children}

        <footer className="footer">
          <span className='footer-share'>
            <a className="github-button" href="https://github.com/vadimmisko/videos4reddit" data-count-href="/vadimmisko/videos4reddit/stargazers" data-show-count="true" data-count-aria-label="# stargazers on GitHub" aria-label="Star vadimmisko/videos4reddit on GitHub">Star</a>

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

          // {
          //   sessionStorage.getItem('user')
          //   ?
          //   <div className="navbar-auth">
          //     <span onClick={this.exit}>{sessionStorage.getItem('user')}</span>
          //   </div>
          //   :
          //   <Link to='/signin' title='Sign in with reddit username'>
          //     <div className="navbar-auth">
          //       <span className='signin-text'>Sign in</span>
          //       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14z"/></svg>
          //     </div>
          //   </Link>
          // }
