import {
  getComponentWrapper,
  testCommonComponentAttrs
} from 'utils/tests';

// Components
import SideMenu from 'modules/Navigation/SideMenu';
import TopNav from 'modules/Navigation/TopNav';

import { NavigationJest } from './index';

let wrapper;
let wrapperInstance;

describe('<Navigation /> Component', () => {
  testCommonComponentAttrs(NavigationJest);

  beforeEach(() => {
    wrapper = getComponentWrapper(NavigationJest);
    wrapperInstance = wrapper.instance();
  });

  describe('basic rendering', () => {
    it('should render with the TopNav and SideMenu', () => {
      expect(wrapper.find(SideMenu)).toHaveLength(1);
      expect(wrapper.find(TopNav)).toHaveLength(1);
    });
  });

  describe('drawer handling', () => {
    it('should toggle the sidebar', () => {
      let sidebarOpen = wrapper.state().sidebarOpen;
      // Assert that the sidebar is initially closed.
      expect(sidebarOpen).toBe(false);
      // Trigger the sidebar.
      wrapperInstance.toggleDrawer();
      // Assert that the sidebar is open.
      sidebarOpen = wrapper.state().sidebarOpen;
      expect(sidebarOpen).toBe(true);
    });
  });
});
