/**
 * @fileoverview
 * In order for any component to match a route, you must registed that component
 * here first.
 *
 * See: client/containers/RouteManager
 * See: client/routes
 */

// Common
export { default as Home } from 'components/Common/home';
export { default as Main } from 'components/Common/main';
export { default as RouteInterceptor } from 'components/Common/routeInterceptor';

// Auth
export { default as Login } from 'components/Auth/login';
export { default as ResetPassword } from 'components/Auth/resetPassword';
