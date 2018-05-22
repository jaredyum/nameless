import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const Notification = props => (
  <Snackbar
    className={props.className}
    open={!!props.open}
    message={props.message || ''}
    autoHideDuration={6000}
  />
);

export default Notification;
