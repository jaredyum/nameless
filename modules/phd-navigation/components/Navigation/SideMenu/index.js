import React from 'react';

// MUI Components
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

// Components
import SideMenuGroups from './partials/side-menu-groups';

// Local styles
import styles from '../styles';

const SideMenu = (props) => {
  const {
    appName,
    classes,
    sidebarOpen,
    sideMenuConfig,
    toggleHandler
  } = props;

  // The drawer is the same for BOTH desktop and mobile, but it in initialzed
  // differently for each
  const drawer = (
    <SideMenuGroups
      sideMenuConfig={sideMenuConfig}
      toggleHandler={toggleHandler}
    />
    // <div>
    //   <Toolbar className={classes.toolbar}>
    //     <Typography
    //       variant="title"
    //       color="inherit"
    //       className={classes.flex}
    //     >
    //       {appName}
    //     </Typography>
    //   </Toolbar>
    //   <Divider />
    //   <SideMenuGroups
    //     sideMenuConfig={sideMenuConfig}
    //     toggleHandler={toggleHandler}
    //   />
    // </div>
  );

  return (
    <div>
      {/* Mobile Drawer */}
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={sidebarOpen}
          onClose={toggleHandler}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true /* Better open performance on mobile. */
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      {/* Desktop Drawer */}
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );
};

export const SideMenuJest = SideMenu;

export default withStyles(styles)(SideMenu);
