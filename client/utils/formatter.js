import React from 'react';

/* eslint-disable no-bitwise */
export const capitalizeFirst = string => string.charAt(0).toUpperCase() + string.slice(1);

export const truncate = (text, count = 20) => {
  const trimmed = text.substring(0, count);
  return text.length > count ? `${trimmed}...` : text;
};

// Generates a new GUID for use in notificationsReducer
export const guidGenerator = () => {
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
};

/**
 * Creates a custom type classname (CURRENTLY ONLY FOR MYTHOR-FORM-FIELDS / MYTHOR-FORM-FIELD-MODAL)
 * @param {string} type The type of the component.
 * @return {string} The string 'mythor-form-modal mythor-form-modal-bool'
 */
export const getCustomClass = type => [
  'mythor-form-field-modal',
  `mythor-form-field${type ? `-${type.toLowerCase()}` : ''}`
].join(' ');

/**
 * Transform object into an array of objects.
 * @param {Object} obj The object you want to turn into an array of objects.
 * @return {Array<Object>} The array of objects created from original object passed in.
 */
export const transformObj = (obj) => {
  const keyArr = Object.keys(obj);
  const values = keyArr.map(k => obj[k]);
  const finalObjArr = [];

  values.reduce((acc, cur, index) => {
    const key = keyArr[index];

    finalObjArr.push(`//pizzahut.com${cur.location}/${key}`);
    return null;
  });

  return finalObjArr;
};

/**
* Removes a certain piece from the string passed in
* @param {String} string The string you want to remove from.
* @param {String} path The string you want matched and removed from 'string' parameter.
* @return {String} The result string with the path string removed.
*/
export const removePathFromString = (string, path) => {
  const pathRegEx = new RegExp(`${path}`, 'g');
  return string.replace(pathRegEx, '');
};

/**
 * Creates an array of objects from an array of strings (Meant for Akamai Images).
 * @param {Array} arr The array you want to iterate with.
 * @return {Array<Object>} The array of objects created from the array passed in.
 */
export const formatToArrayObjects = arr => arr.map((item, index) => {
  const strippedFile = item.substring(item.indexOf('images/'), item.length);
  return Object.assign({}, {
    id: index,
    icon: `http:${item}`,
    path: `http:${item}`,
    alt: strippedFile,
    file: removePathFromString(strippedFile, 'images/')
  });
});

export const formatIdAsDisplayName = id =>
  `${id}`.replace(
    /((?:^|\.)[a-z]|[A-Z])/g, char => ` ${char[char.length - 1].toUpperCase()}`
  ).trim().replace('ies', 'y');

/**
 * Returns JSX that is determined by the length of the array passed in (children).
 * NOTE: This is for the `ButtonGroup` component to determine whether to render an extra
 * div to keep the `Clone` and `Archive` buttons together.
 * If there's only two elements, it just renders them b/c the parent container is using
 * flexbox to spread them apart.
 * @param {!Array} children The array you want to iterate with.
 * @return {!Array<JSX>} The array of JSX elements in a layout determined by array
 */
export const determineLayout = (children = []) => {
  if (children.length > 2) {
    return ([
      <div className="clone-archive" key="first-two-buttons">
        { children.slice(0, 2) }
      </div>,
      children.slice(2, children.length)
    ]);
  }
  return children;
};

export const sortTable = (array, key, alphabetical) => array.slice().sort((a, b) => {
  const A = a[key].toString().toLowerCase();
  const B = b[key].toString().toLowerCase();
  if (alphabetical) {
    if (A < B) return -1;
    if (A > B) return 1;
    return 0;
  }
  if (A > B) return -1;
  if (A < B) return 1;
  return 0;
});
