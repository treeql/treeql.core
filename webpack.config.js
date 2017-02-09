const path = require('path');
const webpack = require('webpack');

const rootPath = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    extensions: ['.js'],
    alias: {
      'ast': rootPath('src/ast'),
      'compiler': rootPath('src/compiler'),
      'runtime': rootPath('src/runtime'),
    }
  },
  entry: [
    path.join(__dirname, 'src/index.js')
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'tree.ql.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
