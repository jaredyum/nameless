import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

/**
 * The path to the dist directory (built, compiled assets).
 * @const {string}
 */
const DIST_DIR = path.resolve(__dirname, 'dist');

/**
 * The path to the client directory (the working "source" directory).
 * @const {string}
 */
const APP_DIR = path.resolve(__dirname, 'client');

/**
 * The path to the node/yarn dependencies.
 * @const {string}
 */
const NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules');

/**
 * The path to the modules directory (a temporary space for shared components).
 * @const {string}
 */
const MODULES_DIR = path.resolve(__dirname, 'modules');

/**
 * Environmental variable indicating the node command/arguments the app was
 * launched in.
 * @const {string}
 */
const LAUNCH_COMMAND = process.env.npm_lifecycle_event;

/**
 * Flag indicating whether this is the production environment or not.
 * @const {boolean}
 */
const IS_PRODUCTION = LAUNCH_COMMAND === 'production';

process.env.BABEL_ENV = LAUNCH_COMMAND;

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/client/index.html'),
  inject: 'body'
});

const CopyWebpackPluginConfigOptions = [{
  from: 'client/static',
  to: 'static/'
}];

if (!IS_PRODUCTION) {
  CopyWebpackPluginConfigOptions.push({
    from: 'firebase.json',
    to: 'cfg/'
  });
}

const CopyWebpackPluginConfig = new CopyWebpackPlugin(
  CopyWebpackPluginConfigOptions
);

const developmentPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development')
  }
});

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

const base = {
  entry: ['babel-polyfill', APP_DIR],
  mode: IS_PRODUCTION ? 'production' : 'development',
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      APP_DIR,
      MODULES_DIR,
      NODE_MODULES_DIR
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  externals: [
    {
      window: 'window',
      localStorage: 'localStorage'
    }
  ]
};

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: DIST_DIR
  },
  plugins: [
    HtmlWebpackPluginConfig,
    CopyWebpackPluginConfig,
    developmentPlugin
  ]
};

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [
    HtmlWebpackPluginConfig,
    CopyWebpackPluginConfig,
    productionPlugin
  ]
};

export default Object.assign({}, base,
  IS_PRODUCTION ? productionConfig : developmentConfig
);
