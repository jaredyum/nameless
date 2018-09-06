// Services
import firebase from 'services/firebase';
import { getUserByEmail } from 'services/user';

// Action Types
import {
  AUTH_AUTHENTICATION_ERROR,
  AUTH_AUTHENTICATION_FAILED,
  AUTH_AUTHENTICATION_SUCCESS,
  AUTH_AUTHENTICATION_PENDING,

  AUTH_AUTHORIZATION_ERROR,
  AUTH_AUTHORIZATION_FAILED,
  AUTH_AUTHORIZATION_SUCCESS,
  AUTH_AUTHORIZATION_PENDING,

  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_PENDING,

  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_ERROR
} from 'actions/types';

// Constants
import { RIGHTS_MANAGER_KEY } from 'copy/Global/common';

/**
 * Attempts to log a user in via firebase.
 *
 * NOTE:
 * There will NEVER be a case where a user is logged in AND no user is retured.
 * It's either successful with a user, or an error with no user.
 *
 * See:
 *   https://firebase.google.com/docs/reference/js/firebase.auth.Auth  ↵
 *     #signInWithEmailAndPassword
 *
 * @param {string} email The email to use to login with.
 * @param {string} password The password to use to login with.
 * @return {!Promise} A promise resolving with the dispatched response.
 */
export const login = (email, password) => (dispatch) => {
  dispatch({ type: AUTH_LOGIN_PENDING });

  return firebase
    .then(auth => auth.signInWithEmailAndPassword(email, password))
    .then(({ user }) => {
      dispatch({
        type: AUTH_LOGIN_SUCCESS,
        payload: user
      });
    })
    .catch((error) => {
      dispatch({
        type: AUTH_LOGIN_ERROR,
        payload: error.message
      });
    });
};

/**
 * Logs the user out (first via Firebase), then dispatches so the reducer can
 * clear the user Object.
 */
export const logout = () => dispatch => firebase
  .then(auth => auth.signOut())
  .then(() => {
    dispatch({ type: AUTH_LOGOUT_SUCCESS });
  })
  .catch((error) => {
    dispatch({
      type: AUTH_LOGOUT_ERROR,
      payload: error
    });
  });

/**
 * Attempts to Authenticate a user (via Firebase).
 */
export const authenticate = currentUser => (dispatch) => {
  if (currentUser) {
    return dispatch({
      type: AUTH_AUTHENTICATION_SUCCESS,
      payload: currentUser
    });
  }

  // It is NOT an error if there is no user. It just means that they are
  // not logged in. Errors are handled in the `.catch()`.
  return dispatch({
    type: AUTH_AUTHENTICATION_FAILED
  });
};

/**
 * Attempts to Authorize a user (via Rights Manager).
 */
export const authorize = ({ email }) => dispatch => getUserByEmail(email)
  .then(({ services }) => {
    if (services && services.length) {
      // The user is authorized if they (1) have a right with the name of
      // this app, and (2), that right is NOT disabled.
      const hasRights = services
        .some(({ disabled, name }) => !disabled && name === RIGHTS_MANAGER_KEY);

      if (hasRights) {
        dispatch({ type: AUTH_AUTHORIZATION_SUCCESS });
      } else {
        // This is NOT an error - it just means the user is NOT authorized.
        dispatch({ type: AUTH_AUTHORIZATION_FAILED });
      }
    }
  })
  .catch((error) => {
    dispatch({
      type: AUTH_AUTHORIZATION_ERROR,
      payload: error
    });
  });

/**
 * Listens for auth state changes (via the underlying Firebase).
 *
 * This is NOT the authentication handler, but a state manager that will fire
 * our authentication (and authorization) logic.
 *
 * NOTE: We only ever register/fire this method ONCE - firebase will take over
 * subsequent auth changes after bootstrapping with this method.
 */
export const onAuthStateChange = () => (dispatch) => {
  // Notify app state that authentication/authorization is pending.
  // In each process, they will either pass, fail, or error out.
  // NOTE: Authorization should happen first.
  dispatch({ type: AUTH_AUTHORIZATION_PENDING });
  dispatch({ type: AUTH_AUTHENTICATION_PENDING });

  return firebase
    .then(auth => auth.onAuthStateChanged(() => {
      const { currentUser } = auth;
      // If a user was found, they should be authenticated and authorized.
      // If no user was found, it is not an error, but we want to clear any user
      // state.
      if (currentUser) {
        dispatch(authorize(currentUser));
        dispatch(authenticate(currentUser));
      } else {
        dispatch({ type: AUTH_AUTHENTICATION_FAILED });
        dispatch({ type: AUTH_AUTHORIZATION_FAILED });
      }
    }))
    .catch((error) => {
      dispatch({
        type: AUTH_AUTHENTICATION_ERROR,
        payload: error
      });
    });
};
