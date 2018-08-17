import {
  getComponentWrapper,
  testCommonComponentAttrs
} from 'utils/tests';

// Components
import TopNavMenu from './partials/top-nav-menu';
import TopNavSearchForm from './partials/top-nav-search';
import { TopNavJest } from './index';

// Styles
import styles from '../styles';

const defaultProps = {
  classes: styles,
  searchHandler: jest.fn()
};

let wrapper;

describe('<TopNav /> Component', () => {
  testCommonComponentAttrs(TopNavJest, defaultProps);

  beforeEach(() => {
    wrapper = getComponentWrapper(TopNavJest, defaultProps);
  });

  describe('basic rendering', () => {
    it('should render with the expected Components', () => {
      expect(wrapper.find(TopNavMenu)).toHaveLength(1);
      expect(wrapper.find(TopNavSearchForm)).toHaveLength(1);
    });

    it('should render without a search form if no search handler is provided',
      () => {
        // Setup the props to omit a search handler.
        const customProps = { ...defaultProps, searchHandler: undefined };
        wrapper = getComponentWrapper(TopNavJest, customProps);
        // Assert that the search box wasn't rendered.
        expect(wrapper.find(TopNavSearchForm)).toHaveLength(0);
      });
  });
});
