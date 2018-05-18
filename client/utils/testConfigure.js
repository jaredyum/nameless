/* eslint-disable import/no-extraneous-dependencies, no-console */
// React 16.x requires an Enzyme adapter.
// See: http://airbnb.io/enzyme/docs/installation/index.html#installation
// And: http://facebook.github.io/jest/docs/en/configuration.html#setuptestframeworkscriptfile-string
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

if (!global.TEST_CFG) {
  global.TEST_CFG = true;

  configure({ adapter: new Adapter() });

  const mockNoop = () => new Promise(() => {});

  jest.mock('axios', () => ({
    default: mockNoop,
    get: mockNoop,
    post: mockNoop,
    put: mockNoop,
    delete: mockNoop,
    patch: mockNoop
  }));

  jest.mock('store', () => ({
    dispatch: jest.fn()
  }));

  process.on('unhandledRejection', (e) => {
    console.error(e);
  });
}
