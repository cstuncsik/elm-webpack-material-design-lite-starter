const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common.config')

module.exports = webpackMerge(commonConfig, {
  output: {
    path: path.join(__dirname, 'client', 'dist'),
    publicPath: './',
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader?insertAt=top',
          use: [
            {loader: 'css-loader', options: {sourceMap: true, minimize: true, importLoaders: 2}},
            {loader: 'postcss-loader', options: {sourceMap: true, plugins: [autoprefixer]}},
            {loader: 'sass-loader', options: {sourceMap: true}}
          ]
        })
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: ['url-loader', 'image-webpack-loader']
      },
      {
        test: /\.(ttf|eot|woff2?)$|\?/,
        use: 'url-loader'
      },
      {
        test: /\.svg$/,
        use: [
          'file-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: false}},
                {convertPathData: false}
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      favicon: './client/src/assets/images/favicon.png',
      minify: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, 'client'),
      verbose: true,
      dry: false
    })
  ]
})
