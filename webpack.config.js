var path = require("path");

module.exports = {
  entry: {
    app: ["./client/index.js"]
  },
  output: {
    path: __dirname + '/client',
    filename: 'dist.js'
  },
  module: {
    loaders: [
      {
        test : /\.js?/,
        loader : 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        },
      },
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
     }
    ]
  }
};
