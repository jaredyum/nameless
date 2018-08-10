// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

import { RouteManagerJest } from './index';

const defaultProps = {
  classes: {},
  onAuthStateChange: jest.fn()
};

describe('<RouteManager /> component', () => {
  testCommonComponentAttrs(RouteManagerJest, defaultProps);
});
