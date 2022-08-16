const path = require('path');
const MiniCSSExtract = require('mini-css-extract-plugin');

/** @type {import('webpack').Configuration} */

module.exports = {
  entry: [
    path.resolve(__dirname, './src/js/index.js'),
    path.resolve(__dirname, './src/sass/index.scss'),
  ],
  output: {
    path: path.resolve(__dirname, './assets'),
    filename: './js/main.bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sass|scss)/,
        exclude: /node_modules/,
        use: [MiniCSSExtract.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCSSExtract({
      filename: './css/styles.css',
    }),
  ],
};
