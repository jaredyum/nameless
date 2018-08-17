import {
  getComponentWrapper,
  testCommonComponentAttrs
} from 'utils/tests';

// MUI Components
import MenuList from '@material-ui/core/MenuList';
import ListSubheader from '@material-ui/core/ListSubheader';

// Styles (the exact same styles your component uses)
import styles from '../../styles';

// Components
import SideMenuItems from './side-menu-items';
import SideMenuGroups from './side-menu-groups';

const defaultProps = {
  classes: styles,
  sideMenuConfig: [{
    navTitle: 'foo',
    navItems: [1, 2, 3]
  }, {
    navTitle: 'bar',
    navItems: [4, 5, 6]
  }]
};

let wrapper;

describe('<SideMenuGroups /> Component', () => {
  testCommonComponentAttrs(SideMenuGroups, defaultProps);

  beforeEach(() => {
    wrapper = getComponentWrapper(SideMenuGroups, defaultProps);
  });

  describe('basic rendering', () => {
    it('should render with as many MenuLists as are provided', () => {
      const menuLists = wrapper.find(MenuList);
      expect(menuLists).toHaveLength(2);
      // Assert that each list contains the correct child components.
      menuLists.forEach((menuList) => {
        expect(menuList.find(ListSubheader)).toHaveLength(1);
        expect(menuList.find(SideMenuItems)).toHaveLength(1);
      });
    });
  });
});
