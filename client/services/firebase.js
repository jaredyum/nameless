import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

export const firebaseConfig = axios.get('/cfg/firebase/firebase.json').then(
  ({ data }) => (typeof data === 'object' ? data : JSON.parse(data))
);

export const applicationConfig = axios.get('/cfg/app/config.json').then(
  ({ data }) => (typeof data === 'object' ? data : JSON.parse(data))
);

export const apiConfig = Promise.all([
  firebaseConfig,
  applicationConfig
]).then(cfgs => cfgs.reduce(
  (r, o) => ({ ...r, ...o }), {}
));

/**
 * Gets the current Firebase configuration.
 * If no Firebase app is found, we initialize it.
 * @return {!Promise} A promise resolving with the firebase configuation.
 */
export default apiConfig
  .then((apiCfg) => {
    if (!firebase.apps.length) {
      return firebase.initializeApp({ ...apiCfg });
    }
    return firebase.app();
  })
  .then(fireBaseApp => fireBaseApp.auth());
