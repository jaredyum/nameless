import React from 'react';

// MUI
import { withStyles } from 'material-ui/styles';

// Components
import TopNav from 'components/Common/topNav';

// Utils
import {
  findNotification,
  showNotification
} from 'utils/notifications';

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
};

const Main = (props) => {
  const {
    classes,
    children,
    notifications,
    currentNotification
  } = props;

  const notificationObj = findNotification(currentNotification, notifications);

  return (
    <div className={classes.root}>
      <TopNav />
      { showNotification(notificationObj)}
      {children}
    </div>
  );
};

export default withStyles(styles)(Main);
