// Services
import firebase from 'services/firebase';

// Action Types
import { AUTH_PENDING, AUTH_SUCCESS } from 'actions/types';

import { AUTH_LOGIN_ERROR } from 'copy/Global/errors';

export const login = token => (dispatch) => {
  dispatch({ type: AUTH_PENDING });

  return firebase
    .then(auth => auth.signInWithCustomToken(token))
    .then(({ user }) => {
      dispatch({
        type: AUTH_SUCCESS,
        payload: { user }
      });

      return user;
    })
    .catch((error) => {
      dispatch({
        type: AUTH_LOGIN_ERROR,
        payload: error.message
      });
    });
};
