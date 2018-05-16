export const REDUX_WARN_PROP_DUPE = (propName, reducer) => `WARNING: The ${reducer} reducer's "${propName}" state key is already in use by another reducer and will be ignored`;
export const REDUX_WARN_PROP_MISSING = key => `WARNING: "${key}" is not specified in any reducer's initialState.`;
export const REDUX_WARN_PROP_DEPRECATED = (propName, reducer) => `DEPRECATED: State key "${propName}" in the ${reducer} reducer has been deprecated and will be removed in future revisions.`;
