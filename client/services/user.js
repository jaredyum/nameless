/* eslint-disable no-console */
import axios from 'axios';

// Services
import firebase, { apiConfig } from 'services/firebase';

// Utils
import { defaultCatch } from 'utils/services';

const attach = token => Object.assign({}, {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
});

export const getUserToken = () => firebase
  .then(auth => auth.currentUser)
  .then(user => user.getIdToken())
  .catch((e) => {
    console.error('factories/tokenFactory/getUserToken', e);
  });

/**
 * Gets a user from Right Manager, attempting to authorize them as well.
 * @param {string} email The email for the user to fetch.
 * @return {!Promise} Promise resolving with the Rights Manager user data.
 */
export const getUserByEmail = email => Promise.all([
  getUserToken(),
  apiConfig
])
  .then(([token, {
    apiKey,
    rightsMgrHost,
    rightsMgrVersion
  }]) => axios({
    method: 'get',
    url: `${rightsMgrHost}/${rightsMgrVersion}/user?nameLike=${encodeURIComponent(email)}&key=${apiKey}`,
    headers: attach(token)
  }))
  .then(({ data }) => {
    const { users } = data;
    return users[0] && !users[0].disabled ? users[0] : null;
  })
  .catch(defaultCatch('getUserByEmail'));
