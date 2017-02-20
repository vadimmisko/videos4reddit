import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import { Router, browserHistory } from 'react-router';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-92289588-1');

import reducer from './reducers';
import routes from './routes';

import '../style/style.css';

function fireTracking() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

let store = createStore(reducer, compose(
  applyMiddleware(promise),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={fireTracking} history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container')
);
