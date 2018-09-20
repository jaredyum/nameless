import React from 'react';
import { Provider } from 'react-redux';

// Components
import { components as authComponents } from 'phd-auth';

// MUI
import { MuiThemeProvider } from '@material-ui/core/styles';

// App theme.
import theme from 'theme';

// Routes config
import ROUTES_CONFIG from 'routes';

// Redux
import Loader from '../../components/Loading';

// Styles
import './index.css';

const { RouteManager } = authComponents;

// We export the App without a Provider for tests.
// This pattern allows us to test the component without having to test
// Redux itself.
export const App = () => (
  <MuiThemeProvider theme={theme}>
    <RouteManager routes={ROUTES_CONFIG} LoaderComponent={Loader} />
  </MuiThemeProvider>
);

// The Redux-connected app.
const ConnectedApp = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ConnectedApp;
