// var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './src/client/main.js',
  output: { path: './src/client/', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};