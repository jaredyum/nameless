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
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_ERROR,

  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_ERROR
} from 'actions/types';

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
 * @return {!Object} The parsed user object.
 */
const parseUserProps = (payload) => {
  const userProps = {};

  if (payload) {
    FIREBASE_USER_PROPS.forEach((prop) => {
      const normalizedName = `user${prop[0].toUpperCase()}${prop.slice(1)}`;
      userProps[normalizedName] = payload[prop];
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

export default (state = initialState, action) => {
  const newState = { ...state, hasRights: RIGHTS_STATE.PENDING };

  switch (action.type) {
    case AUTH_AUTHENTICATION_SUCCESS:
    case AUTH_LOGIN_SUCCESS:
      return {
        ...newState,
        authed: AUTH_STATE.AUTHENTICATED,
        ...parseUserProps(action.payload)
      };
    case AUTH_AUTHENTICATION_PENDING:
    case AUTH_LOGIN_PENDING:
      return {
        ...newState,
        authed: AUTH_STATE.PENDING,
        ...clearUserProps()
      };
    case AUTH_AUTHENTICATION_ERROR:
    case AUTH_LOGIN_ERROR:
    case AUTH_LOGOUT_ERROR:
      return {
        ...newState,
        authed: AUTH_STATE.UNAUTHENTICATED,
        error: action.payload,
        ...clearUserProps()
      };
    case AUTH_AUTHENTICATION_FAILED:
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...newState,
        authed: AUTH_STATE.UNAUTHENTICATED,
        hasRights: RIGHTS_STATE.UNAUTHORIZED,
        error: action.payload,
        ...clearUserProps()
      };
    /* Authorization Reducers */
    case AUTH_AUTHORIZATION_ERROR:
      return {
        ...newState,
        error: action.payload
      };
    case AUTH_AUTHORIZATION_FAILED:
      return {
        ...newState,
        hasRights: RIGHTS_STATE.UNAUTHORIZED
      };
    case AUTH_AUTHORIZATION_PENDING:
      return {
        ...newState,
        hasRights: RIGHTS_STATE.PENDING
      };
    case AUTH_AUTHORIZATION_SUCCESS:
      return {
        ...newState,
        hasRights: RIGHTS_STATE.AUTHORIZED
      };
    default:
      return state;
  }
};
