import React from 'react';

// Test utils
import {
  testCommonComponentAttrs,
  getComponentWrapper
} from 'utils/tests';

// Components
import Notification from 'components/Common/notification';
import { MainJest } from './index';

const mockNotificationID = 'foo';
const mockNotification = {
  id: mockNotificationID,
  key: mockNotificationID
};

const defaultProps = {
  classes: {},
  children: [
    <p key="One">One</p>,
    <p key="Two">Two</p>
  ],
  currentNotification: mockNotificationID,
  notifications: [mockNotification]
};

let wrapper;

describe('<Main /> component', () => {
  testCommonComponentAttrs(MainJest, defaultProps);

  beforeEach(() => {
    wrapper = getComponentWrapper(MainJest, defaultProps);
  });

  describe('rendering', () => {
    it('should render children', () => {
      expect(wrapper.find('p')).toHaveLength(2);
    });

    it('should display any notifications', () => {
      expect(wrapper.find(Notification)).toHaveLength(1);
    });
  });
});
