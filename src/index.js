import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise';
import { persistStore, autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';

const logger = createLogger();
const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {},
  composeEnhancers(autoRehydrate(), applyMiddleware(promise, logger)));


persistStore(store);
// persistStore(store).purge() //this is to purge all the saved states in the local storage

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
    , document.querySelector('.allen_container'));
