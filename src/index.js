import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import promise from 'redux-promise';

import reducer from './reducers';
import routes from './routes';

import '../style/style.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

let store = createStore(reducer, compose(
  applyMiddleware(promise),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container')
);
