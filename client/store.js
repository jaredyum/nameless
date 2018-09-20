import {
  compose,
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import history from 'history';

// Reducers.
import { reducers as AuthReducers } from 'phd-auth';
import AppReducers from './reducers';


/* eslint-disable no-underscore-dangle */
const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
/* eslint-enable */

const combinedReducers = combineReducers({
  ...AppReducers,
  ...AuthReducers,
  routing: routerReducer
});

const rootReducer = (state, action) => combinedReducers(state, action);

const store = createStore(
  rootReducer,
  reduxDevToolsExtension && reduxDevToolsExtension(),
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    )
  )
);

export default store;
