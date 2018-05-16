import { PAGE_AUTH_REQS } from 'copy/Global/routes';

export const PROP_CONTENT_ROUTE = '[[ContentRoute]]';

const exact = true;

const {
  ANY,
  AUTHORIZED,
  UNAUTHORIZED
} = PAGE_AUTH_REQS;

/**
 * Do not export routes - if you need to get a list of routes (as an array or
 * object), use one of the convenience methods down below.
 */
const routesConfig = {
  // Auth Routes => /:context
  authLogin: {
    label: 'Login',
    path: '/login',
    title: 'Login',
    authReq: UNAUTHORIZED,
    component: 'Login',
    exact
  },
  authResetPassword: {
    label: 'Reset',
    path: '/reset-password',
    title: 'Reset Password',
    authReq: UNAUTHORIZED,
    component: 'ResetPassword',
    exact
  },
  authRedirector: {
    label: 'Redirect',
    path: '/redirect',
    title: 'Firebase Redirect',
    authReq: UNAUTHORIZED,
    component: 'FirebaseRedirector',
    exact
  },
  authChangePassword: {
    label: 'Change',
    path: '/change-password/:oobCode/',
    title: 'Change Password',
    authReq: UNAUTHORIZED,
    component: 'ChangePassword',
    exact
  },
  authVerification: {
    label: 'Verify',
    path: '/verification',
    title: 'Verify your email',
    authReq: UNAUTHORIZED,
    component: 'Login',
    exact
  },
  authRestricted: {
    label: 'Restricted Access',
    path: '/restricted-access',
    title: 'Restricted Access',
    authReq: UNAUTHORIZED,
    component: 'RestrictedAccess',
    exact
  },

  home: {
    label: 'Home',
    path: '/(home)?',
    title: 'Home',
    authReq: AUTHORIZED,
    component: 'Home'
  },

  // ********************************************************
  // ********************************************************
  // ********************************************************
  // ANY ROUTES BELOW RouteInterceptor WILL NOT BE CONSIDERED
  // ********************************************************
  // ********************************************************
  // ********************************************************

  routeInterceptor: {
    label: null,
    title: null,
    authReq: ANY,
    component: 'RouteInterceptor'
  }
};

export default routesConfig;
