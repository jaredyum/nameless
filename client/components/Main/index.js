import React from 'react';

// MUI Components
import { withStyles } from '@material-ui/core/styles';

// Utils
import {
  findNotification,
  showNotification
} from 'utils/notifications';

import styles from './styles';

const Main = (props) => {
  const {
    children,
    classes,
    notifications,
    currentNotification
  } = props;

  const notificationObj = findNotification(currentNotification, notifications);

  return (
    <main className={classes.main}>
      <div className={classes.toolbar} />
      { showNotification(notificationObj)}
      { children }
    </main>
  );
};

export const MainJest = Main;

export default withStyles(styles)(Main);
