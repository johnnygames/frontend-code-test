var path = require('path');

module.exports = {
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {},
    extensions: ['', '.jsx', '.js']
  },
  entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/app.js')],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
      loader: 'babel' // The module to load. "babel" is short for "babel-loader"
    }, {
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both loaders
    }]
  }
};
