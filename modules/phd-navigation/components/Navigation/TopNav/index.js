import React from 'react';

// MUI Components
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Components
import TopNavSearchForm from './partials/top-nav-search';
import TopNavMenu from './partials/top-nav-menu';

// Styles
import styles from '../styles';

const TopNav = (props) => {
  const {
    classes,
    searchHandler,
    toggleHandler,
    appName,
    menuItems,
    userEmail
  } = props;

  return (
    <div>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleHandler}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="title"
            color="inherit"
            className={classes.flex}
          >
            {/* TODO: This should be a link to Home. */}
            {appName}
          </Typography>
          {/* Search Form */}
          { searchHandler && <TopNavSearchForm {...props} /> }
          {/* Nav Menu */}
          <TopNavMenu
            menuItems={menuItems}
            userEmail={userEmail}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export const TopNavJest = TopNav;

export default withStyles(styles)(TopNav);
