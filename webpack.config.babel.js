import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import { devKey } from './env';

const dist = path.resolve(__dirname, 'dist');
const app = path.resolve(__dirname, 'client');
const nodeModules = path.resolve(__dirname, 'node_modules');

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;

const isProduction = LAUNCH_COMMAND === 'production';
process.env.BABEL_ENV = LAUNCH_COMMAND;

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/client/index.html'),
  inject: 'body'
});

const CopyWebpackPluginConfigOptions = [{
  from: 'client/static',
  to: 'static/'
}];

if (isProduction !== true) {
  CopyWebpackPluginConfigOptions.push({
    from: 'firebase.json',
    to: 'cfg/'
  });
}

const CopyWebpackPluginConfig = new CopyWebpackPlugin(
  CopyWebpackPluginConfigOptions
);

const PATHS = {
  app,
  build: dist
};

const developmentPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
    API_KEY: JSON.stringify(devKey)
  }
});

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    API_KEY: JSON.stringify(devKey)
  }
});

const base = {
  entry: ['babel-polyfill', PATHS.app],
  mode: isProduction ? 'production' : 'development',
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    modules: [app, nodeModules]
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
    contentBase: dist
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
  isProduction === true ? productionConfig : developmentConfig
);
