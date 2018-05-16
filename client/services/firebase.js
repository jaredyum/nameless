import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

export const apiConfig = axios.get('/cfg/firebase.json').then(
  ({ data }) => (typeof data === 'object' ? data : JSON.parse(data))
);

export default apiConfig
  .then(apiCfg => firebase.initializeApp({ ...apiCfg }))
  .then(fireBaseApp => fireBaseApp.auth());
