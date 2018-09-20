/* eslint-disable no-console */
import axios from 'axios';

// Firebase config.
import firebase from 'services/firebase';

// Errors
import { API_ERRORS } from 'copy/Global/errors';

/**
 * Decorates the headers for a request.
 * @param {string} token The firebase token.
 * @return {!Object} The decorated headers object.
 */
const decorateHeaders = token => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
});

export const defaultCatch = (endPoint, source = 'services') => (e) => {
  console.error(`${source}/${endPoint}`, e);
  throw e;
};

/**
 * Extracts and parses the Firebase token to use for requests.
 * @return {!Promise} A promise resolving with the firebase token.
 */
export const getUserToken = () => firebase
  .then(auth => auth.currentUser)
  .then(user => user.getIdToken())
  .catch(defaultCatch('getUserToken'));

/**
 * Request wrapper for all request types (GET, POST, PUT, DELETE, etc).
 * @param {!Object} config The request configuration.
 * @param {string} config.url The URL for the request.
 * @param {string} config.method The method (GET, POST, etc) for the request.
 * @param {!Object} config.payload Optional request payload.
 * @return {!Promise} Promise containing the axios response.
 */
export const makeRequest = ({
  url,
  method = 'get',
  payload = null
}) => getUserToken()
  .then(token => ({
    headers: decorateHeaders(token),
    method,
    url,
    ...(
      payload ? { data: payload } : {}
    )
  }))
  .then(axios)
  .then((res) => {
    if (res && (res.status >= 200 || res.status < 400)) {
      return res;
    }
    throw new Error(API_ERRORS.BAD_REQUEST);
  })
  .then((res) => {
    if ('location' in res.headers) {
      return makeRequest(res.headers.location, 'GET', null, true);
    }

    return res;
  });
