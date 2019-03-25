'use strict';
const webpack = require('webpack');
const path = require('path');
const env = process.env.NODE_ENV;
/*
 * so process.cwd() is used instead to determine the correct base directory
 * Read more: https://nodejs.org/api/process.html#process_process_cwd
 */
const CURRENT_WORKING_DIR = process.cwd();

var config = {
  context: path.resolve(CURRENT_WORKING_DIR, 'client'),
  entry: {
    app: [
      './main.js'
    ]
  },
  mode: 'production',
  output: {
    path: path.resolve(CURRENT_WORKING_DIR, 'dist'), //  destination
    filename: 'clientBundle.js',
    publicPath: '/dist/',
  },
  plugins: [

  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //check for all js files
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['env', 'stage-0', 'react'],
        },
      }
    ]
  },
  devtool: "hidden-source-map"
};

module.exports = config;