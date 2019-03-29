import webpack from 'webpack';
import path from 'path';

const config = {
  context: path.resolve(process.cwd(), 'client'), // Sets context for Webpack as 'IS4100'
  entry: { // Source files for Webpack to bundle
    app: [
      'webpack-hot-middleware/client', // Bundles the client for hot reloading
      './main.js',  // Sets entry point of app as 'IS4100/client/app'
    ]
  },
  mode: 'development',
  output: {
    path: path.resolve(process.cwd(), 'dist'), // Creates bundled files in 'IS4100/dist'
    filename: 'clientBundle.js', // The bundled script that 'IS4100/public/index.html' loads
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable HMR globally
    new webpack.NoEmitOnErrorsPlugin(),  // Do not emit compiled assets that include errors
  ],
  module: {
    rules: [ // Bundling rules
      { // Rules for .js/.jsx files
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['env', 'stage-0', 'react'],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      { // Rules for .sass/.scss/.css files
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      { // Rules for .gif/.jpeg/.png/.woff/.woff2/.eot/.tff/.svg (image) files
        test: /\.(gif|jp(e*)g|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: "inline-source-map"
};

export default config;
