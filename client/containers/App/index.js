import React from 'react';
import { Provider } from 'react-redux';

// MUI
import { MuiThemeProvider } from '@material-ui/core/styles';

// App theme.
import theme from 'theme';

// Components
import { RouteManager } from 'phd-auth';

// Routes config
import ROUTES_CONFIG from 'routes';

// Redux
import store from 'store';

// Styles
import './index.css';

// We export the App without a Provider for tests.
// This pattern allows us to test the component without having to test
// Redux itself.
export const App = () => (
  <MuiThemeProvider theme={theme}>
    <RouteManager routes={ROUTES_CONFIG} />
  </MuiThemeProvider>
);

// The Redux-connected app.
const ConnectedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ConnectedApp;
