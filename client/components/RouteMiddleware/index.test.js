import React from 'react';

// React router
import {
  Route,
  Redirect
} from 'react-router-dom';

// Test utils.
import {
  testCommonComponentAttrs,
  getComponentWrapper
} from 'utils/tests';

// Constants
import {
  ROUTEPATH_LOGIN,
  ROUTEPATH_DEFAULT_PAGE
} from 'copy/Global/routes';

// Components
import Home from 'components/Common/home';
import Login from 'components/Auth/Login';
import RouteMiddleware, { renderRoute } from './index';

const defaultProps = {
  location: { pathname: '/' }
};

const combineProps = newProps => ({
  ...defaultProps,
  ...newProps
});

let authed;
let IntendedComponent;

describe('<RouteMiddleware /> Component', () => {
  testCommonComponentAttrs(RouteMiddleware);

  describe('rendering middleware', () => {
    it('should render a route', () => {
      const location = { pathname: '/foo' };
      const props = {
        component: Home,
        authed: true,
        location
      };
      const ComponentWrapper = getComponentWrapper(RouteMiddleware, props);

      // Assert that the middleware returns a <Route />.
      const routeMiddleware = ComponentWrapper.find(Route);
      expect(routeMiddleware).toHaveLength(1);

      // Assert that the Route's render() returns the intended component.
      const routeMiddlewareProps = routeMiddleware.props();
      expect(routeMiddlewareProps.render()).toEqual(<Home location={location} />);
    });
  });

  describe('rendering routes', () => {
    describe('when NOT logged in', () => {
      beforeEach(() => {
        authed = false;
        IntendedComponent = Home;
      });

      it('should redirect to the login page if page IS NOT restricted', () => {
        const Component = renderRoute(IntendedComponent, defaultProps, authed);
        const ComponentProps = Component.props;

        // Assert that a redirect (to the login page) is rendered.
        expect(Component.type).toEqual(Redirect);
        expect(ComponentProps.to.pathname).toEqual(ROUTEPATH_LOGIN);
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        authed = true;
        IntendedComponent = Home;
      });

      it('should redirect to the home page when trying to access an unauthed page',
        () => {
        // Set up a scenario that we are trying to access the Login page
        // while logged in.
          const props = combineProps({
            unauthOnly: true,
            location: { pathname: '/login' }
          });
          const Component = renderRoute(Login, props, authed);
          const ComponentProps = Component.props;

          // Assert that a redirect (to the home page) is rendered.
          expect(Component.type).toEqual(Redirect);
          expect(ComponentProps.to.pathname).toEqual(ROUTEPATH_DEFAULT_PAGE);
        });

      it('should render the intended component when there are no exceptions',
        () => {
          const Component = renderRoute(IntendedComponent, defaultProps, authed);

          // Assert that intended page (Home) was rendered.
          expect(Component.type).toEqual(IntendedComponent);
        });
    });
  });
});
