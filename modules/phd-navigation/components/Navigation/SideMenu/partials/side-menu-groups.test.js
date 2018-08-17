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
import SideMenuItem from './side-menu-item';
import SideMenuGroups from './side-menu-groups';

const defaultProps = {
  classes: styles,
  sideMenuConfig: [{
    navTitle: 'foo',
    navItems: [
      { label: 1 },
      { label: 2 },
      { label: 3 }
    ]
  }, {
    navTitle: 'bar',
    navItems: [
      { label: 4 },
      { label: 5 },
      { label: 6 },
      { label: 7 }
    ]
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
      menuLists.forEach((menuList, i) => {
        expect(menuList.find(ListSubheader)).toHaveLength(1);
        expect(menuList.find(SideMenuItem))
          .toHaveLength(defaultProps.sideMenuConfig[i].navItems.length);
      });
    });
  });
});
