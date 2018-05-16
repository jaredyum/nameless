import React from 'react';
import { Provider } from 'react-redux';

// MUI Components
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import red from 'material-ui/colors/red';

// Redux store
import store from 'store';

// Components
import RouteManager from 'containers/routeManager';

/**
 * The theme provider for the app.
 * Please consider making your global style changes here, as opposed to through
 * stylesheets.
 * @const {!Object}
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      light: red[300],
      main: red[500],
      dark: red[700]
    },
    secondary: {
      light: red.A200,
      main: red.A400,
      dark: red.A700
    }
  }
});

export default () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <RouteManager />
    </Provider>
  </MuiThemeProvider>
);
