const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
  	'./index.js',

  	'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server'
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, 'src'),
   
  devtool: 'source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    historyApiFallback: true,

    publicPath: '/'
    // match the output `publicPath`
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
          'sass-loader'
        ],
      },
       {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ],
  },

	resolve: {
   extensions: ['.js', '.jsx'],
  },

  plugins: [

    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks 
  	new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],


};