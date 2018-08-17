// MUI Components
import ListItem from '@material-ui/core/ListItem';

// Test utils
import { getComponentWrapper } from 'utils/tests';

// Components
import { SideMenuItemJest } from './side-menu-item';

// Local styles
import styles from '../../styles';

// Put any required props here.
const defaultProps = {
  classes: styles,
  label: 'foo',
  path: '/bar'
};

let wrapper;

describe('<SideMenuItem /> Component', () => {
  beforeEach(() => {
    wrapper = getComponentWrapper(SideMenuItemJest, defaultProps);
  });

  describe('basic rendering', () => {
    it('should render with the expected Components', () => {
      expect(wrapper.find(ListItem)).toHaveLength(1);
    });
  });
});
