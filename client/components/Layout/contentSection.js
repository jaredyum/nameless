import React from 'react';

// MUI Components
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

// Styles
import { styles as paperStyles } from 'components/Styles/paper';

const ContentSection = ({ children, classes }) => (
  <Paper className={classes.paperDefault}>{children}</Paper>
);

export default withStyles(paperStyles)(ContentSection);
