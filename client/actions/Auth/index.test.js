import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  authenticate,
  authorize,
  login,
  logout,
  onAuthStateChange
} from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockUser = { email: 'foo@bar.com' };
const mockAuthenticate = jest.fn();

let store;

jest.mock('services/user', () => ({
  getUserByEmail: () => Promise.resolve({ services: [] })
}));

jest.mock('services/firebase', () => Promise.resolve({
  currentUser: 'foo',
  onAuthStateChanged: () => ({
    authenticate: mockAuthenticate
  }),
  signInWithEmailAndPassword: () => ({
    user: mockUser
  }),
  signOut: () => jest.fn()
}));


describe('Auth Actions', () => {
  beforeEach(() => {
    store = mockStore({});
  });

  describe('logging in', () => {
    it('should log a user in', () => store.dispatch(login()).then(() => {
      const expected = [
        { type: 'AUTH_LOGIN_PENDING' },
        { type: 'AUTH_LOGIN_SUCCESS', payload: { ...mockUser } }
      ];
      expect(store.getActions()).toEqual(expected);
    }));
  });

  describe('logging out', () => {
    it('should log a user out', () => store.dispatch(logout()).then(() => {
      const expected = [
        { type: 'AUTH_LOGOUT_SUCCESS' }
      ];
      expect(store.getActions()).toEqual(expected);
    }));
  });

  describe('handling authentication state changes', () => {
    it('should register the firebase auth listener', () => store
      .dispatch(onAuthStateChange())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: 'AUTH_AUTHORIZATION_PENDING' },
          { type: 'AUTH_AUTHENTICATION_PENDING' }
        ]);
      }));

    it('should authenticate a found user', () => {
      store.dispatch(authenticate(mockUser));

      const expected = ['AUTH_AUTHENTICATION_SUCCESS'];

      store.getActions().forEach((action, i) => {
        expect(action.type).toEqual(expected[i]);
      });
    });

    it('should authorize a found user', () => {
      store.dispatch(authorize(mockUser));

      const expected = [
        'AUTH_AUTHORIZATION_PENDING',
        'AUTH_AUTHORIZATION_SUCCESS'
      ];

      store.getActions().forEach((action, i) => {
        expect(action.type).toEqual(expected[i]);
      });
    });
  });
});
