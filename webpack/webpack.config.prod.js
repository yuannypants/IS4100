import webpack from 'webpack';
import path from 'path';

const env = process.env.NODE_ENV;

const config = {
  context: path.resolve(process.cwd(), 'client'),
  entry: {
    app: [
      './main.js'
    ]
  },
  mode: 'production',
  output: {
    path: path.resolve(process.cwd(), 'dist'), // destination
    filename: 'clientBundle.js',
    publicPath: '/dist/',
  },
  plugins: [

  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // check for all js files
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

export default config;
