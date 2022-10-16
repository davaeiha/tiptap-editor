const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const sharedConfig = require("./webpack-variable");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");

module.exports = merge(common, {
  mode: "development",
  target: "web",
  output: {
    pathinfo: false,
  },
  // resolve: {
  //   modules: ['.', 'node_modules']
  // },
  devtool: "eval-source-map", // generate source map for debugging process
  devServer: {
    proxy: {
      '/api': {
        target: 'https://dev3.thinkeo.dev',
        secure: false,
        changeOrigin: true,
      },
      '/graphql': {
        target: 'http://localhost',
        secure: false,
        changeOrigin: true,
      },
    },
    // disableHostCheck: true, // bypasses host checking
    host: "localhost",
    // host: "0.0.0.0",
    // contentBase: path.resolve(__dirname, './public'),
    // contentBasePublicPath: '/public',
    // watchOptions: {
    //   // aggregateTimeout: 500, // delay before reloading
    //   poll: 1000, // enable polling since fsevents are not supported in docker
    // },
    port: process.env.PORT || 3001,
    // overlay: true, // Shows a full-screen overlay in the browser when there are compiler errors or warnings
    historyApiFallback: true, // HTML5 History API
    // stats: "minimal", // control what bundle information gets displayed.
    // inline: true, // script will be inserted in your bundle to take care of live reloading, and build messages will appear in the browser console.
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      PUBLIC_URL: sharedConfig.output.publicPath,
      NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
      REACT_APP_ENVIRONMENT: "development", // will be remove after delete CRA completely
    }),
    new HtmlWebpackPlugin({
      inject: true, // will add javascript resources to the head/body depending on the scriptLoading option
      template: path.resolve(__dirname, "src", "index.html"),
    }),

    new WebpackBar(),
  ],
});
