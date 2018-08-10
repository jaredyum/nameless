import React from 'react';

// React router
import {
  Route,
  Redirect
} from 'react-router-dom';

// Components
import Forbidden from 'components/Common/Forbidden';

// Constants
import {
  ROUTEPATH_LOGIN,
  ROUTEPATH_DEFAULT_PAGE
} from 'copy/Global/routes';

/**
 * Conditionally renders a route based on the current app/auth state.
 * @param {!React.Component} Component The intended component to render.
 * @param {!Object} props The initial/intended props for the rendered component.
 * @param {boolean} authed Whether the user is authenticated/authorized.
 * @return {!React.Component} The React component that satifies the given
 *    app state.
 */
export const renderRoute = (Component, props, authed) => {
  const { authOnly, unauthOnly, location } = props;
  const { pathname } = location;

  if (authed === false) {
    // Prevent any unauthorized navigation.
    // TODO: User needs to be BOTH authorized AND authenticated!!!
    // TODO: Display the intended path and offer to redirect after login.
    if (authOnly) {
      return <Forbidden />;
    }

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

  // Authorized users should not be able to access pages meant for
  // non-logged-in users. For example, an authed user should not be able to
  // navigate to the login page or reset password page.
  if (authed && unauthOnly && pathname !== ROUTEPATH_DEFAULT_PAGE) {
    return (
      <Redirect
        to={{
          pathname: ROUTEPATH_DEFAULT_PAGE,
          state: { from: location }
        }}
      />
    );
  }

  // Render the original component requested.
  return <Component {...props} />;
};

const RouteMiddleware = ({ component: Component, authed, ...props }) => (
  <Route
    {...props}
    render={() => renderRoute(Component, props, authed)}
  />
);

export default RouteMiddleware;
