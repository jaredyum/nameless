// Route components
import Home from 'components/Common/home';
import NotFound from 'components/NotFound';

/**
 * The routes configuration.
 * NOTE: RouteInterceptor MUST come last; it is our application's 404 handler.
 * @const {!Array.<!Object>}
 */
const ROUTES_CONFIG = [
  /* (Protected) Routes that only logged-in users should access. (authOnly=true) */
  /* Add PROTECTED routes here with the authOnly flag. */

  /* Routes that are always available. */
  {
    path: '/(home)?',
    component: Home
  },

  /* Non-matched routes render a 404 not found (path=null) */
  {
    component: NotFound
  }
];

export default ROUTES_CONFIG;
