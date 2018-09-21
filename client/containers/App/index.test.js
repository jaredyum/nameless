// Utils
import {
  getComponentWrapper,
  testCommonComponentAttrs
} from 'utils/tests';

// MUI Components
import { MuiThemeProvider } from '@material-ui/core/styles';

// Components
import { components } from 'phd-auth';
import { App } from './index';

const { RouteManager } = components;

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
