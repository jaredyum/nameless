// Services
import firebase from 'services/firebase';
import { getUserByEmail } from 'services/user';

// Action Types
import {
  AUTH_ERROR,
  AUTH_FAILED,
  AUTH_SUCCESS,
  AUTH_PENDING,

  AUTH_LOGOUT_SUCCESS
} from 'actions/types';

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
export const login = (email, password) => dispatch => firebase
  .then(auth => auth.signInWithEmailAndPassword(email, password))
  .catch((error) => {
    dispatch({
      type: AUTH_ERROR,
      payload: error.message
    });
  });

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
      type: AUTH_ERROR,
      payload: error
    });
  });

/**
 * Handles state changes passed from firebase.onAuthStateChange().
 *
 * NOTE: This is an mutation observer, and therefore does not (and can not)
 * return anything.
 *
 * SEE: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver.
 *
 * @param {!Object} auth The firebase user/auth object.
 * @param {Object} auth.currentUser The current firebase user (if any).
 * @param {!Function} dispatch The redux dispatch handler.
 */
export const handleStateChange = (
  currentUser = {},
  dispatch
) => getUserByEmail(currentUser.email)
  .then((rights) => {
    dispatch({
      type: AUTH_SUCCESS,
      payload: {
        currentUser,
        rights
      }
    });
  })
  .catch((error) => {
    dispatch({
      type: AUTH_ERROR,
      payload: error
    });
  });

/**
 * Listens for auth state changes (via the underlying Firebase).
 *
 * This is NOT the authentication handler, but a state manager (observable) that
 * will fire our authentication (and authorization) logic.
 *
 * NOTE: Because onAuthStateChange takes an observable as its argument, it will
 * never have `then` or `catch`.

 * SEE:
 *     https://firebase.google.com/docs/reference/js/  ↵
 *        firebase.auth.Auth#onAuthStateChanged
 *
 * NOTE: We only ever register/fire this method ONCE - firebase will take over
 * subsequent auth changes after bootstrapping with this method.
 */
export const onAuthStateChange = () => dispatch => firebase
  .then(auth => auth.onAuthStateChanged(() => {
    const { currentUser } = auth;

    // Notify app state that authentication/authorization is pending.
    dispatch({ type: AUTH_PENDING });

    if (currentUser && currentUser.email) {
      handleStateChange(currentUser, dispatch);
    } else {
      // If no user was found, it is not an error, but we want to clear
      // any existing user state.
      dispatch({ type: AUTH_FAILED });
    }
  }));
