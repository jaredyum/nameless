// MUI Components
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

// Utils
import {
  getComponentWrapper,
  testCommonComponentAttrs
} from 'utils/tests';

// Components
import SideMenuGroups from './partials/side-menu-groups';
import { SideMenuJest } from './index';

// Local styles
import styles from '../styles';

const defaultProps = {
  classes: styles
};

let wrapper;
let drawers;

describe('<SideMenu /> Component', () => {
  testCommonComponentAttrs(SideMenuJest, defaultProps);

  beforeEach(() => {
    wrapper = getComponentWrapper(SideMenuJest, defaultProps);
    drawers = wrapper.find(Drawer);
  });

  describe('basic rendering', () => {
    it('should render 2 drawers, one for desktop, one for mobile', () => {
      expect(drawers).toHaveLength(2);
    });

    it('should have a Toolbar and SideMenuGroups', () => {
      const drawer = drawers.first();
      expect(drawer.find(Toolbar)).toHaveLength(1);
      expect(drawer.find(SideMenuGroups)).toHaveLength(1);
    });
  });
});
