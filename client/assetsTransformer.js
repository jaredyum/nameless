import path from 'path';

export const process = (src, filename) =>
  `module.exports = ${JSON.stringify(path.basename(filename))};`;
