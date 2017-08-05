const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common.config')
const autoprefixer = require('autoprefixer')

module.exports = webpackMerge(commonConfig, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap: true, importLoaders: 2}},
          {loader: 'postcss-loader', options: {sourceMap: true, plugins: [autoprefixer]}},
          {loader: 'sass-loader', options: {sourceMap: true}}
        ]
      },
      {
        test: /\.(gif|png|jpe?g|ttf|eot|svg|woff2?)$|\?/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      favicon: './client/src/assets/images/favicon.png'
    })
  ],
  devServer: {
    contentBase: './client/src/',
    inline: true,
    hot: true
  }
})
