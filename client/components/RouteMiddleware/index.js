import React from 'react';

// React router
import {
  Route,
  Redirect
} from 'react-router-dom';

// Constants
import {
  ROUTEPATH_LOGIN,
  ROUTEPATH_DEFAULT_PAGE
} from 'copy/Global/routes';

import Forbidden from 'components/Forbidden';

/**
 * Conditionally renders a route based on the current app/auth state.
 * @param {!React.Component} Component The intended component to render.
 * @param {!Object} props The initial/intended props for the rendered component.
 * @param {boolean} authed Whether the user is authenticated.
 * @param {boolean} hasRights Whether the user is authorized.
 * @return {!React.Component} The React component that satifies the given
 *    app state.
 */
export const renderRoute = (Component, routeProps, authed, hasRights) => {
  const { authOnly, unauthOnly, location } = routeProps;
  const { pathname } = location;

  if (authed === false) {
    // If a user is NOT logged in, and they are are trying to access a page that
    // is NOT marked for unauthed users, redirect them to the login page.
    // For example, if a user was trying to access "resetPassword", we won't
    // redirect them to the login page.
    if (!unauthOnly && pathname !== ROUTEPATH_LOGIN) {
      return (
        <Redirect
          to={{
            pathname: ROUTEPATH_LOGIN,
            state: { from: location }
          }}
        />
      );
    }
  }

  if (authed) {
    // Authorized users should not be able to access pages meant for
    // non-logged-in users. For example, an authed user should not be able to
    // navigate to the login page or reset password page.
    if (unauthOnly && pathname !== ROUTEPATH_DEFAULT_PAGE) {
      return (
        <Redirect
          to={{
            pathname: ROUTEPATH_DEFAULT_PAGE,
            state: { from: location }
          }}
        />
      );
    }

    // Prevent any unauthorized navigation for routes that require
    // authorization.
    if (authOnly && hasRights === false) {
      return <Forbidden />;
    }
  }

  // Render the original component requested.
  return <Component {...routeProps} />;
};

const RouteMiddleware = ({
  component: Component,
  authed,
  hasRights,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={() => renderRoute(Component, routeProps, authed, hasRights)}
  />
);


export default RouteMiddleware;
