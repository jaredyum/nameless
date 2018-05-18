import authReducer, { initialState as authIntialState } from 'reducers/Auth';
import notificationsReducer, { initialState as notificationsIntialState } from 'reducers/Notifications';

export const initialStates = {
  authReducer: authIntialState,
  notificationsReducer: notificationsIntialState
};

const reducers = {
  authReducer,
  notificationsReducer
};

export default reducers;
