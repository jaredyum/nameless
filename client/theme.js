// MUI
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

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

export default theme;
