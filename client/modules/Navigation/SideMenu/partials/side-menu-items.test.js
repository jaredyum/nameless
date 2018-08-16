import { getComponentWrapper } from 'utils/tests';

// MUI Components
import ListItem from '@material-ui/core/ListItem';

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

let wrapper;

describe('<SideMenuItems /> Component', () => {
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = getComponentWrapper(SideMenuItemsJest, defaultProps);
    });

    it('should render each item passed in', () => {
      wrapper.forEach((item) => {
        expect(item.find(ListItem)).toHaveLength(1);
      });
    });
  });
});
