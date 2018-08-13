import React from 'react';

// React Router
import { NavLink } from 'react-router-dom';

// MUI Components
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

// Local styles
import styles from '../../styles';

const SideMenuItems = ({ toggleHandler, classes, collection }) =>
  collection.map(({
    label,
    path,
    clickHandler
  }) => {
    // If this is an action item (NOT a link), then clicking should BOTH execute
    // the action AND close the menu.
    if (clickHandler) {
      const closeAndExec = () => {
        toggleHandler();
        clickHandler();
      };

      return (
        <ListItem onClick={closeAndExec} key={label}>
          <span className={classes.link}>{ label }</span>
        </ListItem>
      );
    }

    return (
      <ListItem key={label}>
        <NavLink
          to={path}
          className={classes.link}
          onClick={toggleHandler}
          replace
        >{ label }</NavLink>
      </ListItem>
    );
  });

export const SideMenuItemsJest = SideMenuItems;

export default withStyles(styles)(SideMenuItems);
