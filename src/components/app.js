import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>

        <header className="navbar">
          <div></div>
          <div className="logo"></div>
          <div className="navbar-auth"><a href='/signin'>Sign in</a></div>
        </header>

        {this.props.children}
        
      </div>
    );
  }
}
