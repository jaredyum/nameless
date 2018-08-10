// Utils
import {
  getComponentWrapper,
  testCommonComponentAttrs
} from 'utils/tests';

// Components
import { MuiThemeProvider } from '@material-ui/core/styles';
import RouteManager from 'containers/RouteManager';
import { App } from './index';

describe('<App /> Component', () => {
  testCommonComponentAttrs(App);

  describe('basic rendering', () => {
    it('should render the theme and routes', () => {
      const component = getComponentWrapper(App, {});
      expect(component.find(MuiThemeProvider)).toHaveLength(1);
      expect(component.find(RouteManager)).toHaveLength(1);
    });
  });
});
