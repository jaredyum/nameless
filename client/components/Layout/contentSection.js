import React from 'react';

// MUI Components
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

// Styles
import { styles as paperStyles } from 'components/Styles/paper';

const ContentSection = ({ children, classes }) => (
  <Paper className={classes.paperDefault}>{children}</Paper>
);

export default withStyles(paperStyles)(ContentSection);
