import {
  NOTIFICATION_DISPLAY_ERROR,
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE
} from 'actions/types';

/**
 * Displays error notification to the user.
 * @param {boolean} error Whether there is an error or not.
 * @param {string} errMsg Custom message to show user.
 */
export const displayError = (error, errMsg) => dispatch => dispatch({
  type: NOTIFICATION_DISPLAY_ERROR,
  payload: {
    error,
    errMsg
  }
});

/**
 * Toggles a notification to the user.
 * @param {boolean} notification Whether to show or hide notification.
 * @param {string} message Custom message to show user.
 * @param {string} type The type of notification to display.
 */
export const toggleNotification = (message, type) => (dispatch) => {
  dispatch({
    type: NOTIFICATION_ADD,
    payload: {
      message,
      type
    }
  });

  setTimeout(() => {
    dispatch({
      type: NOTIFICATION_REMOVE
    });
  }, 7000);
};
