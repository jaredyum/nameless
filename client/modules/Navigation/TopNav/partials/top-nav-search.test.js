import {
  getComponentWrapper,
  testCommonComponentAttrs
} from 'utils/tests';

// Styles
import styles from '../styles';

// Components
import TopNavSearch, { DEFAULT_SEARCH_PLACEHOLDER } from './top-nav-search';

const defaultProps = {
  classes: styles
};

const mockEvent = {
  target: { value: 'foobar' },
  preventDefault: jest.fn()
};

let wrapper;
let wrapperInstance;
let searchHandler;

describe('<TopNavSearch /> Component', () => {
  testCommonComponentAttrs(TopNavSearch, defaultProps);

  beforeEach(() => {
    searchHandler = jest.fn();
    defaultProps.searchHandler = searchHandler;
    wrapper = getComponentWrapper(TopNavSearch, defaultProps);
    wrapperInstance = wrapper.instance();
  });

  describe('basic rendering', () => {
    it('should render with a form and input', () => {
      expect(wrapper.find('form')).toHaveLength(1);
      expect(wrapper.find('input')).toHaveLength(1);
    });

    it('should default the placeholder text', () => {
      const input = wrapper.find('input');
      const { placeholder } = input.props();
      expect(placeholder).toEqual(DEFAULT_SEARCH_PLACEHOLDER);
    });
  });

  describe('instance methods', () => {
    it('should set the search value to an empty string', () => {
      const { searchValue } = wrapper.state();
      expect(searchValue).toEqual('');
    });

    it('should update the search value', () => {
      // Trigger a search update.
      wrapperInstance.handleSearchChange(mockEvent);
      // Assert the value was updated.
      const { searchValue } = wrapper.state();
      expect(searchValue).toEqual(mockEvent.target.value);
    });

    it('fire the provided search handler', () => {
      // Trigger a search update, and then submit.
      wrapperInstance.handleSearchChange(mockEvent);
      wrapperInstance.handleSearchSubmit(mockEvent);
      // Assert the handler was called with the proper values.
      expect(searchHandler).toHaveBeenCalledWith(mockEvent.target.value);
    });
  });
});
