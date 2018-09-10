// Action types
import {
  AUTH_ERROR,
  AUTH_FAILED,
  AUTH_SUCCESS,
  AUTH_PENDING,

  AUTH_LOGOUT_SUCCESS
} from 'actions/types';

// Constants
import { RIGHTS_MANAGER_KEY } from 'copy/Global/common';

// Components
import reducer, {
  AUTH_STATE,
  RIGHTS_STATE,
  initialState,
  parseUserProps,
  authorizeUser
} from './index';

const mockUser = { email: 'foo@bar.com' };
const mockError = 'This is a mock error message.';
const mockRights = {
  services: [{ disabled: false, name: RIGHTS_MANAGER_KEY }]
};

let payload;

describe('Auth Reducer', () => {
  describe('reducer states', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle authentication success', () => {
      payload = {
        rights: [],
        currentUser: mockUser
      };

      // Setup the action for the reducer.
      const action = { type: AUTH_SUCCESS, payload };
      const { authed, userEmail } = reducer(initialState, action);

      // Assert that our values are as expected.
      expect(authed).toBe(AUTH_STATE.AUTHENTICATED);
      expect(userEmail).toBe(mockUser.email);
    });

    it('should handle authorization success', () => {
      payload = {
        rights: { ...mockRights },
        currentUser: mockUser
      };

      // Setup the action for the reducer.
      const action = { type: AUTH_SUCCESS, payload };
      const { hasRights } = reducer(initialState, action);

      // Assert that our values are as expected.
      expect(hasRights).toBe(AUTH_STATE.AUTHENTICATED);
    });

    it('should handle pending auth', () => {
      // Setup the action for the reducer.
      const action = { type: AUTH_PENDING };
      const { authed, hasRights } = reducer(initialState, action);

      // Assert that our values are as expected.
      expect(authed).toBe(AUTH_STATE.PENDING);
      expect(hasRights).toBe(RIGHTS_STATE.PENDING);
    });

    it('should handle auth errors', () => {
      // Setup the action for the reducer.
      const action = { type: AUTH_ERROR, payload: mockError };
      const { authed, hasRights, error } = reducer(initialState, action);

      // Assert that our values are as expected.
      expect(authed).toBe(AUTH_STATE.UNAUTHENTICATED);
      expect(hasRights).toBe(RIGHTS_STATE.UNAUTHORIZED);
      expect(error).toBe(mockError);
    });

    it('should handle unauthed users', () => {
      // Setup the action for the reducer.
      const action = { type: AUTH_FAILED };
      const { authed, hasRights, error } = reducer(initialState, action);

      // Assert that our values are as expected.
      expect(authed).toBe(AUTH_STATE.UNAUTHENTICATED);
      expect(hasRights).toBe(RIGHTS_STATE.UNAUTHORIZED);

      // Unauthed users are NOT an error.
      expect(error).toBe(initialState.error);
    });

    it('should handle a logout', () => {
      // Setup the action for the reducer.
      const action = { type: AUTH_LOGOUT_SUCCESS };
      const { authed, hasRights, error } = reducer(initialState, action);

      // Assert that our values are as expected.
      expect(authed).toBe(AUTH_STATE.UNAUTHENTICATED);
      expect(hasRights).toBe(RIGHTS_STATE.UNAUTHORIZED);

      // Logouts do NOT trigger an error.
      expect(error).toBe(initialState.error);
    });
  });

  describe('modules methods', () => {
    it('should parse user props if there is a user', () => {
      const result = parseUserProps({ currentUser: mockUser });
      // Assert that the proper value was parsed, and prepended with "user".
      expect(result.userEmail).toBe(mockUser.email);
    });

    it('should NOT parse any user props if there is NOT a user', () => {
      const result = parseUserProps({});
      // Assert that an empty object was returned.
      expect(result).toEqual({});
    });

    it('should authorize a user if they have the proper rights', () => {
      const result = authorizeUser({ rights: { ...mockRights } });
      expect(result).toBe(true);
    });

    it('should NOT authorize a user if they DO NOT have the proper rights',
      () => {
        const result = authorizeUser({});
        expect(result).toBe(false);
      });
  });
});
