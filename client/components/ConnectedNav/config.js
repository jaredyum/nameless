/**
 * @fileoverview
 *
 * DO NOT BLINDLY COPY AND PASTE THIS FILE - IT MUST BE CONFIGURED FOR YOUR
 * PROJECT'S NEEDS.
 */
import {
  ROUTEPATH_LOGIN,
  ROUTEPATH_DEFAULT_PAGE
} from 'copy/Global/routes';

/**
 * Dictionary of common nav items for the side menu and the top nav.
 * @const {!Object.<string, !Object>}
 */
const DEFAULT_MENU_ITEMS = {
  HOME: {
    label: 'Home',
    path: ROUTEPATH_DEFAULT_PAGE
  },
  LOGIN: {
    label: 'Login',
    path: ROUTEPATH_LOGIN
  }
};

/**
 * Gets the Top Nav Menu configuration.
 *
 * The config returns a flat list of menu items.
 *
 * @param {!Object} stateProps Props derived from "mapStateToProps".
 * @param {!Object} dispatchProps Props derived from "mapDispatchToProps".
 * @return {!Array<!Object>} The top nav menu items.
 */
export const getTopNavMenuConfig = (stateProps, dispatchProps) => {
  const { authed } = stateProps;
  const { logout } = dispatchProps;

  const menuItems = [];

  if (authed) {
    menuItems.push(
      DEFAULT_MENU_ITEMS.HOME,
      { label: 'Logout', clickHandler: logout }
    );
  } else {
    menuItems.push(
      DEFAULT_MENU_ITEMS.LOGIN,
    );
  }

  return menuItems;
};

/**
 * Gets the Side Menu configuration.
 *
 * The config returns an array of menu groups that are use the following
 * structure:
 *
 * {
 *   navTitle: <TITLE FOR NAV GROUP>,
 *   navItems: [<NAV_ITEM>, <NAV_ITEM>]
 * }
 *
 * @param {!Object} stateProps Props derived from "mapStateToProps".
 * @param {!Object} dispatchProps Props derived from "mapDispatchToProps".
 * @return {!Object.<string, !Array>} The configuration dictionary.
 */
export const getSideMenuConfig = (stateProps, dispatchProps) => {
  const { authed } = stateProps;
  const { logout } = dispatchProps;

  const navigationGroup = {
    navTitle: 'Navigation',
    navItems: []
  };

  if (authed) {
    navigationGroup.navItems.push(
      DEFAULT_MENU_ITEMS.HOME,
      { label: 'Logout', clickHandler: logout },
    );
  } else {
    navigationGroup.navItems.push(DEFAULT_MENU_ITEMS.LOGIN);
  }

  return [navigationGroup];
};
