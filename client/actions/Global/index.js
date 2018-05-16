// Action Types
import {
  ROUTER_REDIRECT_IN_PROGRESS,
  MODAL_CLOSE_MODAL
} from 'actions/types';

import { push } from 'react-router-redux';

// Change Route Action
export const changeRoute = route => (dispatch) => {
  dispatch({ type: MODAL_CLOSE_MODAL, payload: true });
  return dispatch(push(route));
};

export const saveRedirect = redirectUrl => (dispatch) => {
  dispatch({
    type: ROUTER_REDIRECT_IN_PROGRESS,
    payload: redirectUrl
  });
};
