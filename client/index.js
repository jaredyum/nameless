import React from 'react';
import ReactDOM from 'react-dom';

// Copy
import { APP_NAME } from 'copy/Global/common';

// Components
import ConnectedApp from 'containers/App';

document.title = APP_NAME;

ReactDOM.render(
  <ConnectedApp />,
  document.getElementById('app')
);
