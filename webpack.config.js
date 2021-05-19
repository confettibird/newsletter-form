const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
