import React from 'react';

import Notification from 'components/Common/notification';

export const findNotification = (id, notifications) =>
  (id && notifications.length > 0 ? notifications.find(n => n.id === id) : null);

export const showNotification = notification => (
  (notification && notification.id) ?
    <Notification
      className={`notification ${notification.type === 'error' ? 'error' : 'success'}`}
      open={!!notification.id}
      message={notification.message}
    />
    : null
);
