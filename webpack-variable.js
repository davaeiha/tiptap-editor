const path = require('path')
module.exports = {
  entry: {
    app: ['core-js/stable', path.resolve('src')]
  },
  output: {
    // https://webpack.js.org/guides/caching/
    filename: 'static/js/[name].[contenthash:10].js',
    chunkFilename: 'static/js/[name].[chunkhash:10].chunk.js',
    path: path.resolve('build'),
    publicPath: '/'
  },
  cssOutput: {
    filename: 'static/css/[name].[contenthash:10].css',
    chunkFilename: 'static/css/[name].[chunkhash:10].chunk.css'
  },
  javascriptLoader: {
    outputPath: 'js/'
  },
  styleLoader: {
    modules: {
      localIdentName: '[name]__[local]___[hash:base64:10]'
    }
  },
  fileLoader: {
    outputPath: 'asset/',
    name: '[name].[contenthash:10].[ext]'
  }
}
