import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import {
  compose, createStore, combineReducers, applyMiddleware
} from 'redux';

import history from 'history';

// App reducers.
import reducers from './reducers';

/* eslint-disable no-underscore-dangle */
const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
/* eslint-enable */

const combinedReducers = combineReducers({
  ...reducers,
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
