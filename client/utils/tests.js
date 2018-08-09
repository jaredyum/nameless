import React from 'react';

/* eslint-disable import/no-extraneous-dependencies */
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

/* eslint-disable no-console */
export const mockNotificationDud = { type: 'MOCK_NOTIF_DUD' };

export const testingFunc = test => `should contain callable ${test} function`;

export const handleTestError = (test, err, done) => {
  console.warn('Error with', test);
  console.error(new Error(err));
  done();
};

/**
 * Automatically tests that the component matches the Jest snapshot.
 * NOTE: If you are receiving a warning like the following in your tests:
 *
 *   Warning: React.createElement: type is invalid -- expected a string...
 *
 * Then you most likely need to pass the appropriate props.
 *
 * @param {!React.Component} Component The React component to wrap and test.
 * @param {!Object} props The (optional) props to use for the basic Jest test.
 */
export const testCommonComponentAttrs = (Component, props) => {
  describe('when rendering', () => {
    const wrapper = shallow(<Component {...props} />);

    it('should render a component matching the snapshot', () => {
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      expect(wrapper).toHaveLength(1);
    });
  });
};

export const testDispatchToProps = (Component, mapDispatchToProps) => {
  let mockDispatch;
  let mockActions;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockActions = mapDispatchToProps(mockDispatch);
  });

  describe('when mapping dispatch to props', () => {
    const actions = Object.keys(mapDispatchToProps());
    actions.forEach((action) => {
      it(`should map the ${action} action`, () => {
        expect(mockActions[action]).toBeDefined();
        expect(typeof mockActions[action]).toEqual('function');
        mockActions[action]();
        expect(mockDispatch).toHaveBeenCalled();
      });
    });
  });
};

export const getComponentWrapper = (Component, props) => shallow(<Component {...props} />);


export const testReducerDefaults = (reducer, initialState) => {
  describe('Reducer Defaults', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  });
};
