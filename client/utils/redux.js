/* eslint-disable import/prefer-default-export, no-console */
import { initialStates } from 'reducers';

import { DEPRECATED } from 'copy/Global/common';
import {
  REDUX_WARN_PROP_DUPE,
  REDUX_WARN_PROP_MISSING,
  REDUX_WARN_PROP_DEPRECATED
} from 'copy/Global/redux';

const aggregateStates = { ...initialStates, routing: { location: null } };

const defaultPropDef = {
  value: null,
  writable: false,
  configurable: true,
  enumerable: true
};

/**
 * @TODO: DO NOT DELETE THIS COMMENT
 * Needs to be refactored in the future to avoid causing
 * the entire SPA to refresh, but prevent mutation of deep
 * redux state objects outside of reducers.
 * if (!item) return item;
 * if (Array.isArray(item)) return item.map(v => valueOf(v));
 * if (typeof item === 'object' && item !== null) {
 *   return Object.keys(item).reduce((ret, key) => ({
 *     ...ret,
 *     [key]: valueOf(item[key])
 *   }), {});
 * }
 * return item;
 */
const valueOf = item => item;

// Grabs all appropriate initialStates to use in a container
const getters = Object
  .keys(aggregateStates)
  .reduce((gets, reducer) => (
    Object.keys(aggregateStates[reducer])
      .reduce((_, propName) => {
        if (propName in gets) {
          console.warn(REDUX_WARN_PROP_DUPE(propName, reducer));
          return gets;
        }

        return Object.defineProperty(gets, propName, {
          ...defaultPropDef,
          value: (state) => {
            if (aggregateStates[reducer][propName] === DEPRECATED) {
              console.warn(REDUX_WARN_PROP_DEPRECATED(propName, reducer));
            }
            return valueOf(state[reducer][propName]);
          }
        });
      }, gets)
  ), {});

/* eslint-disable key-spacing, no-multi-spaces */
export const cleanMapStateToProps = (propMap = []) => (state, props) => {
  let keyMap = [];
  let valMap = [];

  if (Array.isArray(propMap)) {
    keyMap = keyMap.concat(propMap);
    valMap = valMap.concat(propMap);
  } else if (typeof propMap === 'object') {
    keyMap = keyMap.concat(Object.keys(propMap));
    valMap = valMap.concat(keyMap.map(k => propMap[k]));
  } else {
    throw new TypeError(`cleanMapStateToProps( propMap ): Expected 'propMap' to be Object or Array, instead got ${typeof propMap}`);
  }

  return {
    ...props,
    ...keyMap.reduce((obj, key, i) => {
      const valKey = `${valMap[i]}`;
      if (valKey in getters) return { ...obj, [key]: getters[valKey](state, props) };
      if (valKey.indexOf(':') > -1) {
        const { entityReducer } = state;
        if (valKey.indexOf(':*') > -1) return { ...obj, ...valueOf(entityReducer) };
        if (valKey in entityReducer) return { ...obj, [key]: valueOf(entityReducer[valKey]) };
        return obj;
      }
      console.warn(REDUX_WARN_PROP_MISSING(valKey));
      return obj;
    }, {})
  };
};
