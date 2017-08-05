module.exports = {
  entry: './client/src/index.js',
  output: {
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: 'elm-webpack-loader'
        }
      }
    ]
  }
}
