import { connect } from 'react-redux';

import { APP_NAME } from 'copy/Global/common';

// Actions
import { logout as logoutAction } from 'actions/Auth';

// TODO: In a future version, this component will be COMPLETELY abstracted out.
import Navigation from 'modules/Navigation';

export const getTopNavMenuConfig = ({ logout }) => [{
  label: 'Home',
  path: '/'
}, {
  label: 'Logout',
  clickHandler: logout
}];

/**
 * Gets the sidemenu configuration.
 *
 * The config takes a dictionary of actions (provided via mapDispatchToProps),
 * and returns a dictionary of menu groups.
 *
 * @param {!Object.<string, !Function>} actions Dictionary of actions to use
 *   in the configuration.
 * @return {!Object.<string, !Array>} The configuration dictionary.
 */
export const getSideMenuConfig = ({ logout }) => [
  {
    navTitle: 'Navigation',
    navItems: [{
      label: 'Home',
      path: '/'
    }, {
      label: 'Logout',
      clickHandler: logout
    }]
  }
];

const mapStateToProps = (state, props) => ({
  appName: APP_NAME,
  searchPlaceholder: 'Find a Store',
  ...props
});

const mapDispatchToProps = (dispatch) => {
  const logout = (...args) => dispatch(logoutAction(...args));

  return ({
    sideMenuConfig: getSideMenuConfig({ logout }),
    topNavMenuConfig: getTopNavMenuConfig({ logout }),
    logout
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
