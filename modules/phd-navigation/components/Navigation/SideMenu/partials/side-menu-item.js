import React from 'react';

// React Router
import { NavLink } from 'react-router-dom';

// MUI Components
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

// Local styles
import styles from '../../styles';

const SideMenuItem = (props) => {
  const {
    classes,
    label,
    path,
    clickHandler,
    toggleHandler
  } = props;

  // If this is an action item (NOT a link), then clicking should BOTH execute
  // the action AND close the menu.
  if (clickHandler) {
    const closeAndExec = () => {
      toggleHandler();
      clickHandler();
    };

    return (
      <ListItem title={label} onClick={closeAndExec} key={label}>
        <span className={classes.link}>{ label }</span>
      </ListItem>
    );
  }

  return (
    <ListItem title={label} key={label}>
      <NavLink
        to={path}
        className={classes.link}
        onClick={toggleHandler}
        replace
        activeClassName={classes.active}
      >
        { label }
      </NavLink>
    </ListItem>
  );
};

export const SideMenuItemJest = SideMenuItem;

export default withStyles(styles)(SideMenuItem);
