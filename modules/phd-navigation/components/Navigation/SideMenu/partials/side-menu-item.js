import React, { Component } from 'react';

// React Router
import { NavLink } from 'react-router-dom';

// MUI Components
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

// Local styles
import styles from '../../styles';

class SideMenuItem extends Component {
  constructor(props) {
    super(props);

    this.isActive = this.isActive.bind(this);
  }

  /**
   * Determines if the link is active or not.
   * @param {!Object} match The react router match object.
   * @param {!Object} location The react router location object.
   * @param {string} location.pathname The pathname (as reported by react
   *   router.)
   * @return {boolean} Whether or not the link item is active.
   */
  isActive(match, location) {
    const { path } = this.props;
    const { pathname } = location;

    return path === pathname;
  }

  render() {
    const {
      classes,
      label,
      path,
      clickHandler,
      toggleHandler
    } = this.props;

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
          isActive={this.isActive}
          exact
        >
          { label }
        </NavLink>
      </ListItem>
    );
  }
}

export const SideMenuItemJest = SideMenuItem;

export default withStyles(styles)(SideMenuItem);
