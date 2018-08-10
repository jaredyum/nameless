// Route components
import Home from 'components/Common/home';
import Login from 'components/Auth/Login';
import ResetPassword from 'components/Auth/resetPassword';
import NotFound from 'modules/NotFound';

/**
 * Flag indicating that this path must be matched the "path" exactly.
 * @type {boolean}
 */
const exact = true;

/**
 * Flag indicating that only authorized users can access this page.
 * @type {boolean}
 */
// TODO: Developers - enable this flag when you have authorized routes.
// const authOnly = true;

/**
 * Flag indicating that only non-logged-in users can access this page.
 * @type {boolean}
 */
const unauthOnly = true;

/**
 * The routes configuration.
 * NOTE: RouteInterceptor MUST come last; it is our application's 404 handler.
 * @const {!Array.<!Object>}
 */
const ROUTES_CONFIG = [
  /* Routes that only non-logged-in users should access. (unauthOnly=true) */
  {
    path: '/login',
    component: Login,
    exact,
    unauthOnly
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    exact,
    unauthOnly
  },

  /* (Protected) Routes that only logged-in users should access. (authOnly=true) */
  /* Add PROTECTED routes here with the authOnly flag. */

  /* Routes that are always available. */
  {
    path: '/(home)?',
    component: Home,
    exact
  },

  /* Non-matched routes render a 404 not found (path=null) */
  {
    component: NotFound
  }
];

export default ROUTES_CONFIG;
