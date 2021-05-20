const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const apiMocker = require("connect-api-mocker");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development",
  devServer: {
    before: function (app) {
      app.use(apiMocker("/newsletter", "mocks/newsletter"));
    },
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
