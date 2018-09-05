import React from 'react';

// MUI Components
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './styles';

const LoadingIndicator = ({ classes }) => (
  <div className={classes.loadingWrapper}>
    <CircularProgress className={classes.progress} size={50} />
  </div>
);

export default withStyles(styles)(LoadingIndicator);
