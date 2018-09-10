import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Action Types
import {
  AUTH_ERROR,
  AUTH_SUCCESS,

  AUTH_LOGOUT_SUCCESS
} from 'actions/types';

import {
  login,
  logout,
  handleStateChange,
  onAuthStateChange
} from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockUser = { email: 'foo@bar.com', password: 'p4ssw0rd' };
const mockError = 'FAIL!';

// Mocks for firebase services.
let mockHandleStateChange;
let mockSignInWithEmailAndPassword;
let mockSignout;

// Mocks for user services (Rights Manager).
let mockGetUserByEmail;

let store;
let mockAuth;
let mockDispatch;

jest.mock('services/user', () => ({
  getUserByEmail: (...args) => mockGetUserByEmail(...args)
}));

jest.mock('services/firebase', () => Promise.resolve({
  onAuthStateChanged: () => mockHandleStateChange(mockAuth, mockDispatch),
  signInWithEmailAndPassword: (...args) => mockSignInWithEmailAndPassword(...args),
  signOut: () => mockSignout()
}));

describe('Auth Actions', () => {
  beforeEach(() => {
    store = mockStore({});

    mockAuth = { currentUser: {} };
    mockDispatch = jest.fn();

    // Service mocks.
    mockHandleStateChange = jest.fn();
    mockSignInWithEmailAndPassword = jest.fn();
    mockSignout = jest.fn();
    mockGetUserByEmail = jest.fn(() => Promise.resolve());
  });

  describe('logging in', () => {
    it('should log a user in', () => {
      const { email, password } = mockUser;
      return store.dispatch(login(email, password)).then(() => {
        expect(mockSignInWithEmailAndPassword)
          .toHaveBeenCalledWith(email, password);
      });
    });
  });

  describe('logging out', () => {
    it('should log a user out', () => store.dispatch(logout()).then(() => {
      expect(mockSignout).toHaveBeenCalled();
      const expectedActions = [{ type: AUTH_LOGOUT_SUCCESS }];
      expect(store.getActions()).toEqual(expectedActions);
    }));
  });

  describe('handling authentication state changes', () => {
    it('should register the firebase auth listener', () => store
      .dispatch(onAuthStateChange())
      .then(() => {
        expect(mockHandleStateChange)
          .toHaveBeenCalledWith(mockAuth, mockDispatch);
      }));

    it('should handle state changes when there is a user',
      () => handleStateChange({ ...mockUser }, store.dispatch)
        .then(() => {
          const expectedActions = [{
            payload: {
              currentUser: mockUser,
              rights: undefined
            },
            type: AUTH_SUCCESS
          }];

          // Assert the correct actions were called.
          expect(store.getActions()).toEqual(expectedActions);

          // Assert that the getUserByEmail service was called with the email passed.
          expect(mockGetUserByEmail).toHaveBeenCalledWith(mockUser.email);
        }));

    it('should handle state changes when there is NOT a user', () => {
      // Force the service call to fail.
      mockGetUserByEmail.mockImplementation(() => Promise.reject(mockError));

      return handleStateChange({ email: null }, store.dispatch).then(() => {
        const expectedActions = [{
          payload: mockError,
          type: AUTH_ERROR
        }];

        // Assert the correct actions were called (failed service).
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
