const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./js/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
  }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      }
    ],
  },
  devtool: "eval-source-map",
};
