import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  loadingWrapper: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function LoadingIndicator(props) {
  const { classes } = props;
  return (
    <div className={classes.loadingWrapper}>
      <CircularProgress className={classes.progress} size={50} />
    </div>
  );
}

export default withStyles(styles)(LoadingIndicator);
