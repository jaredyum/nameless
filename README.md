# React Seed

Unless you are committing to the _seed_ project, you should just clone without history.

See the [bare](https://help.github.com/articles/duplicating-a-repository/) option.


## Dependencies

This project does NOT come with `firebase.json` or `env.js`. Please see another
developer for these files, as we do not keep them in source control.

You can install the apps dependencies with the following command:

```
yarn install
```

### Core Dependencies

**NOTE:** Concerning `eslint`, when you run tests, you will see a _warning_ that looks like:

```
(node:6755) [ESLINT_LEGACY_OBJECT_REST_SPREAD] DeprecationWarning: The 'parserOptions.ecmaFeatures.experimentalObjectRestSpread' option is deprecated. Use 'parserOptions.ecmaVersion' instead. (found in "node_modules/eslint-config-airbnb-base/index.js")
```

This is because `eslint-config-airbnb`
[does not yet](https://github.com/airbnb/javascript/issues/1845#issuecomment-400835846)
support `eslint 5`. We will update `eslint-config-airbnb` when this is fixed.

**Current Dependencies:**

```json
{
  "dependencies": {
    "@material-ui/core": "^1.4.3",
    "@material-ui/icons": "^2.0.1",
    "axios": "^0.18.0",
    "axios-mock-adapter": "^1.15.0",
    "firebase": "^5.3.1",
    "firebase-auth": "^0.1.2",
    "history": "^4.7.2",
    "minimatch": "^3.0.4",
    "path-to-regexp": "^2.2.1",
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-hot-loader": "^4.3.4",
    "react-redux": "^5.0.7",
    "react-router-dom": "^4.3.1",
    "react-router-redux": "^5.0.0-alpha.9",
    "redux": "^4.0.0",
    "redux-localstorage": "^0.4.1",
    "redux-thunk": "^2.3.0"
  }
}
```

**Current _Dev_ Dependencies**

```json
{
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-eslint": "^8.2.6",
    "babel-loader": "^7.1.5",
    "babel-plugin-transform-es2015-destructuring": "^6.23.0",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "chalk": "^2.4.1",
    "copy-webpack-plugin": "^4.5.2",
    "css-loader": "^1.0.0",
    "enzyme": "^3.4.1",
    "enzyme-adapter-react-16": "^1.2.0",
    "enzyme-to-json": "^3.3.4",
    "eslint": "^5.3.0",
    "eslint-config-airbnb": "^17.0.0",
    "eslint-import-resolver-node": "^0.3.2",
    "eslint-plugin-dependencies": "^2.4.0",
    "eslint-plugin-import": "^2.13.0",
    "eslint-plugin-jsx-a11y": "^6.1.1",
    "eslint-plugin-react": "^7.10.0",
    "extract-text-webpack-plugin": "^3.0.2",
    "file-loader": "^1.1.11",
    "generic-pool": "^3.4.2",
    "html-webpack-plugin": "^3.2.0",
    "jest": "^23.4.2",
    "jest-environment-node": "^23.4.0",
    "mkdirp": "^0.5.1",
    "mocha": "^5.2.0",
    "node-sass": "^4.9.3",
    "optimist": "^0.6.1",
    "puppeteer": "^1.6.2",
    "react-test-renderer": "^16.4.2",
    "redux-mock-store": "^1.5.3",
    "rimraf": "^2.6.2",
    "sass-lint": "^1.12.1",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.22.1",
    "url-loader": "^1.0.1",
    "webpack": "^4.16.5",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.5"
  }
}
```

## Running the app

Running the app is as simple as:

```
yarn start
```

## Quick Start

```
yarn && yarn start
```
