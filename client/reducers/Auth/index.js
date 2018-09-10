import {
  AUTH_ERROR,
  AUTH_FAILED,
  AUTH_SUCCESS,
  AUTH_PENDING,

  AUTH_LOGOUT_SUCCESS
} from 'actions/types';

// Constants
import { RIGHTS_MANAGER_KEY } from 'copy/Global/common';

/**
 * Firebase user properties that our app will consume (some have been omitted).
 * See: https://firebase.google.com/docs/reference/js/firebase.User
 * @const {!Array.<string>}
 */
const FIREBASE_USER_PROPS = [
  'displayName',
  'email',
  'emailVerified',
  'metadata',
  'refreshToken'
];

/**
 * Authentication states.
 *
 * NOTE:
 * This is extremely important. For example, an auth state of "null" will
 * indicate that we should show a loading indicator, and an auth state of
 * "false" or "true" will render content (and redirect when needed) that is
 * appropriate for that state.
 *
 * @const {!Object.<string, string>}
 */
export const AUTH_STATE = {
  AUTHENTICATED: true,
  UNAUTHENTICATED: false,
  PENDING: null
};

/**
 * Rights states.
 *
 * NOTE:
 * This is extremely important, and works in the same way as the auth state
 * (but has different side effects).
 *
 * @const {!Object.<string, string>}
 */
export const RIGHTS_STATE = {
  AUTHORIZED: true,
  UNAUTHORIZED: false,
  PENDING: null
};

/**
 * Initial State for this reducer.
 * @const {!Object.<string, *>}
 */
export const initialState = {
  authed: AUTH_STATE.PENDING,
  hasRights: RIGHTS_STATE.PENDING,
  userId: null,
  userEmail: null,
  userEmailVerified: null,
  error: null
};

/**
 * Parses the user properties we need for the application from the Firebase
 * payload.
 *
 * NOTE: Firebase has lots of system-generated properties and methods our
 * app can safely ignore (and keep out of our Redux store).
 *
 * @param {!Object} payload The original Firebase payload.
 * @param {!Object} payload.currentUser The current Firebase user.
 * @return {!Object} The parsed user object.
 */
export const parseUserProps = ({ currentUser }) => {
  const userProps = {};

  if (currentUser) {
    FIREBASE_USER_PROPS.forEach((prop) => {
      const normalizedName = `user${prop[0].toUpperCase()}${prop.slice(1)}`;
      userProps[normalizedName] = currentUser[prop];
    });
  }

  return userProps;
};

/**
 * Clears the user props.
 * @return {!Object} The cleared user object.
 */
const clearUserProps = () => {
  const userProps = {};

  FIREBASE_USER_PROPS.forEach((prop) => {
    const normalizedName = `user${prop[0].toUpperCase()}${prop.slice(1)}`;
    userProps[normalizedName] = null;
  });

  return userProps;
};

/**
 * Attempts to Authorize a user (via Rights Manager).
 *
 * Checks to see if the user has rights for a service that is (1) not disabled,
 * and (2) has a name matching the RIGHTS_MANAGER_KEY.
 *
 * @param {!Object} rights The rights object to check.
 * @param {!Array.<!Object>} rights.services The services to check for
 *   authorization.
 * @return {boolean} Flag indicating whether or not the user is authorized.
 */
export const authorizeUser = ({ rights = {} }) => {
  const { services = [] } = rights;

  return services
    .some(({ disabled, name }) => !disabled && name === RIGHTS_MANAGER_KEY);
};

export default (state = initialState, action) => {
  const newState = {
    ...state,
    error: null,
    hasRights: RIGHTS_STATE.PENDING
  };

  const { type, payload } = action;

  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...newState,
        authed: AUTH_STATE.AUTHENTICATED,
        hasRights: authorizeUser(payload),
        ...parseUserProps(payload)
      };
    case AUTH_PENDING:
      return {
        ...newState,
        authed: AUTH_STATE.PENDING,
        hasRights: RIGHTS_STATE.PENDING,
        ...clearUserProps()
      };
    case AUTH_ERROR:
      return {
        ...newState,
        authed: AUTH_STATE.UNAUTHENTICATED,
        hasRights: RIGHTS_STATE.UNAUTHORIZED,
        error: payload,
        ...clearUserProps()
      };
    case AUTH_FAILED:
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...newState,
        authed: AUTH_STATE.UNAUTHENTICATED,
        hasRights: RIGHTS_STATE.UNAUTHORIZED,
        ...clearUserProps()
      };
    default:
      return state;
  }
};
