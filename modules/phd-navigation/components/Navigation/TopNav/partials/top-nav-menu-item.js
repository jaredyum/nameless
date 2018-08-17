import React from 'react';

// MUI Components
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

// React Router
import { NavLink } from 'react-router-dom';

// Local styles
import styles from '../../styles';

/**
 * Factory that wraps the click and close handlers.
 * If this is an action item (NOT a link), then clicking should BOTH execute
 * the action AND close the menu.
 * @param {!Function} closeHandler The close handler (closes the menu).
 * @param {!Function} clickHandler The click handler (executes the desired action).
 * @return {!Function} The wrapper that calls both the close and click handlers.
 */
const closeAndExec = (closeHandler, clickHandler) => () => {
  closeHandler();
  clickHandler();
};

const NavMenuItem = ({
  classes,
  label,
  path,
  clickHandler,
  closeHandler
}) => {
  if (clickHandler) {
    const clickAction = closeAndExec(closeHandler, clickHandler);

    return (
      <MenuItem title={label} onClick={() => clickAction()}>
        <span className={classes.link}>{ label }</span>
      </MenuItem>
    );
  }

  return (
    <MenuItem onClick={closeHandler}>
      <NavLink
        title={label}
        className={classes.link}
        to={path}
        replace
      >
        { label }
      </NavLink>
    </MenuItem>
  );
};

export const NavMenuItemJest = NavMenuItem;

export default withStyles(styles)(NavMenuItem);
