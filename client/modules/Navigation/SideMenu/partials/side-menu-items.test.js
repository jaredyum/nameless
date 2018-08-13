import { testCommonComponentAttrs } from 'utils/tests';

// Local styles
import styles from '../../styles';

// Components
import { SideMenuItemsJest } from './side-menu-items';

const toggleHandler = jest.fn();

const defaultProps = {
  classes: styles,
  collection: [{
    label: 'foo',
    path: '/foo'
  }, {
    label: 'bar',
    clickHandler: jest.fn()
  }],
  toggleHandler
};

describe('<MyComponent /> Component', () => {
  testCommonComponentAttrs(SideMenuItemsJest, defaultProps);
});
