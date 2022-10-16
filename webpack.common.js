const path = require('path')
const sharedConfig = require('./webpack-variable')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  entry: sharedConfig.entry,
  output: {
    path: sharedConfig.output.path,
    publicPath: sharedConfig.output.publicPath
  },
  target: 'web',
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.css',
      '.scss',
      '.gql',
      '.graphql'
    ]
  },
  module: {
    rules: [
      {
        // this rule use CSS Modules and it does NOT need to be tree-shaken
        test: /\.module.s?[ac]ss$/,
        use: [
          {
            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            options: {
              esModule: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // applied before css-loader( run before it => postcss-loader)
              modules: {
                localIdentName: sharedConfig.styleLoader.modules.localIdentName //scoped locally
              }
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: !isProduction }
          }
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        exclude: /\.module.s?[ac]ss$/,
        sideEffects: true, // All files have side effects, and none can be tree-shaken
        use: [
          {
            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            options: {
              esModule: true
            }
          },
          'css-loader',
          'postcss-loader',
          { loader: 'sass-loader', options: { sourceMap: !isProduction } }
        ]
      },
      {
        test: /\.(ts(x?)|mjs|js(x?))$/,
        //exclude: /node_modules|\.static.js/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/apollo-upload-client')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            sourceMap: !isProduction
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|jpg|jpeg|png|webp|static.js)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: sharedConfig.fileLoader.name,
              outputPath: sharedConfig.fileLoader.outputPath
            }
          }
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'graphql-tag/loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false
            }
          },
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: sharedConfig.fileLoader.name,
              outputPath: sharedConfig.fileLoader.outputPath
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(process.env.API_URL)
      }
    }),
    // will remove all files inside webpack's output.path
    new CleanWebpackPlugin(),
    !isProduction &&
      process.env.FAST_REFRESH === 'true' &&
      new webpack.HotModuleReplacementPlugin(),
    !isProduction &&
      process.env.FAST_REFRESH === 'true' &&
      new ReactRefreshWebpackPlugin() // Hot Reloading for React components
  ].filter(Boolean)
}
