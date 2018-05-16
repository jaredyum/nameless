import React from 'react';

// MUI
import { withStyles } from 'material-ui/styles';

// Components
import TopNav from 'components/Common/topNav';

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
};

const Main = (props) => {
  const { classes, children } = props;

  return (
    <div className={classes.root}>
      <TopNav />
      {children}
    </div>
  );
};

export default withStyles(styles)(Main);
