const GoogleFontsPlugin = require('google-fonts-webpack-plugin')

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
  },
  plugins: [
    new GoogleFontsPlugin({
      fonts: [
        {family: 'Saira', variants: ['300', '400', '500', '700']}
      ],
      formats: ['ttf', 'woff', 'woff2']
    })
  ]
}
