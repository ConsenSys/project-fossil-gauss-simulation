var path = require("path");
module.exports = {
  entry: {
    app: ["./client/index.js"]
  },
  output: {
    path: __dirname,
    publicPath: "/client/",
    filename: "dist.js"
  },
  module: {
    loaders: [
      {
        test : /\.js?/,
        loader : 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
      }
    ]
  }
};
