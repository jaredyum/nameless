import { guidGenerator } from 'utils/formatter';

import {
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE
} from 'actions/types';

export const initialState = {
  currentNotification: null,
  notifications: []
};

const createNotification = (id, action) => ({
  id,
  type: action.payload.type,
  message: action.payload.message
});

const addNotification = (state, action) => {
  const id = guidGenerator();
  const newNotification = createNotification(id, action);
  state.notifications.push(newNotification);

  return {
    ...state,
    currentNotification: id,
    notifications: state.notifications
  };
};

const removeNotification = (state) => {
  const removeId = initialState.currentNotification;
  return ({
    ...state,
    currentNotification: null,
    notifications: state.notifications.filter(n => n.id === removeId)
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_ADD:
      return addNotification(state, action);
    case NOTIFICATION_REMOVE:
      return removeNotification(state);
    default:
      return state;
  }
};

export default reducer;
