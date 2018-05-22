/* eslint-disable no-console */
import { push } from 'react-router-redux';

// Services
import firebase from 'services/firebase';
import { getUserByName } from 'services/user';

// Action Types
import {
  AUTH_LOGIN_PENDING,
  AUTH_LOGGED_IN,
  AUTH_LOGGED_OUT
} from 'actions/types';

// Actions
import { toggleNotification } from 'actions/Notifications';

// Copy
import {
  AUTH_USER_NOT_FOUND,
  AUTH_WRONG_PASSWORD_ERR
} from 'copy/Components/auth';

import {
  ROUTEPATH_VERIFICATION,
  ROUTEPATH_DEFAULT_PAGE
} from 'copy/Global/routes';

import {
  AUTH_AUTHENTICATE_ERROR,
  AUTH_STATE_CHANGE_ERROR,
  AUTH_LOGOUT_ERROR,
  AUTH_LOGIN_ERROR
} from 'copy/Global/errors';

/**
 * Authorizes a user via Rights Manager.
 * Dispatches and reduces the user for use throughout the app.
 * @param {string} email The email address of the current user.
 */
export const authorize = email => dispatch => getUserByName(email)
  .then((res) => {
    const user = res.data.users.shift();
    dispatch({
      type: AUTH_LOGGED_IN,
      payload: user
    });
  });

/**
 * Logs a user out (which should clear redux of any user-associated data).
 */
export const dispatchLogout = () => dispatch =>
  dispatch({
    type: AUTH_LOGGED_OUT
  });

/**
 * Attempts to authenticate a user.
 */
export const authenticate = () => dispatch =>
  firebase
    .then((auth) => {
      const { currentUser } = auth;
      if (currentUser) return currentUser;
      dispatch(dispatchLogout());
      throw currentUser;
    })
    .then(user => user.reload())
    .then(() => firebase)
    .then((auth) => {
      const { currentUser: user } = auth;

      if (!user) return;

      // User has signed up, redirect them to verification.
      if (!user.emailVerified) {
        dispatch(push(ROUTEPATH_VERIFICATION));
        return;
      }

      // Now that Firebase has successfully authenticated, we make a request to
      // Rights Manager for authorization.
      dispatch(authorize(user.email));
    })
    // It's OK if we don't have current user (null).
    .catch(e => (e ? console.error(AUTH_AUTHENTICATE_ERROR, e) : true));

/**
 * Listens for auth state changes (via the underlying Firebase).
 * This is NOT the authentication handler, but a state manager that will fire
 * our authentication logic.
 * NOTE: We only ever register/fire this method ONCE - firebase will take over
 * subsequent auth changes after bootstrapping with this method.
 * @param {[type]} curPath [description]
 */
export const onAuthStateChange = curPath => dispatch => firebase
  .then(auth => auth.onAuthStateChanged(() => {
    dispatch(authenticate(curPath));
  }))
  .catch((e) => {
    console.error(AUTH_STATE_CHANGE_ERROR, e);
    dispatch(toggleNotification(e.message, 'error'));
    throw e;
  });

/**
 * Logs the user out (first via Firebase), then dispatches so the reducer can
 * clear the user Object.
 */
export const logout = () => dispatch =>
  firebase
    .then(auth => auth.signOut())
    .catch((e) => {
      console.error(AUTH_LOGOUT_ERROR, e);
      dispatch(toggleNotification(e.message, 'error'));
      throw e;
    })
    .then(() => {
      dispatch(dispatchLogout());
    });

/**
 * Attempts to log a user in, and optionally redirects them if the user was
 * trying to access an authorized route.
 * @param {string} email The email to use to login with.
 * @param {string} password The password to use to login with.
 * @param {string} redirectUrl An optional redirect URL to navigate to on success.
 * @return {!Promise} A promise resolving when the user has successfully logged in.
 */
export const login = (email, password, redirectUrl = ROUTEPATH_DEFAULT_PAGE) =>
  (dispatch) => {
    dispatch({
      type: AUTH_LOGIN_PENDING
    });

    return firebase
      .then(auth => auth.signInWithEmailAndPassword(email, password))
      .then(() => dispatch(authorize(email)))
      .then(() => dispatch(push(redirectUrl)))
      .catch((e) => {
        console.error(AUTH_LOGIN_ERROR, e);
        switch (e.code) {
          case AUTH_USER_NOT_FOUND:
            dispatch(toggleNotification(e.message, 'error'));
            break;
          case AUTH_WRONG_PASSWORD_ERR:
            dispatch(toggleNotification(e.message, 'error'));
            break;
          default:
            dispatch(toggleNotification(e.message, 'error'));
            throw e;
        }
      });
  };
