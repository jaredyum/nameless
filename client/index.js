import React from 'react';
import ReactDOM from 'react-dom';

import store from 'store';

// Copy
import { APP_NAME } from 'copy/Global/common';

// Components
import ConnectedApp from 'containers/App';

document.title = APP_NAME;

ReactDOM.render(
  <ConnectedApp store={store} />,
  document.getElementById('app')
);
