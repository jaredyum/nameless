import React from 'react';
import { Provider } from 'react-redux';

import store from 'store';

// Components
import RouteManager from 'containers/routeManager';

export default () => (
  <Provider store={store}>
    <RouteManager />
  </Provider>
);
