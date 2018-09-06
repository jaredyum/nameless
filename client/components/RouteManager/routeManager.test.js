// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

import { RouteManagerJest } from './routeManager';

const defaultProps = {
  classes: {},
  onAuthStateChange: jest.fn(),
  authed: true,
  redirect: ''
};

describe('<RouteManager /> component', () => {
  testCommonComponentAttrs(RouteManagerJest, defaultProps);
});
