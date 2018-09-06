import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { APP_NAME } from 'copy/Global/common';

// Actions
import { logout as logoutAction } from 'actions/Auth';

// Components
import { Navigation } from 'phd-navigation';

// Config
import {
  getSideMenuConfig,
  getTopNavMenuConfig
} from './config';

const mapStateToProps = (state, props) => {
  const { authReducer } = state;
  const { authed, hasRights, userEmail } = authReducer;

  return ({
    authed,
    hasRights,
    userEmail,
    ...props
  });
};

const mapDispatchToProps = dispatch => ({
  logout: (...args) => dispatch(logoutAction(...args))
});

/**
 * Merges the state and props.
 *
 * Typically, we never need to invoke a merge (Redux does this automatically),
 * but in this case we are conditionally changing and updating menus based on
 * state, and those menus rely on dispatchable actions that we mapped in
 * "mapDispatchToProps".
 *
 * See:
 *  https://github.com/reduxjs/react-redux/blob/master/docs/api.md# ↵
 *    inject-todos-of-a-specific-user-depending-on-props-and-inject ↵
 *    -propsuserid-into-the-action
 *
 * @param {!Object} stateProps The "mapStateToProps" object.
 * @param {!Object} dispatchProps The "mapDispatchToProps" object.
 * @return {!Object} The merged state and dispatch props.
 */
const mergeProps = (stateProps, dispatchProps) => {
  const { authed, hasRights, userEmail } = stateProps;

  const sideMenuConfig = getSideMenuConfig(stateProps, dispatchProps);
  const topNavMenuConfig = getTopNavMenuConfig(stateProps, dispatchProps);

  const props = {
    appName: APP_NAME,
    userEmail: authed && !hasRights ? 'Unauthorized User' : userEmail,
    sideMenuConfig,
    topNavMenuConfig
  };

  return props;
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(Navigation)
);
