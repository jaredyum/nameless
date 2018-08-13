import {
  getComponentWrapper,
  testCommonComponentAttrs
} from 'utils/tests';

// MUI Components
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';

// Styles
import styles from '../styles';

// Components
import TopNavMenu from './top-nav-menu';
import NavMenuItem from './top-nav-menu-item';

const defaultProps = {
  classes: styles,
  menuItems: [
    { label: 'wibble' },
    { label: 'wobble' }
  ]
};

const mockTarget = 'div#foo';

const event = {
  currentTarget: mockTarget
};

let wrapper;
let wrapperInstance;

describe('<TopNavMenu /> Component', () => {
  testCommonComponentAttrs(TopNavMenu, defaultProps);

  beforeEach(() => {
    wrapper = getComponentWrapper(TopNavMenu, defaultProps);
    wrapperInstance = wrapper.instance();
  });

  describe('basic rendering', () => {
    it('should render with an IconButton and Menu', () => {
      expect(wrapper.find(IconButton)).toHaveLength(1);
      expect(wrapper.find(Menu)).toHaveLength(1);
    });

    it('should render the menu items', () => {
      const menuItemCount = defaultProps.menuItems.length;
      expect(wrapper.find(NavMenuItem)).toHaveLength(menuItemCount);
    });
  });

  describe('instance methods', () => {
    it('should default with a null anchor el', () => {
      // Get the current "anchorEl" from the current state.
      const anchorEl = wrapper.state().anchorEl;
      // Assert that the current "anchorEl" is initially "null".
      expect(anchorEl).toBe(null);
    });

    it('should set the anchorEl when triggered open', () => {
      // Trigger the menu open.
      wrapperInstance.toggleOpen(event);
      // Get the current "anchorEl" from the current state.
      const anchorEl = wrapper.state().anchorEl;
      // Assert that the current "anchorEl" is set the to proper target.
      expect(anchorEl).toBe(mockTarget);
    });

    it('should clear the anchorEl when triggered closed', () => {
      // Trigger the menu closed.
      wrapperInstance.toggleClose();
      // Get the current "anchorEl" from the current state.
      const anchorEl = wrapper.state().anchorEl;
      // Assert that the current "anchorEl" is set the to proper target.
      expect(anchorEl).toBe(null);
    });
  });
});
