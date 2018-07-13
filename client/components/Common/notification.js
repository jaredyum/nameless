import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const Notification = props => (
  <Snackbar
    id="notifications-snackbar"
    className={props.className}
    open={!!props.open}
    message={props.message || ''}
    autoHideDuration={6000}
  />
);

export default Notification;
