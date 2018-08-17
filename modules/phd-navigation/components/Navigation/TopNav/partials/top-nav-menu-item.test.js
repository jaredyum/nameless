// MUI Components
import MenuItem from '@material-ui/core/MenuItem';

// React Router
import { NavLink } from 'react-router-dom';

// Test utils
import {
  getComponentWrapper,
  testCommonComponentAttrs
} from 'utils/tests';

// Local styles
import styles from '../../styles';

// Components
import { NavMenuItemJest } from './top-nav-menu-item';

const defaultProps = {
  classes: styles,
  path: '/foo'
};

let clickHandler;
let closeHandler;
let currentProps;
let wrapper;

describe('<MyComponent /> Component', () => {
  testCommonComponentAttrs(NavMenuItemJest, defaultProps);

  beforeEach(() => {
    clickHandler = jest.fn();
    closeHandler = jest.fn();

    currentProps = {
      ...defaultProps,
      closeHandler
    };

    wrapper = getComponentWrapper(NavMenuItemJest, currentProps);
  });

  describe('basic rendering', () => {
    it('should render with a MenuItem', () => {
      expect(wrapper.find(MenuItem)).toHaveLength(1);
    });

    it('should render a link if there is no clickHandler', () => {
      expect(wrapper.find(NavLink)).toHaveLength(1);
    });

    it('should NOT render a link if there is a clickHandler', () => {
      // Create a scenario that provides a click handler.
      currentProps.clickHandler = clickHandler;
      wrapper = getComponentWrapper(NavMenuItemJest, currentProps);
      // Parse the custom click action.
      const menuItem = wrapper.find(MenuItem);
      const { onClick } = menuItem.props();
      // Execute the wrapper function.
      onClick();
      // Assert that the proper handlers were called.
      expect(clickHandler).toHaveBeenCalled();
      expect(closeHandler).toHaveBeenCalled();
      // Assert that a NavLink was NOT rendered.
      expect(wrapper.find(NavLink)).toHaveLength(0);
    });
  });
});
