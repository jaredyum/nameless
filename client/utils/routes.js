import pathToRegexp from 'path-to-regexp';
import routesConfig from 'routes';

import { PAGE_AUTH_REQS } from 'copy/Global/routes';

const { ANY } = PAGE_AUTH_REQS;

const propDescriptor = {
  enumerable: false,
  writable: false,
  configurable: false
};

export const PROP_KEY = '[[Key]]';
export const PROP_REGEXP = '[[RegExp]]';
export const PROP_PARAMS = '[[Parameters]]';

export const specialArrToObj = a => a.reduce((o, v) => ({ ...o, [v[PROP_KEY]]: v }), {});

/**
 * Determine filter function
 * @param {string} filter Auth requirement
 * @param {function} filter Function used to filter array
 * @return {function} Function that should be used to filter
 */
export const getFilterFunc = (filter = null) => {
  if (filter === null || filter === undefined) return () => true;
  if (typeof filter === 'function') return filter;
  return r => r.authReq === filter || r.authReq === ANY;
};

export const getSpecialRouteObj = (key, route) =>
  Object.defineProperties(route, {
    // Save the key for back referencing
    [PROP_KEY]: { ...propDescriptor, value: key },
    // Convert route's path property into a regular expression
    [PROP_REGEXP]: { ...propDescriptor, value: pathToRegexp(route.path || '') },
    // Extract each parameter's name from route's path property using RegExp
    [PROP_PARAMS]: { ...propDescriptor, value: (route.path || '').match(/(:\w+)/ig) }
  });

/**
 * Gets routes config, filters, and returns in various formats.
 * @param {string=} filter Optional filter for the routes.
 * @return {object} Object containing Keys Array, Vals Array, and Object format
 */
export const getRoutesConfig = (filter) => {
  const routes = Object
    .keys(routesConfig)
    .map(k => getSpecialRouteObj(k, { ...routesConfig[k] }))
    .filter(getFilterFunc(filter));

  return {
    vals: routes,
    keys: routes.map(r => r[PROP_KEY]),
    obj: specialArrToObj(routes)
  };
};

/**
 * Gets a flattened array of routes for use in the Router.
 * @param {string=} filter Optional filter for the routes.
 * @return {!Array.<!Object>} Array of route objects.
 */
export const getRoutesArray = filter => getRoutesConfig(filter).vals;

/**
 * Gets a route object by matching pathname with defined route path
 * @param {string} pathname The path used for testing the defined route path
 * @param {string=} filter Optional filter for the routes.
 * @return {!Array.<!Object>} Array of route objects.
 */
export const getRouteFromPathName = (pathname, filter) =>
  // Test each route to see if it's a match for the pathname provided
  getRoutesConfig(filter).vals.find(route => route['[[RegExp]]'].test(pathname));
